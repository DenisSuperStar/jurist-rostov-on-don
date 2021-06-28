const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const expHbs = require('express-handlebars');
const pages = require('./controllers/pageRouterController.js');
const contact = require('./controllers/contactUsController.js');
const process = require('./controllers/processUserController.js');
const server = http.createServer(app);

// подключаем модуль парсинга
const bodyParser = require('body-parser');
// создаем экземпляр парсера
const urlEncodedParser = bodyParser.urlencoded({
    extended: false
});

// установка значения порта
const port = 3000;

server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

const createHbs = expHbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
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

// обработка гет-запроса по адресу /about
app.get('/about', urlEncodedParser, process.addPerson);

// обработка пост-запроса по адресу /about
app.post('/about', urlEncodedParser, process.createPerson);

// обработка запроса по адресу /price
app.get('/price', pages.price);

// обработка запроса по адресу /contacts
app.get('/contacts', pages.contacts);

// обработка запроса по адресу /dashboard
app.get('/dashboard', process.getPerson);

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