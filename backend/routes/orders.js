const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/place', (req, res) => {
  const { productId, quantity, userId } = req.body;

  // Проверяем остатки
  db.get(
    'SELECT stock FROM products WHERE id = ?',
    [productId],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });

      if (row.stock < quantity) {
        return res.status(400).json({ error: 'Недостаточно товара на складе' });
      }

      // Уменьшаем количество
      db.run(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [quantity, productId]
      );

      // Сохраняем заказ
      db.run(
        'INSERT INTO orders (product_id, quantity, user_id) VALUES (?, ?, ?)',
        [productId, quantity, userId],
        function (err) {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ orderId: this.lastID });
        }
      );
    }
  );
});

module.exports = router;