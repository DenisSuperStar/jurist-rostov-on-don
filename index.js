const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const expHbs = require('express-handlebars');
const pages = require('./controllers/pageSwitcherController.js');
const port = process.env.PORT || 3000;

const createHbs = expHbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

app.engine('hbs', createHbs.engine);

app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static(path.resolve() + '/public'));

app.get('/', pages.index);

app.get('/about', pages.about);

app.get('/services', pages.services);

app.get('/contacts', pages.contacts);

app.get('/contactUs', pages.contactUs);