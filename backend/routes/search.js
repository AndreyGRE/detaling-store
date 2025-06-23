const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  try {
    const { text = '', categor = '["Все"]' } = req.query;
    const categories = JSON.parse(categor);
    
    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];
    
    if (text) {
      sql += ' AND name LIKE ?';
      params.push(`%${text}%`);
    }
    
    if (!categories.includes('Все')) {
      sql += ` AND category IN (${categories.map(() => '?').join(',')})`;
      params.push(...categories);
    }
    
    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error('DB error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(rows);
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(400).json({ error: 'Invalid request' });
  }
});

module.exports = router;