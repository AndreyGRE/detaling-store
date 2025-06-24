const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Простой middleware для логирования
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
// Middleware
app.use(cors());
app.use(express.json());
// Роуты
app.use('/api/orders', require('./routes/orders'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/search', require('./routes/search'));


// Получить все товары
app.get("/api/products", (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Добавить товар
app.post("/api/products", (req, res) => {
    const { name, price, stock, category, imageUrl } = req.body;
    db.run(
        `INSERT INTO products (name, price, stock, category, imageUrl) VALUES (?, ?, ?, ?, ?)`,
        [name, price, stock, category, imageUrl],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Обновить товар
app.put("/api/products/:id", (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    
    // Получаем текущие данные товара
    db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Товар не найден" });

        // Объединяем текущие данные с обновлениями
        const updatedProduct = {
            ...row,
            ...updates
        };

        db.run(
            `UPDATE products SET 
                name = ?, 
                price = ?, 
                stock = ?, 
                category = ?, 
                imageUrl = ? 
             WHERE id = ?`,
            [
                updatedProduct.name,
                updatedProduct.price,
                updatedProduct.stock,
                updatedProduct.category,
                updatedProduct.imageUrl,
                id
            ],
            function(err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json(updatedProduct);
            }
        );
    });
});

// Удалить товар
app.delete("/api/products/:id", (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM products WHERE id = ?`, [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});