const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const path = require('path');
const expressHandlebars = require('express-handlebars');
const pages = require('./controllers/pageRouterController.js');
const process = require('./controllers/processFeedBackController.js');
const upload = require('./controllers/dashboardUploadController.js');
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
// подключаем модуль парсинга
const multer = require('multer');

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

// подключаем модуль загрузки файла
const storageConfig = multer.diskStorage({
    destination: (req, fil, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const {originalname} = file;

        cb(null, originalname);
    }
});

// настройка фильтра для загружаемых файлов
/*const filterImage = (req, file, cb) => {
    const {mimetype} = file;

    if ((mimetype === 'image/jpg') || (mimetype === 'image/jpeg') || (mimetype === 'image/png')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}*/

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
app.use(express.bodyParser());

/*app.use(multer({storage:storageConfig, fileFilter: filterImage}).single('uploadImg'));*/

// обработка запроса по корневому адресу /
app.get('/', pages.index);

// обработка гет-запроса по адресу /about
app.get('/about', process.addPerson);

// обработка пост-запроса по адресу /about
app.post('/about', process.createPerson);

// обработка запроса по адресу /price
app.get('/price', pages.price);

// обработка запроса по адресу /contacts
app.get('/contacts', pages.contacts);

// обработка запросов по адресу /admin
app.get('/admin', pages.dashboard);
app.post('/admin', upload.uploadData);

// обработка запроса по адресу /404
app.get('/404', pages.notFound);

// для всех остальных запросов показываем /404
app.use(pages.notFound);
