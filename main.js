function buySuperAutoClicker() {
  const cost = 250;
  if (coins >= cost) {
    coins -= cost;
    superAutoClickers++;
    playBuySound();
    alert('Супер автокликер куплен!');
  } else {
    alert('Недостаточно монет для супер автокликера!');
  }
  updateUI();
  saveGame();
}

setInterval(() => {
  if (autoClickers > 0) {
    coins += autoClickers;
  }
  if (superAutoClickers > 0) {
    coins += superAutoClickers * 5;
  }
  updateUI();
  saveGame();
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

function claimLevelTask(requiredLevel) {
  if (level >= requiredLevel) {
    coins += 200;
    alert('Награда за задание получена!');
  } else {
    alert('Уровень ещё недостаточен.');
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