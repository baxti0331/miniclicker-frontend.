<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Меню Итальянского Ресторана</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #fffaf4;
      color: #333;
      margin: 0;
      padding: 0;
    }

    header {
      background-color: #8b0000;
      color: white;
      padding: 20px;
      text-align: center;
    }

    h1 {
      margin: 0;
    }

    nav {
      background-color: #f2e6d9;
      padding: 10px;
      text-align: center;
    }

    nav a {
      margin: 0 15px;
      text-decoration: none;
      color: #8b0000;
      font-weight: bold;
    }

    section {
      padding: 20px;
    }

    .category {
      margin-bottom: 40px;
    }

    .item {
      background: #fff;
      padding: 15px;
      margin-bottom: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }

    .item h3 {
      margin-top: 0;
      color: #8b0000;
    }

    .price {
      font-weight: bold;
      margin-top: 10px;
    }

    .customization {
      margin-top: 10px;
      font-size: 0.95em;
    }

    .preferences {
      background-color: #f9f9f9;
      padding: 20px;
      border-top: 2px solid #ccc;
    }

    .preferences label {
      display: inline-block;
      margin: 5px 15px 5px 0;
    }

    footer {
      background-color: #8b0000;
      color: white;
      text-align: center;
      padding: 10px;
      margin-top: 30px;
    }

    .total {
      font-size: 1.2em;
      font-weight: bold;
      margin-top: 20px;
    }
  </style>
</head>
<body>

  <header>
    <h1>Меню Итальянского Ресторана</h1>
  </header>

  <nav>
    <a href="#snacks">Закуски</a>
    <a href="#pasta">Паста</a>
    <a href="#desserts">Десерты</a>
  </nav>

  <section id="snacks" class="category">
    <h2>Закуски</h2>

    <div class="item">
      <h3>Брускетта Классическая</h3>
      <p>Хрустящий багет с томатами, базиликом и оливковым маслом</p>
      <p class="price">$8</p>
      <div class="customization">
        <strong>Персонализация:</strong><br>
        + Сыр ($2)<br>
        + Прошутто ($3)<br>
        + Бальзамик ($1)
      </div>
    </div>

    <div class="item">
      <h3>Карпаччо из Говядины</h3>
      <p>Тонко нарезанная говядина с рукколой и пармезаном</p>
      <p class="price">$12</p>
      <div class="customization">
        <strong>Персонализация:</strong><br>
        + Пармезан ($2)<br>
        + Трюфельное масло ($3)
      </div>
    </div>

    <div class="item">
      <h3>Капрезе</h3>
      <p>Моцарелла, томаты и свежий базилик</p>
      <p class="price">$10</p>
      <div class="customization">
        <strong>Персонализация:</strong><br>
        Заменить на буррату ($3)<br>
        + Песто ($2)
      </div>
    </div>

    <div class="item">
      <h3>Антипасти</h3>
      <p>Ассорти итальянских закусок с оливками и гриссини</p>
      <p class="price">$12</p>
      <div class="customization">
        <strong>Персонализация:</strong><br>
        + Доп. сыры ($3)<br>
        + Мясные деликатесы ($4)
      </div>
    </div>
  </section>

  <section id="pasta" class="category">
    <h2>Паста</h2>

    <div class="item">
      <h3>Спагетти Карбонара</h3>
      <p>Классическая карбонара с яйцом и гуанчиале</p>
      <p class="price">$14</p>
      <div class="customization">
        <strong>Добавить белок:</strong><br>
        + Курица ($4)<br>
        + Креветки ($6)
      </div>
    </div>

    <div class="item">
      <h3>Феттучини Альфредо</h3>
      <p>Сливочный соус с пармезаном</p>
      <p class="price">$15</p>
      <div class="customization">
        <strong>Добавить белок:</strong><br>
        + Курица ($4)<br>
        + Креветки ($6)<br>
        + Грибы ($3)
      </div>
    </div>

    <div class="item">
      <h3>Пенне Аррабиата</h3>
      <p>Острый томатный соус с чесноком и перцем чили</p>
      <p class="price">$14</p>
      <div class="customization">
        <strong>Персонализация:</strong><br>
        Слабоострый / Среднеострый / Очень острый<br>
        <strong>Добавить белок:</strong><br>
        + Курица ($4)<br>
        + Колбаски ($5)
      </div>
    </div>

    <div class="item">
      <h3>Равиоли с Рикоттой</h3>
      <p>С начинкой из рикотты и шпината в сливочном соусе</p>
      <p class="price">$18</p>
      <div class="customization">
        <strong>Персонализация:</strong><br>
        Соус из шалфея и масла ($2)<br>
        Томатный соус<br>
        + Трюфельное масло ($4)
      </div>
    </div>
  </section>

  <section id="desserts" class="category">
    <h2>Десерты</h2>

    <div class="item">
      <h3>Тирамису</h3>
      <p>Классический итальянский десерт с кофе и маскарпоне</p>
      <p class="price">$8</p>
      <div class="customization">
        <strong>Персонализация:</strong><br>
        + Амаретто ($2)<br>
        + Шоколадная стружка ($1)
      </div>
    </div>

    <div class="item">
      <h3>Панна Котта</h3>
      <p>Сливочный десерт с ванилью</p>
      <p class="price">$7</p>
      <div class="customization">
        <strong>Топпинг:</strong><br>
        Ягодный соус ($2)<br>
        Карамельный соус ($1)<br>
        Шоколадный соус ($1)
      </div>
    </div>

    <div class="item">
      <h3>Канноли</h3>
      <p>Хрустящие трубочки с кремом из рикотты</p>
      <p class="price">$6</p>
      <div class="customization">
        <strong>Персонализация:</strong><br>
        + Шоколадная крошка ($1)<br>
        + Фисташки ($2)<br>
        + Цедра апельсина ($1)
      </div>
    </div>

    <div class="item">
      <h3>Аффогато</h3>
      <p>Ванильное мороженое с эспрессо</p>
      <p class="price">$9</p>
      <div class="customization">
        <strong>Персонализация:</strong><br>
        + Ликер Амаретто ($3)<br>
        + Карамельный соус ($1)<br>
        + Бискотти ($2)
      </div>
    </div>
  </section>

  <section class="preferences">
    <h3>Предпочтения в питании</h3>
    <label><input type="checkbox"> Вегетарианское</label>
    <label><input type="checkbox"> Без глютена</label>
    <label><input type="checkbox"> Без лактозы</label>
    <label><input type="checkbox"> Веганское</label>
    <label><input type="checkbox"> Без орехов</label>

    <div class="total">Итого: $0</div>
  </section>

  <footer>
    &copy; 2025 Итальянский Ресторан. Все права защищены.
  </footer>

</body>
</html>