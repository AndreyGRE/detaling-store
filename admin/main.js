// public/main.js
const API_URL = "http://localhost:5000";
async function loadProducts() {
    const res = await fetch(`${API_URL}/api/products`);
    const products = await res.json();
    const tbody = document.querySelector("#productsTable tbody");
    tbody.innerHTML = "";

    products.forEach((product) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${product.id}</td>
            <td contenteditable="true" onblur="updateField(${product.id}, 'name', this.textContent)">${product.name}</td>
            <td contenteditable="true" onblur="updateField(${product.id}, 'price', this.textContent)">${product.price}</td>
            <td contenteditable="true" onblur="updateField(${product.id}, 'stock', this.textContent)">${product.stock}</td>
            <td contenteditable="true" onblur="updateField(${product.id}, 'category', this.textContent)">${product.category}</td>
            <td contenteditable="true" onblur="updateField(${product.id}, 'imageUrl', this.textContent.trim())">
                <img src="${product.imageUrl}" style="width: 50px;">
            </td>
            <td>
                <button onclick="deleteProduct(${product.id})">Удалить</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function updateField(id, field, value) {
     // Автоматическое преобразование типов
    if (field === "price" || field === "stock") {
        value = parseFloat(value);
        if (isNaN(value)) return alert("Неверный формат числа");
    }

    await fetch(`${API_URL}/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
    });
}

async function addProduct() {
    const product = {
        name: document.getElementById("name").value,
        price: parseFloat(document.getElementById("price").value),
        stock: parseInt(document.getElementById("stock").value),
        category: document.getElementById("category").value,
        imageUrl: document.getElementById("imageUrl").value,
    };

    await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("category").value = "";
    document.getElementById("imageUrl").value = "";

    loadProducts();
}

async function deleteProduct(id) {
    await fetch(`${API_URL}/api/products/${id}`, { method: "DELETE" });
    loadProducts();
}

loadProducts();
