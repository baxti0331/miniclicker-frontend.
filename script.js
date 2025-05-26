// Элементы DOM
const loadingScreen = document.getElementById('loading-screen');
const loadingBar = document.getElementById('loading-bar');
const mainContent = document.getElementById('main-content');

const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');

let loadProgress = 0;
let loadInterval;
let clockInterval;

// Обновление прогресс-бара загрузки
function updateLoading() {
  loadProgress += 1;
  loadingBar.style.width = loadProgress + '%';

  if (loadProgress >= 100) {
    clearInterval(loadInterval);
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      mainContent.style.display = 'block';
      mainContent.style.opacity = '1';
      startClock();
    }, 500);
  }
}

// Запуск имитации загрузки
function startLoading() {
  loadInterval = setInterval(updateLoading, 50); // загрузка ~5 секунд
}

// Обновление положения стрелок часов
function updateClockHands() {
  const now = new Date();

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12;

  const secAngle = seconds * 6; // 360/60
  const minAngle = minutes * 6 + seconds * 0.1; // + секунды для плавности
  const hourAngle = hours * 30 + minutes * 0.5; // 360/12 + минуты для плавности

  secondHand.style.transform = `rotate(${secAngle}deg)`;
  minuteHand.style.transform = `rotate(${minAngle}deg)`;
  hourHand.style.transform = `rotate(${hourAngle}deg)`;
}

// Запуск обновления часов каждую секунду
function startClock() {
  updateClockHands();
  clockInterval = setInterval(updateClockHands, 1000);
}

// Начинаем загрузку при загрузке страницы
window.onload = () => {
  mainContent.style.opacity = '0';
  mainContent.style.display = 'none';
  startLoading();
};
