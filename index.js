// Selects the element with ID "clock-display" to show the stopwatch time
const clockDisplay = document.querySelector("#clock-display");

// Selects the start button by its ID
const startButton = document.querySelector("#start-button");

// Selects the stop button by its ID
const stopButton = document.querySelector("#stop-button");

// Selects the reset button by its ID
const resetButton = document.querySelector("#reset-button");

// Stores the time when the stopwatch starts
let startTime = 0;

// Stores the total elapsed time while stopwatch runs
let elapsedTime = 0;

// Stores the current time difference between now and start time
let currentTime = 0;

// Used to track if the stopwatch is stopped (true = stopped, false = running)
let stopped = true;

// Stores the ID of the interval function so it can be cleared later
let intervalId;

// Variables to store the stopwatch display values
let hrs = 0;
let mins = 0;
let secs = 0;
let milsecs = 0;

// Event listener for the Start button
startButton.addEventListener("click", () => {
  if (stopped) {
    // Only start if stopwatch is currently stopped
    stopped = false; //Mark stopwatch as running
    startTime = Date.now() - elapsedTime; // Adjust start time to account for any previously elapsed time
    intervalId = setInterval(updateTime, 75); // Call updateTime every 75ms to refresh display
  }
});

// Event listener for the Stop button
stopButton.addEventListener("click", () => {
  if (!stopped) {
    // Only stop if stopwatch is currently running
    stopped = true; // Mark stopwatch as stopped
    elapsedTime = Date.now() - startTime; // Save total elapsed time so it can resume correctly;
    clearInterval(intervalId); // Stop the timer updates
  }
});

// Event listener for the Reset button
resetButton.addEventListener("click", () => {
  stopped = true; // Mark stopwatch as stopped
  clearInterval(intervalId); // Clear any running interval
  startTime = 0; // Reset start time
  elapsedTime = 0; // Reset elapsed time
  currentTime = 0; // Reset current time
  hrs = 0; // Reset hours
  mins = 0; // Reset minutes
  secs = 0; // Reset seconds
  milsecs = 0; // Reset milliseconds
  clockDisplay.textContent = `00:00:00:000`; // Reset the display to zeroed format
});

function updateTime() {
  // Calculate how much time has passed since the stopwatch started
  elapsedTime = Date.now() - startTime;

  // Calculate hours by dividing elapsedTime by (1000ms * 60s * 60m)
  hrs = Math.floor(elapsedTime / (1000 * 60 * 60));

  // Calculate minutes by taking the remainder of elapsedTime within an hour, then dividing by (1000ms * 60s)
  mins = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));

  // Calculate seconds by taking the remainder of elapsedTime within a minute, then dividing by 1000ms
  secs = Math.floor((elapsedTime % (1000 * 60)) / 1000);

  // Calculate milliseconds by taking the remainder of elapsedTime within a second
  milsecs = Math.floor(elapsedTime % 1000);

  // Format each time unit with leading zeros if needed
  milsecs = pad(milsecs);
  secs = pad(secs);
  mins = pad(mins);
  hrs = pad(hrs);

  // Update the clock display in the format: HH:MM:SS:MS
  clockDisplay.textContent = `${hrs}:${mins}:${secs}: ${milsecs}`;

  // Helper function to add leading zeros (ensures 2 digits for hrs, mins, secs)
  function pad(unit) {
    return ("0" + unit).length > 2 ? unit : "0" + unit;
  }
}

// Select the button with id="darkModeToggle" for toggling dark mode
const darkModeToggle = document.getElementById("darkModeToggle");

// Reference to the <body> element so we can add/remove the "dark-mode" class
const body = document.body;

// Check for user preference in local storage or system preference on load
// Retrieve saved theme ("dark" or "light") from local storage
const savedTheme = localStorage.getItem("theme");

// If user previously chose dark mode, apply it
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
}

// Listen for clicks on the toggle button
darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  // Switch between dark and light mode by adding/removing class

  // Save user preference to local storage
  // Store "dark" if dark mode is active else store "light" if dark mode is inactive
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
