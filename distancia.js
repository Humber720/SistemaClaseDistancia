// EFECTO ENTRADA TARJETAS

const cards = document.querySelectorAll('.card');

cards.forEach((card, index) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";

    setTimeout(() => {

        card.style.transition = "0.8s";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";

    }, index * 300);

});

// EFECTO BOTONES

const botones = document.querySelectorAll('.btn');

botones.forEach(btn => {

    btn.addEventListener('mouseenter', () => {

        btn.style.boxShadow = "0 0 25px rgba(255,255,255,0.5)";

    });

    btn.addEventListener('mouseleave', () => {

        btn.style.boxShadow = "";

    });

});

// EFECTO TÍTULO

const titulo = document.querySelector("h1");

setInterval(() => {

    titulo.style.transform = "scale(1.02)";

    setTimeout(() => {

        titulo.style.transform = "scale(1)";

    }, 500);

}, 2000);
