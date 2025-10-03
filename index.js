// Access the timer display and buttons using id selector
const timerDisplay = document.querySelector("#timer-display");
const startButton = document.querySelector("#start-button");
const stopButton = document.querySelector("#stop-button");
const resetButton = document.querySelector("#reset-button");

// Stores the time variables
let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let stopped = true;
let intervalId;

// Variables to store the stopwatch display values
let hrs = 0;
let mins = 0;
let secs = 0;
let milsecs = 0;

// Event listener for the Start button
startButton.addEventListener("click", () => {
  if (stopped) {
    stopped = false; 
    startTime = Date.now() - elapsedTime; 
    intervalId = setInterval(updateTime, 100); 
  }
});

// Event listener for the Stop button
stopButton.addEventListener("click", () => {
  if (!stopped) {
    stopped = true; 
    elapsedTime = Date.now() - startTime; 
    clearInterval(intervalId); 
  }
});

// Event listener for the Reset button
resetButton.addEventListener("click", () => {
  stopped = true; 
  clearInterval(intervalId); 
  elapsedTime = 0; 
  timerDisplay.textContent = "00:00:00:000"; 
});

// Calculate how much time has passed since the stopwatch started
function updateTime() {
  elapsedTime = Date.now() - startTime;
  hrs = Math.floor(elapsedTime / (1000 * 60 * 60)).toString().padStart(2, "0");
  mins = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
  secs = Math.floor((elapsedTime % (1000 * 60)) / 1000).toString().padStart(2, "0");
  milsecs = Math.floor(elapsedTime % 1000).toString().padStart(3, "0");
  timerDisplay.textContent = `${hrs}:${mins}:${secs}:${milsecs}`;
}

// Make the dark mode toggle button functional 
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.classList.add("dark-mode");
}

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");


  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
