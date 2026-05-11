const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Login attempt: User=${username}`); // Critical for Task 1 logging
    if (username === 'admin' && password === 'password123') {
        res.send('<h1>Login Successful! Welcome admin.</h1>');
    } else {
        res.status(401).send('<h1>Login Failed!</h1>');
    }
});

app.listen(3000, () => console.log('App running on http://localhost:3000'));
