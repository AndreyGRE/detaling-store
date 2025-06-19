const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./shop.db');

// Создаем таблицы
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT,
      price REAL,
      stock INTEGER,
      category TEXT,
      imageUrl TEXT DEFAULT 'https://e7.pngegg.com/pngimages/235/373/png-clipart-tread-car-alloy-wheel-rim-tire-car-car-transport.png'
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY,
      product_id INTEGER,
      quantity INTEGER,
      user_id TEXT,
      order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(product_id) REFERENCES products(id)
    )
  `);
});

module.exports = db;