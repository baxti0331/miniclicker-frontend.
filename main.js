let coins = 0;
let level = 1;
let progress = 0;
let clicks = 0;
const coinsPerLevel = 10;

let autoClickers = 0;
let coinsPerClick = 1;
let clickUpgradeLevel = 0;

const achievementsData = [
  { id: 1, text: "Первый клик", condition: () => clicks >= 1, reward: 10, rewarded: false },
  { id: 2, text: "20 кликов", condition: () => clicks >= 20, reward: 50, rewarded: false },
  { id: 3, text: "Уровень 5", condition: () => level >= 5, reward: 100, rewarded: false },
];

// Загрузка прогресса из localStorage
function loadGame() {
  const data = JSON.parse(localStorage.getItem('miniClickerSave'));
  if (data) {
    coins = data.coins || 0;
    level = data.level || 1;
    progress = data.progress || 0;
    clicks = data.clicks || 0;
    autoClickers = data.autoClickers || 0;
    coinsPerClick = data.coinsPerClick || 1;
    clickUpgradeLevel = data.clickUpgradeLevel || 0;
    achievementsData.forEach(a => {
      a.rewarded = data.achievements ? data.achievements[a.id] : false;
    });
  }
}

// Сохранение прогресса в localStorage
function saveGame() {
  const achievementsState = {};
  achievementsData.forEach(a => {
    achievementsState[a.id] = a.rewarded;
  });
  localStorage.setItem('miniClickerSave', JSON.stringify({
    coins,
    level,
    progress,
    clicks,
    autoClickers,
    coinsPerClick,
    clickUpgradeLevel,
    achievements: achievementsState
  }));
}

// Звук клика
const clickSound = document.getElementById('click-sound');
const buySound = document.getElementById('buy-sound');

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function playBuySound() {
  buySound.currentTime = 0;
  buySound.play();
}

function showTab(tab) {
  ['shop', 'tasks', 'referrals', 'achievements'].forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });
  if (tab !== 'main') document.getElementById(tab).classList.remove('hidden');
}

// Клик по монете
function clickCoin(e) {
  coins += coinsPerClick;
  progress += coinsPerClick;
  clicks++;
  playClickSound();

  if (progress >= coinsPerLevel) {
    level++;
    progress = 0;
  }

  for (let i = 0; i < 5; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = (e.clientX - 8) + 'px';
    p.style.top = (e.clientY - 8) + 'px';
    p.style.setProperty('--x', Math.random());
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1000);
  }

  checkAchievements();
  updateUI();
  saveGame();
}

function updateUI() {
  document.getElementById('coins').innerText = 'Монет: ' + coins;
  document.getElementById('level').innerText = 'Уровень: ' + level;
  document.getElementById('progress-bar').style.width = (progress / coinsPerLevel) * 100 + '%';

  document.getElementById('autoClickerCost').innerText = getAutoClickerCost();
  document.getElementById('clickUpgradeCost').innerText = getClickUpgradeCost();

  renderAchievements();
}

function buy(amount, cost) {
  if (coins >= cost) {
    coins -= cost;
    coins += amount;
    playBuySound();
    alert('Покупка успешна!');
  } else {
    alert('Недостаточно монет!');
  }
  updateUI();
  saveGame();
}

function getAutoClickerCost() {
  return 50 + autoClickers * 25;
}

function buyAutoClicker() {
  const cost = getAutoClickerCost();
  if (coins >= cost) {
    coins -= cost;
    autoClickers++;
    playBuySound();
    alert('Автокликер куплен!');
  } else {
    alert('Недостаточно монет для автокликера!');
  }
  updateUI();
  saveGame();
}

setInterval(() => {
  if (autoClickers > 0) {
    coins += autoClickers;
    updateUI();
    saveGame();
  }
}, 1000);

function getClickUpgradeCost() {
  return 30 + clickUpgradeLevel * 20;
}

function buyClickUpgrade() {
  const cost = getClickUpgradeCost();
  if (coins >= cost) {
    coins -= cost;
    clickUpgradeLevel++;
    coinsPerClick = 1 + clickUpgradeLevel;
    playBuySound();
    alert('Улучшение клика куплено! Теперь ' + coinsPerClick + ' монет за клик.');
  } else {
    alert('Недостаточно монет для улучшения клика!');
  }
  updateUI();
  saveGame();
}

function claimTask(required) {
  if (clicks >= required) {
    coins += 15;
    alert('Награда за задание получена!');
  } else {
    alert('Задание ещё не выполнено.');
  }
  updateUI();
  saveGame();
}

function checkAchievements() {
  achievementsData.forEach(a => {
    if (!a.rewarded && a.condition()) {
      a.rewarded = true;
      coins += a.reward;
      alert(`Достижение выполнено: "${a.text}"! Награда: ${a.reward} монет`);
    }
  });
}

function renderAchievements() {
  const container = document.getElementById('achievements-list');
  if (!container) return;
  container.innerHTML = '';
  achievementsData.forEach(a => {
    const div = document.createElement('div');
    div.className = 'achievement';
    div.innerText = a.text + (a.rewarded ? ' ✅' : '');
    container.appendChild(div);
  });
}

// Тема
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggleBtn.innerText = document.body.classList.contains('light') ? '🌜' : '🌞';
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    themeToggleBtn.innerText = '🌜';
  } else {
    themeToggleBtn.innerText = '🌞';
  }
}

// Инициализация
loadGame();
loadTheme();
updateUI();
showTab('main');