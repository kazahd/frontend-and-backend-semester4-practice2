const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let products = [
    { id: 1, name: "Большой адронный коллайдер", price: 5000000000 },
    { id: 2, name: "Атомная электростанция", price: 10000000000 },
    { id: 3, name: "сухарики", price: 5 }
];

app.get('/', (req, res) => {
    res.send('Товарный API работает!');
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});