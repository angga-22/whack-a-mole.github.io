// index.ts
import "./style.css";
import { debounce } from "./utils";
import { moleImg } from "./config";

const appContainer = document.querySelector<HTMLDivElement>(".container")!;
const popAudio = document.querySelector<HTMLAudioElement>("#pop")!;
const scoreDisplay = document.querySelector<HTMLSpanElement>("#score")!;
const countdownDisplay = document.createElement("div");
countdownDisplay.className =
  "countdown text2xl font-bold text-center text-red-700 bg-green-200 p-2 rounded-lg w-fit mx-auto";
appContainer.appendChild(countdownDisplay);

let moleHoles: HTMLDivElement[] = [];
let scoreCount = 0;
let totalHoles = 9;
let countdownTime = 60;

for (let i = 0; i < totalHoles; i++) {
  const hole = document.createElement("div");
  hole.className = "hole mole-hidden ";
  hole.addEventListener("click", debounce(onHitMole, 300));
  appContainer.appendChild(hole);
  moleHoles.push(hole);
}

function onHitMole(event: MouseEvent) {
  popAudio.play();
  const hole = event.target as HTMLDivElement;
  if (!hole.classList.contains("mole-hidden")) {
    hole.innerHTML = "";
    scoreCount++;
    scoreDisplay.innerText = scoreCount.toString();
    hole.classList.add("mole-hidden");
  }
}

function startCountdown() {
  updateCountdown(countdownTime);
  countdownTime--;
  if (countdownTime > 0) {
    setTimeout(startCountdown, 1000);
  } else {
    alert("Time's up! Your score is: " + scoreCount);
    resetGame();
  }
}

function updateCountdown(time: number) {
  countdownDisplay.innerText = time.toString();
}

function resetGame() {
  scoreCount = 0;
  scoreDisplay.innerText = scoreCount.toString();
  countdownTime = 60;
  moleHoles.forEach((hole) => {
    hole.classList.add("mole-hidden");
    hole.innerHTML = "";
  });
  startCountdown();
}

// Add mole moleImg to a random hole
function addMole() {
  const randomHoleIndex = Math.floor(Math.random() * moleHoles.length);
  const randomHole = moleHoles[randomHoleIndex];
  randomHole.innerHTML = `<img src="${moleImg}" alt="mole" class="mole"/> `;
  randomHole.classList.remove("mole-hidden");
  // Hide mole after 200-400ms
  setTimeout(
    () => {
      randomHole.classList.add("mole-hidden");
      randomHole.innerHTML = "";
    },
    Math.random() * (400 - 200) + 200
  );
}

// Add mole to a random hole every 2 seconds
setInterval(addMole, 2000);

startCountdown();
