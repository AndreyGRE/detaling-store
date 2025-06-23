const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./shop.db');

// Создаем таблицы
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      stock INTEGER DEFAULT 0,
      category TEXT,
      imageUrl TEXT DEFAULT 'https://cdn1.ozone.ru/s3/multimedia-j/6692595355.jpg'
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