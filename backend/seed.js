const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./shop.db");

// Данные товаров
const productsData = [
    {
        id: 51218,
        name: "3M, 51815 Выс.эффективн. паста Fast Cut Plus Extreme 1л (шт.)",
        price: 3000.0,
        stock: 12,
        category: "Пасты",
        unit: "шт",
        package: "коробка",
        imageUrl: 'https://e7.pngegg.com/pngimages/235/373/png-clipart-tread-car-alloy-wheel-rim-tire-car-car-transport.png'
    },
    {
        id: 9374,
        name: "3M, 09374 Паста абразивная Perfect-It Fast Cut, 1кг (шт.)",
        price: 2400.0,
        stock: 12,
        category: "Пасты",
        unit: "шт",
        package: "коробка",
        imageUrl: 'https://e7.pngegg.com/pngimages/235/373/png-clipart-tread-car-alloy-wheel-rim-tire-car-car-transport.png'
    },
    {
        id: 2085,
        name: "3M, 02085 Абразивный полировальный круг Trizact P 3000, D150мм",
        price: 290.0,
        stock: 15,
        category: "Абразивные материалы",
        unit: "шт",
        package: "пачка",
    },
    {
        id: 2043,
        name: "3M, 02043 Водостойкая наждачная бумага Wetordry P 1500 (шт)",
        price: 26.0,
        stock: 50,
        category: "Наждачная бумага",
        unit: "шт",
        package: "пачка",
    },
    {
        id: 2044,
        name: "3M, 02044 Водостойкая наждачная бумага Wetordry P 2000 (шт)",
        price: 26.0,
        stock: 50,
        category: "Наждачная бумага",
        unit: "шт",
        package: "пачка",
    },
    {
        id: 2045,
        name: "3M, 02045 Водостойкая наждачная бумага Wetordry P 2500 (шт)",
        price: 28.0,
        stock: 50,
        category: "Наждачная бумага",
        unit: "шт",
        package: "пачка",
    },
    {
        id: 2046,
        name: "3M, 737U, Cubitron-ll Абразивный круг Р80 D-150мм (шт)",
        price: 58.0,
        stock: 50,
        category: "Абразивные материалы",
        unit: "шт",
        package: "пачка",
    },
    {
        id: 2047,
        name: "3M, 737U, Cubitron-ll Абразивный круг Р120 D-150мм (шт)",
        price: 58.0,
        stock: 50,
        category: "Абразивные материалы",
        unit: "шт",
        package: "пачка",
    },
    {
        id: 2048,
        name: "3M, 737U, Cubitron-ll Абразивный круг Р180 D-150мм (шт)",
        price: 58.0,
        stock: 50,
        category: "Абразивные материалы",
        unit: "шт",
        package: "пачка",
    },
    {
        id: 2049,
        name: "3M, 737U, Cubitron-ll Абразивный круг Р240 D-150мм (шт)",
        price: 58.0,
        stock: 50,
        category: "Абразивные материалы",
        unit: "шт",
        package: "пачка",
        imageUrl:
            "https://e7.pngegg.com/pngimages/235/373/png-clipart-tread-car-alloy-wheel-rim-tire-car-car-transport.png",
    },
    {
        id: 2050,
        name: "3M, 737U, Cubitron-ll Абразивный круг Р320 D-150мм (шт)",
        price: 58.0,
        stock: 50,
        category: "Абразивные материалы",
        unit: "шт",
        package: "пачка",
        imageUrl:
            "https://e7.pngegg.com/pngimages/235/373/png-clipart-tread-car-alloy-wheel-rim-tire-car-car-transport.png",
    },
    {
        id: 2051,
        name: "3M, 737U, Cubitron-ll Абразивный круг Р400 D-150мм (шт)",
        price: 58.0,
        stock: 50,
        category: "Абразивные материалы",
        unit: "шт",
        package: "пачка",
        imageUrl:
            "https://e7.pngegg.com/pngimages/235/373/png-clipart-tread-car-alloy-wheel-rim-tire-car-car-transport.png",
    },
    {
        id: 1001,
        name: "Adolf Bucher, Емкость 0,38л с крышкой (шт)",
        price: 20.96,
        stock: 200,
        category: "Емкости",
        unit: "шт",
        package: "коробка",
    },
    {
        id: 1002,
        name: "Adolf Bucher, Емкость 0,75л с крышкой (шт)",
        price: 28.47,
        stock: 200,
        category: "Емкости",
        unit: "шт",
        package: "коробка",
    },
    {
        id: 1003,
        name: "Adolf Bucher, Емкость 1,40л с крышкой (шт)",
        price: 48.52,
        stock: 200,
        category: "Емкости",
        unit: "шт",
        package: "коробка",
    },
    {
        id: 1004,
        name: "Adolf Bucher, Емкость 2,30л с крышкой (шт)",
        price: 89.94,
        stock: 200,
        category: "Емкости",
        unit: "шт",
        package: "коробка",
    },
    {
        id: 1005,
        name: "Adolf Bucher, Салфетка из микрофибры, 40х40, 550гр/м² (шт)",
        price: 170.0,
        stock: 20,
        category: "Аксессуары",
        unit: "шт",
        package: "пакет",
    },
    {
        id: 2001,
        name: "Roxel Pro, Герметик шовный распыляемый в тубе серый 310мл",
        price: 300.0,
        stock: 12,
        category: "Герметики",
        unit: "шт",
        package: "коробка",
    },
    {
        id: 2002,
        name: "Roxel Pro, Герметик шовный распыляемый в тубе черный 310мл",
        price: 300.0,
        stock: 12,
        category: "Герметики",
        unit: "шт",
        package: "коробка",
    },
    {
        id: 2003,
        name: "Roxel Pro, Герметик шовный распыляемый в тубе белый 310мл",
        price: 300.0,
        stock: 12,
        category: "Герметики",
        unit: "шт",
        package: "коробка",
    },
    {
        id: 3001,
        name: "Isistem, Праймер для стекольного герметика 20мл",
        price: 250.0,
        stock: 20,
        category: "Химия",
        unit: "шт",
        package: "коробка",
    },
    {
        id: 4001,
        name: "RM, Пистолет для распыляемого герметика",
        price: 6000.0,
        stock: 1,
        category: "Инструменты",
        unit: "шт",
        package: "коробка",
    },
    {
        id: 4002,
        name: "RM, Шлифовальная машинка 220V BLS-150 шаг 2,5 и 5мм",
        price: 15500.0,
        stock: 1,
        category: "Инструменты",
        unit: "шт",
        package: "коробка",
    },
    {
        id: 5001,
        name: "Remix, Проволока сварочная омедненная 0,8 5кг",
        price: 900.0,
        stock: 1,
        category: "Сварочные материалы",
        unit: "шт",
        package: "коробка",
    },
    {
        id: 5002,
        name: "Remix, Распылитель для обезжиривателя помповый 1л",
        price: 950.0,
        stock: 1,
        category: "Инструменты",
        unit: "шт",
        package: "пакет",
    },
    {
        id: 6001,
        name: "PPG, D800 Лак 1л + 0,5 отвердтель",
        price: 1750.0,
        stock: 6,
        category: "ЛКМ",
        unit: "шт",
        package: "коробка",
    },
    {
        id: 7001,
        name: "Car-S, Шпатлевка Glass 1.7кг + отвердитель",
        price: 1350.0,
        stock: 6,
        category: "Шпатлевки",
        unit: "шт",
        package: "коробка",
    },
    {
        id: 8001,
        name: "7-Win, Герметик для вклейки стекол в тубе 310мл",
        price: 300.0,
        stock: 28,
        category: "Герметики",
        unit: "шт",
        package: "коробка",
    },
    {
        id: 9001,
        name: "3M Car, Герметик для вклейки стекол в тубе 310мл",
        price: 370.0,
        stock: 42,
        category: "Герметики",
        unit: "шт",
        package: "коробка",
    },
    {
        id: 10001,
        name: "Roberlo, Лак 350Hs 5л + 2,5 отвердитель",
        price: 12000.0,
        stock: 2,
        category: "ЛКМ",
        unit: "шт",
        package: "коробка",
    },
    {
        id: 11001,
        name: "PPS Стакан с крышкой",
        price: 65.0,
        stock: 50,
        category: "Аксессуары",
        unit: "шт",
        package: "коробка",
    },
];

// Функция для добавления товаров
function seedProducts() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            productsData.forEach((product) => {
                db.run(
                    `
            INSERT INTO products (id, name, price, stock, category, imageUrl)
                VALUES (?, ?, ?, ?, ?, ?)
          `,
                    [
                        product.id,
                        product.name,
                        product.price,
                        product.stock,
                        product.category,
                        product.imageUrl,
                    ],
                    function (err) {
                        if (err) {
                            console.error(
                                `Ошибка при добавлении товара ${product.name}:`,
                                err
                            );
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
        console.log("Товары успешно добавлены!");
        db.close();
    })
    .catch((error) => {
        console.error("Произошла ошибка:", error);
        db.close();
    });
