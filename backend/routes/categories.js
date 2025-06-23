const express = require('express');
const router = express.Router();
const db = require('../db');

// Роут для получения уникальных категорий
router.get('/', (req, res) => {
  db.all(
    'SELECT DISTINCT category FROM products WHERE category IS NOT NULL ORDER BY category ASC',
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      // Преобразуем массив объектов в массив строк категорий
      const categories = rows.map(row => row.category);
      res.json(categories);
    }
  );
});

module.exports = router;