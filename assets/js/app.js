const playlist = document.getElementById("playlist");
const lecteur = document.querySelector(".lecteur");
const cover = document.getElementById("cover");
const disque = document.getElementById("disque");
let dbMusic; // Déclaration de dbMusic en dehors de la fonction getData

const config = {
    urlCover: "uploads/covers/",
    urlSound: "uploads/musics/",
}

const getData = async () => {
    const req = await fetch("./assets/js/data.json")
    dbMusic = await req.json(); // Assignation de la valeur à dbMusic

    dbMusic.forEach((music) => {
        playlist.innerHTML += `<li id="${music.id}"><h2>${music.title}</h2><div><small>${music.category}</small></div></li>`;
    });

    const allLi = document.querySelectorAll("li");

    allLi.forEach((li) => {
        li.addEventListener("click", function (elem) {
            const id = parseInt(li.id);
            const searchById = dbMusic.find((element) => element.id === id);
            lecteur.src = `${config.urlSound}${searchById.sound}`;
            lecteur.play();
            cover.src = `${config.urlCover}${searchById.cover}`;
            if (disque.classList.contains("pause")) {
                disque.classList.remove("pause");
            }

            // Supprime la classe clignote de tous les éléments de la playlist
            allLi.forEach((item) => {
                item.classList.remove("clignote");
            });

            // Ajoute la classe clignote à l'élément de la playlist actuellement sélectionné
            li.classList.add("clignote");
        });
    });
};

getData();

// Ajout du code pour le bouton Aléatoire
const btnRandom = document.getElementById("btnRandom");

btnRandom.addEventListener("click", function () {
    const randomIndex = Math.floor(Math.random() * dbMusic.length);
    const randomMusic = dbMusic[randomIndex];
    lecteur.src = `${config.urlSound}${randomMusic.sound}`;
    lecteur.play();
    cover.src = `${config.urlCover}${randomMusic.cover}`;
    if (disque.classList.contains("pause")) {
        disque.classList.remove("pause");
    }
    lecteur.currentTime = 0; // Remet la lecture au début de la piste actuelle
});

lecteur.addEventListener("play", function () {
    disque.classList.remove("pause"); // Supprime la classe pause lorsque la musique est en lecture
    disque.classList.add("clignote"); // Ajoute la classe clignotante lorsque la musique est en lecture
});

lecteur.addEventListener("pause", function () {
    disque.classList.add("pause"); // Ajoute la classe pause lorsque la musique est en pause
    disque.classList.remove("clignote"); // Supprime la classe clignotante lorsque la musique est en pause
});
