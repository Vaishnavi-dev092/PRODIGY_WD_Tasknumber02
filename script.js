const timerDisplay = document.querySelector('.timer');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

// Format time into HH:MM:SS
function formatTime(time) {
  const hours = String(Math.floor(time / 3600000)).padStart(2, '0');
  const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

// Start the stopwatch
startBtn.addEventListener('click', () => {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      timerDisplay.textContent = formatTime(elapsedTime);
    }, 100);
    running = true;
  }
});

// Pause the stopwatch
pauseBtn.addEventListener('click', () => {
  if (running) {
    clearInterval(timerInterval);
    running = false;
  }
});

// Reset the stopwatch
resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  elapsedTime = 0;
  running = false;
  timerDisplay.textContent = '00:00:00';
  lapsList.innerHTML = '';
});

// Record lap time
lapBtn.addEventListener('click', () => {
  if (running) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.appendChild(lapItem);
  }
});
