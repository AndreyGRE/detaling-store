const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./shop.db');

// Данные товаров
const productsData = [
  {
    id: 51218,
    name: '3M, 51815 Выс.эффективн. паста Fast Cut Plus Extreme 1л (шт.)',
    price: 3000.00,
    stock: 12,
    category: 'Пасты'
  },
  {
    id: 09374,
    name: '3M, 09374 Паста абразивная Perfect-It Fast Cut, 1кг (шт.)',
    price: 2400.00,
    stock: 12,
    category: 'Пасты'
  },
  {
    id: 02085,
    name: '3M, 02085 Абразивный полировальный круг Trizact P 3000, D150мм',
    price: 290.00,
    stock: 15,
    category: 'Абразивные материалы'
  },
  {
    id: 02043,
    name: '3M, 02043 Водостойкая наждачная бумага Wetordry P 1500 (шт)',
    price: 26.00,
    stock: 50,
    category: 'Наждачная бумага'
  },
  {
    id: 02044,
    name: '3M, 02044 Водостойкая наждачная бумага Wetordry P 2000 (шт)',
    price: 26.00,
    stock: 50,
    category: 'Наждачная бумага'
  },
  // ... Добавьте остальные товары по аналогии ...
];

// Функция для добавления товаров
function seedProducts() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      productsData.forEach((product) => {
        db.run(
          `
            INSERT INTO products (id, name, price, stock, category)
            VALUES (?, ?, ?, ?, ?)
          `,
          [product.id, product.name, product.price, product.stock, product.category],
          function (err) {
            if (err) {
              console.error(`Ошибка при добавлении товара ${product.name}:`, err);
              reject(err);
            }
          }
        );
      });
      resolve();
    });
  });
}

// Запуск сидирования
seedProducts()
  .then(() => {
    console.log('Товары успешно добавлены!');
    db.close();
  })
  .catch((error) => {
    console.error('Произошла ошибка:', error);
    db.close();
  });