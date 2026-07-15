const PASSWORD = "dushman";

const pages = [...document.querySelectorAll(".page")];
const progressFill = document.getElementById("progressFill");
const sparkleLayer = document.getElementById("sparkleLayer");
const confettiLayer = document.getElementById("confettiLayer");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

let openedEnvelopes = 0;
let lap = 0;
let grownFlowers = 0;
let letterStarted = false;
let musicOn = false;

function showPage(id) {
  pages.forEach(page => page.classList.remove("active"));

  const target = document.getElementById(id);

  if (!target) {
    console.error("Page not found:", id);
    return;
  }

  target.classList.add("active");

  const index = pages.indexOf(target);
  const progress = (index / (pages.length - 1)) * 100;

  progressFill.style.width = `${progress}%`;

  if (id === "page-letter") {
    revealLetter();
  }

  if (id === "page-future" || id === "page-final") {
    document.body.classList.remove("night-mode");
    document.body.classList.add("sunrise-mode");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function sparkleBurst(amount = 18) {
  const icons = ["✦", "♡", "♥", "✨", "🌼", "🐧", "😈"];

  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      const sparkle = document.createElement("span");

      sparkle.className = "sparkle";
      sparkle.textContent =
        icons[Math.floor(Math.random() * icons.length)];

      sparkle.style.left = `${Math.random() * 100}vw`;
      sparkle.style.top = `${35 + Math.random() * 50}vh`;
      sparkle.style.fontSize = `${14 + Math.random() * 24}px`;

      sparkleLayer.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 1700);
    }, i * 45);
  }
}

function confettiBurst(amount = 70) {
  const icons = ["🎉", "✨", "🏆", "🌼", "♡"];

  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      const confetti = document.createElement("span");

      confetti.className = "confetti";
      confetti.textContent =
        icons[Math.floor(Math.random() * icons.length)];

      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.top = "-10vh";
      confetti.style.fontSize = `${12 + Math.random() * 19}px`;
      confetti.style.animationDuration =
        `${2.4 + Math.random() * 1.6}s`;

      confettiLayer.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 4200);
    }, i * 35);
  }
}

/* Password */

const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const errorMsg = document.getElementById("errorMsg");

function unlockWebsite() {
  if (passwordInput.value.trim() === PASSWORD) {
    errorMsg.textContent = "";

    showPage("page-welcome");
    sparkleBurst(38);
  } else {
    errorMsg.textContent =
      "Wrong password, dushman. Try again ♡";

    passwordInput.value = "";
    passwordInput.focus();
  }
}

unlockBtn.addEventListener("click", unlockWebsite);

passwordInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    unlockWebsite();
  }
});

/* Navigation */

document.querySelectorAll(".next-btn").forEach(button => {
  button.addEventListener("click", () => {
    if (button.disabled) {
      return;
    }

    showPage(button.dataset.next);
    sparkleBurst(10);
  });
});

/* Envelopes */

const envelopeCards =
  document.querySelectorAll(".envelope-card");

const envelopeNext =
  document.getElementById("envelopeNext");

envelopeCards.forEach(card => {
  card.addEventListener("click", () => {
    if (card.classList.contains("open")) {
      return;
    }

    card.classList.add("open");
    openedEnvelopes++;
    sparkleBurst(6);

    if (openedEnvelopes === envelopeCards.length) {
      envelopeNext.disabled = false;
      envelopeNext.textContent = "to the race →";

      sparkleBurst(24);
    }
  });
});

/* Race */

const raceCar = document.getElementById("raceCar");
const lapText = document.getElementById("lapText");
const podium = document.getElementById("podium");
const raceNext = document.getElementById("raceNext");

const lapMessages = [
  "Lap 1: You are allowed to begin again.",
  "Lap 2: A difficult season is still only a season.",
  "Final lap: Keep going. The finish line is closer than it looks."
];

raceCar.addEventListener("click", () => {
  if (lap >= 3) {
    return;
  }

  lap++;

  raceCar.style.left =
    `calc(${lap * 24}% - 10px)`;

  lapText.textContent =
    lapMessages[lap - 1];

  sparkleBurst(8);

  if (lap === 3) {
    setTimeout(() => {
      podium.classList.add("show");

      raceNext.disabled = false;
      raceNext.textContent =
        "take the podium 🏆";

      confettiBurst(80);
    }, 750);
  }
});

/* Garden */

const seeds = document.querySelectorAll(".seed");
const gardenNext = document.getElementById("gardenNext");

seeds.forEach(seed => {
  seed.addEventListener("click", () => {
    if (seed.classList.contains("grown")) {
      return;
    }

    seed.classList.add("grown");
    seed.textContent = seed.dataset.flower;

    grownFlowers++;
    sparkleBurst(7);

    if (grownFlowers === seeds.length) {
      gardenNext.disabled = false;
      gardenNext.textContent =
        "carry the hope with you →";

      sparkleBurst(28);
    }
  });
});

/* Letter reveal */

function revealLetter() {
  if (letterStarted) {
    return;
  }

  letterStarted = true;

  document
    .querySelectorAll(".reveal-line")
    .forEach((line, index) => {
      setTimeout(() => {
        line.classList.add("visible");
      }, index * 700);
    });
}

/* Final note */

const lastNoteBtn = document.getElementById("lastNoteBtn");
const lastNote = document.getElementById("lastNote");

lastNoteBtn.addEventListener("click", () => {
  lastNote.classList.add("show");
  lastNoteBtn.style.display = "none";

  confettiBurst(55);
  sparkleBurst(45);
});

/* Music */

musicBtn.addEventListener("click", async () => {
  if (!bgMusic) {
    return;
  }

  try {
    if (!musicOn) {
      bgMusic.volume = 0.28;

      await bgMusic.play();

      musicOn = true;
      musicBtn.textContent = "♫";
    } else {
      bgMusic.pause();

      musicOn = false;
      musicBtn.textContent = "♪";
    }
  } catch (error) {
    musicOn = false;
    musicBtn.textContent = "♪";

    alert(
      "Upload a file named music.mp3 to enable background music."
    );
  }
});

document.addEventListener("visibilitychange", () => {
  if (
    document.hidden &&
    bgMusic &&
    !bgMusic.paused
  ) {
    bgMusic.pause();

    musicOn = false;
    musicBtn.textContent = "♪";
  }
});
