const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('close-modal-btn');

const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');

const loader = document.getElementById('loader');
const progressBar = document.getElementById('progress-bar');
const mainContent = document.getElementById('main-content');

let totalSeconds = 0;
let timerInterval = null;
let clockInterval = null;
let isRunning = false;

// === ЭКРАН ЗАГРУЗКИ ===
function startLoading() {
  let progress = 0;
  const interval = setInterval(() => {
    progress += 1;
    progressBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
      setTimeout(() => {
        loader.style.display = 'none';
        mainContent.style.display = 'block';
        setTimeout(() => {
          mainContent.style.opacity = '1';
        }, 50);
        startClock();
      }, 500);
    }
  }, 25); // скорость загрузки
}

// === ОБНОВЛЕНИЕ ЧАСОВ ===
function updateClockHands() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12;

  const secAngle = seconds * 6;
  const minAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = hours * 30 + minutes * 0.5;

  secondHand.style.transform = `rotate(${secAngle}deg)`;
  minuteHand.style.transform = `rotate(${minAngle}deg)`;
  hourHand.style.transform = `rotate(${hourAngle}deg)`;
}

function startClock() {
  updateClockHands();
  clockInterval = setInterval(updateClockHands, 1000);
}

// === ТАЙМЕР ===
function startTimer() {
  if (isRunning) return;
  isRunning = true;
  modal.classList.add('active');
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;

  timerInterval = setInterval(() => {
    totalSeconds++;
  }, 1000);
}

function pauseTimer() {
  if (!isRunning) return;
  isRunning = false;
  clearInterval(timerInterval);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function resetTimer() {
  isRunning = false;
  clearInterval(timerInterval);
  totalSeconds = 0;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  modal.classList.remove('active');
}

// === СОБЫТИЯ ===
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
closeModalBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

// === ЗАПУСК ПРИ ЗАГРУЗКЕ ===
window.onload = () => {
  mainContent.style.opacity = '0';
  mainContent.style.display = 'none';
  startLoading();
};
