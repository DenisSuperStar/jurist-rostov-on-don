const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const path = require('path');
const expressHandlebars = require('express-handlebars');
const pages = require('./controllers/pageRouterController.js');
const process = require('./controllers/processUserController.js');
const upload = require('./controllers/uploadDataController.js');
const minify = require('express-minify');
const uglify = require('uglify-js');
const cssMin = require('cssmin');
// порт
const { port } = require('./config/config.js');
// настройки подключения к бд
const { host } = require('./config/config.js');
const { databaseName } = require('./config/config.js');
const { databaseConf } = require('./config/config.js');
// настройки таймера
const { online } = require('./credit/credit.js');
const { time } = require('./credit/credit.js');
let timeServer = time;
const timeStartOnline = online;
let timeOnline;
// сохранение данных о пользователях
const users = [];
// проверка email по регулярному
const filter = /^([\w\.\+]{1,})([^\W])(@)([\w]{1,})(\.[\w]{1,})+$/;
// подключение драйвера ORM для работы с бд
const mongoose = require('mongoose');
// модули для донастройки шаблона hbs
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

mongoose.connect(`mongodb://${host}/${databaseName}`, databaseConf, err => {
    if (err) throw err;
    server.listen(port, () => {
        console.log(`Сервер запущен на порту ${port}`);
    });
});

io.on('connection', socket => {
    socket.on('login', user => {
        const email = filter.test(user.email);
        
        if ((user.nick) && (email)) {
            users.push(user.nick);
            io.emit('login', {status: 'OK'}); // важен только статус

            timeOnline = setInterval(() => {
                if (timeServer < 1) {
                    clearInterval(timeOnline);
                    socket.disconnect(true);
                    socket.on('disconnect', () => {
                        io.emit('disconnected', {disconnect: 'OK'});
                    });
                }
                timeServer--;
            }, timeStartOnline);
        } else {
            io.emit('login', {status: 'FAILED'});
        }
    });

    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        clearInterval(timeOnline);
        timeServer = 600;
        console.log(timeServer);
    });
});

// подключаем модуль парсинга
const bodyParser = require('body-parser');
// создаем экземпляр парсера
const urlEncodedParser = bodyParser.urlencoded({
    extended: false
});

// создание объекта с настройками шаблонизатора
const createHbs = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.use(minify({
    cache: path.resolve() + '/cache',
    uglifyJsModule: uglify,
    cssmin: cssMin,
    errorHandler: undefined,
    js_match: '/\.js$/',
    css_match: '/\.css$/',
    json_match: '/\.json$/'
}));

app.engine('hbs', createHbs.engine);

app.set('view engine', 'hbs');
app.set('views', './views');

//  обработка запроса к каталогу со статическими файлами
app.use(express.static(path.resolve() + '/public'));

// обработка запроса по корневому адресу /
app.get('/', pages.index);

// обработка гет-запроса по адресу /about
app.get('/about', urlEncodedParser, process.addPerson);

// обработка пост-запроса по адресу /about
app.post('/about', urlEncodedParser, process.createPerson);

// обработка запроса по адресу /price
app.get('/price', pages.price);

// обработка запроса по адресу /contacts
app.get('/contacts', pages.contacts);

// обработка запроса по адресу /mail
app.get('/mail', process.getPerson);

app.get('/admin', urlEncodedParser, pages.dashboard);

app.post('/admin', urlEncodedParser, upload.uploadAd);

app.post('/admin', urlEncodedParser, upload.uploadItem);

// обработка запроса по адресу /404
app.get('/404', pages.notFound);

// для всех остальных запросов показываем /404
app.use(pages.notFound);
