const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const expHbs = require('express-handlebars');
const pages = require('./controllers/pageRouterController.js');
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

//  обработка запроса к каталогу со статическими файлами
app.use(express.static(path.resolve() + '/public'));

// обработка запроса по корневому адресу /
app.get('/', pages.index);

// обработка запроса по адресу /about
app.use('/about', pages.about);

// обработка запроса по адресу /services
app.get('/services', pages.services);

// обработка запроса по адресу /contacts
app.get('/contacts', pages.contacts);

// обработка запроса по адресу /404
app.get('/404', pages.notFound);

// обработка запроса к несуществующей странице
app.use((req, res) => {
    res.status(404).sendFile(path.resolve() + '/public/404.html');
});

// обработка серверных ошибок
app.use((err, req, res) => {
    console.log(err.statusCode);
    console.log(err.statusMessage);
    res.status(500).sendFile(path.resolve() + '/public/500.html');
});