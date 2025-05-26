document.addEventListener("DOMContentLoaded", () => {
  const collapsibles = document.querySelectorAll(".collapsible");
  const storedStates = JSON.parse(localStorage.getItem("openSections") || "{}");

  collapsibles.forEach((header, index) => {
    const sectionId = header.dataset.id;
    const content = header.nextElementSibling;

    // Restore from localStorage or open the first by default
    const isOpen = storedStates[sectionId] ?? index === 0;
    if (isOpen) {
      header.classList.add("active");
      content.classList.add("open");
    }

    header.addEventListener("click", () => {
      const isActive = header.classList.toggle("active");
      content.classList.toggle("open");

      // Save to localStorage
      storedStates[sectionId] = isActive;
      localStorage.setItem("openSections", JSON.stringify(storedStates));
    });
  });

  // Total calculation
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
});