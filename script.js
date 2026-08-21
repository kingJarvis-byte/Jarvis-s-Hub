const clock = document.getElementById("clock");
const date = document.getElementById("date");
const greeting = document.getElementById("greeting");
const statusMessage = document.getElementById("statusMessage");
const toast = document.getElementById("toast");
const logo = document.getElementById("jarvisLogo");

const messages = [
  "STATUS: probably procrastinating",
  "STATUS: currently cooking",
  "STATUS: definitely meant to do that",
  "STATUS: website getting unnecessarily advanced",
  "STATUS: all systems nominal"
];

function updateTime() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  date.textContent = now.toLocaleDateString([], { weekday: "long", day: "numeric", month: "long", year: "numeric" }).toUpperCase();

  const hour = now.getHours();
  greeting.textContent = hour < 12 ? "GOOD MORNING." : hour < 18 ? "GOOD AFTERNOON." : "GOOD EVENING.";
}
updateTime();
setInterval(updateTime, 1000);

let messageIndex = 0;
setInterval(() => {
  messageIndex = (messageIndex + 1) % messages.length;
  statusMessage.textContent = messages[messageIndex];
}, 4000);

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

document.querySelectorAll(".feature").forEach(card => {
  card.addEventListener("click", () => {
    const page = card.dataset.page;
    showToast(`${page.toUpperCase()} MODULE — COMING SOON`);
  });
});

/*
  Secret Easter egg:
  5 clicks on the JARVIS logo, then press J.
  For now it only reveals a hint. We'll build the actual private page later.
*/
let clicks = 0;
let lastClick = 0;

logo.addEventListener("click", () => {
  const now = Date.now();
  if (now - lastClick > 1800) clicks = 0;
  lastClick = now;
  clicks++;

  if (clicks === 5) {
    showToast("ACCESS SEQUENCE INITIALIZED");
    clicks = 0;
    sessionStorage.setItem("jarvisSequence", "ready");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "j" && sessionStorage.getItem("jarvisSequence") === "ready") {
    sessionStorage.removeItem("jarvisSequence");
    showToast("PRIVATE SYSTEM — LOCKED");
    // Secret page gets added in the next build.
  }
});
