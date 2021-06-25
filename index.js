const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const expHbs = require('express-handlebars');
const pages = require('./controllers/pageRouterController.js');
const contact = require('./controllers/contactUsController.js');
const process = require('./controllers/processUserController.js');
const server = http.createServer(app);
// создаем парсер для данных с помощью модуля body parser
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({
    extended: false
});
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

const createHbs = expHbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

const dbHost = '27017';
const dbName = 'newClientDb';

mongoose.connect(`mongodb://localhost:${dbHost}/${dbName}`, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) throw err;
    
    server.listen(port, () => {
        console.log(`Сервер запущен на порту ${port}`);
    });
});

app.engine('hbs', createHbs.engine);

app.set('view engine', 'hbs');
app.set('views', './views');

//  обработка запроса к каталогу со статическими файлами
app.use(express.static(path.resolve() + '/public'));

// обработка запроса по корневому адресу /
app.get('/', urlEncodedParser, pages.index);

// обработка запроса отправки формы по корневому адресу /
app.post('/', urlEncodedParser, contact.contactUs);

// обработка запроса по адресу /about
app.get('/about', pages.about);

app.post('/about', urlEncodedParser, process.addUserComment);

// обработка запроса по адресу /price
app.get('/price', pages.price);

// обработка запроса по адресу /contacts
app.get('/contacts', pages.contacts);

// обработка запроса по адресу /dashboard
app.get('/dashboard', process.showUserComment);

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