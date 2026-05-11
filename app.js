const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware to parse JSON and Form data
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Mock Database
let users = [
    { id: 1, username: 'admin', role: 'Superuser' },
    { id: 2, username: 'notfahadhere', role: 'Dev' }
];

// 1. GET: Fetch all users
app.get('/api/users', (req, res) => {
    res.status(200).json(users);
});

// 2. POST: Create a new user
app.post('/api/users', (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});

// 3. PUT: Update a user's role
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id == id);
    if (user) {
        user.role = req.body.role;
        res.json({ message: "User updated", user });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// 4. DELETE: Remove a user
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter(u => u.id != id);
    res.status(200).json({ message: `User ${id} deleted` });
});

// Original Login Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password123') {
        res.send('<h1>Login Successful!</h1>');
    } else {
        res.status(401).send('<h1>Login Failed!</h1>');
    }
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));
