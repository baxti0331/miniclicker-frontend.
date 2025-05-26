// Подсчёт итоговой суммы
document.querySelectorAll('.option').forEach(input => {
  input.addEventListener('change', updateTotal);
});

function updateTotal() {
  let total = 0;
  document.querySelectorAll('.item').forEach(item => {
    let itemPrice = parseFloat(item.dataset.price);
    item.querySelectorAll('.option:checked').forEach(opt => {
      itemPrice += parseFloat(opt.dataset.price);
    });
    total += itemPrice;
  });
  document.getElementById('total').textContent = total.toFixed(2);
}

// Скрытие/раскрытие категорий
function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const isHidden = section.classList.toggle('collapsed');
  const heading = section.querySelector('h2');
  if (heading) {
    heading.innerText = heading.innerText.replace(/[▲▼]$/, '') + (isHidden ? ' ▲' : ' ▼');
  }

  section.querySelectorAll('.item').forEach(item => {
    item.style.display = isHidden ? 'none' : 'block';
  });
}
