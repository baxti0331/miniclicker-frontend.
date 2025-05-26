const startBtn = document.getElementById('startBtn');
const durationSelect = document.getElementById('duration');
const timerDisplay = document.getElementById('timerDisplay');
const hand = document.getElementById('hand');

// Загрузка
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('mainApp').classList.add('show');
  }, 2500);
});

// Форматирование времени
function formatTime(seconds) {
  const min = Math.floor(seconds / 60).toString().padStart(2, '0');
  const sec = (seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

function startMeditation(duration) {
  let remaining = duration;
  let angle = 0;
  const angleStep = 360 / duration;

  const interval = setInterval(() => {
    remaining--;
    angle += angleStep;
    timerDisplay.textContent = formatTime(remaining);
    hand.style.transform = `rotate(${angle}deg)`;

    if (remaining <= 0) {
      clearInterval(interval);
      alert("Медитация завершена 🙏");
      timerDisplay.textContent = "00:00";
      hand.style.transform = `rotate(0deg)`;
    }
  }, 1000);
}

startBtn.addEventListener('click', () => {
  const duration = parseInt(durationSelect.value, 10);
  localStorage.setItem('duration', duration);
  hand.style.transform = `rotate(0deg)`;
  startMeditation(duration);
});

// Загрузка настроек
window.onload = () => {
  const saved = localStorage.getItem('duration');
  if (saved) durationSelect.value = saved;
};
