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

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    
    if (!product) {
        return res.status(404).json({ message: 'Товар не найден' });
    }
    
    res.json(product);
});

app.post('/products', (req, res) => {
    const { name, price } = req.body;
    
    if (!name || !price) {
        return res.status(400).json({ message: 'Имя и цена обязательны' });
    }
    
    const newProduct = {
        id: Date.now(),      
        name,
        price
    };
    
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.patch('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    
    if (!product) {
        return res.status(404).json({ message: 'Товар не найден' });
    }
    
    const { name, price } = req.body;
    
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    
    res.json(product);
});

app.delete('/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id == req.params.id);
    
    if (productIndex === -1) {
        return res.status(404).json({ message: 'Товар не найден' });
    }
    
    products.splice(productIndex, 1);
    res.status(204).send(); 
});