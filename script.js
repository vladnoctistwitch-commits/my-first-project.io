const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

const bgMusic = document.getElementById("bgMusic");

/* =========================
   МУЗЫКА
========================= */

let musicStarted = false;

function startMusic(){

    if(musicStarted) return;

    musicStarted = true;

    bgMusic.volume = 0.4;

    bgMusic.play().catch(() => {});
}

document.addEventListener("click", startMusic, {once:true});

/* =========================
   КНОПКА ДА
========================= */

yesBtn.addEventListener("click", () => {

    startMusic();

    page1.classList.remove("active");
    page2.classList.add("active");

    launchConfetti();

    launchHearts();
});

/* =========================
   КНОПКА НЕТ УБЕГАЕТ
========================= */

function moveButton(){

    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}

noBtn.addEventListener("mouseenter", moveButton);

noBtn.addEventListener("mousemove", moveButton);

/* =========================
   САЛЮТ
========================= */

function launchConfetti(){

    const duration = 5000;

    const end = Date.now() + duration;

    (function frame(){

        confetti({
            particleCount:10,
            angle:60,
            spread:80,
            origin:{x:0}
        });

        confetti({
            particleCount:10,
            angle:120,
            spread:80,
            origin:{x:1}
        });

        if(Date.now() < end){
            requestAnimationFrame(frame);
        }

    })();
}

/* =========================
   СЕРДЕЧКИ
========================= */

function launchHearts(){

    const hearts = ["❤️","💖","💕","💘","💗","💞"];

    const interval = setInterval(() => {

        const heart = document.createElement("div");

        heart.classList.add("heart");

        heart.innerHTML =
            hearts[Math.floor(Math.random()*hearts.length)];

        heart.style.left =
            Math.random()*window.innerWidth + "px";

        heart.style.bottom = "-50px";

        heart.style.fontSize =
            (20 + Math.random()*40) + "px";

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 4000);

    }, 120);

    setTimeout(() => {
        clearInterval(interval);
    }, 5000);
}