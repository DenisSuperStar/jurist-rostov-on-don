const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const expHbs = require('express-handlebars');
const port = process.env.PORT || 3000;

const createHbs = expHbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.port(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

app.engine('hbs', createHbs.engine);

app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static(path.resolve + '/public'));