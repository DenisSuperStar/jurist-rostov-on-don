const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const path = require('path');
const expHbs = require('express-handlebars');
const pages = require('./controllers/pageRouterController.js');
const process = require('./controllers/processUserController.js');
const minify = require('express-minify');
const uglify = require('uglify-js');
const cssMin = require('cssmin');
const { online } = require('./credit/credit.js');
const { time } = require('./credit/credit.js');
let timeServer = time;
const timeStartOnline = online;
let timeOnline;
// установка значения порта
const port = 3000;

// сохранение данных о пользователях
const users = [];
const filter = /^([\w\.\+]{1,})([^\W])(@)([\w]{1,})(\.[\w]{1,})+$/;

io.on('connection', socket => {
    console.log('Соединяемся с бд!');
    socket.on('login', user => {
        const email = filter.test(user.email);
        
        if ((user.nick) && (email)) {
            users.push(user.nick);
            io.emit('login', {status: 'OK'});

            timeOnline = setInterval(() => {
                if (timeServer < 1) {
                    clearInterval(timeOnline);
                    socket.disconnect(true);
                    socket.on('disconnect', () => {
                        console.log('Разрываем соединение с бд!');
                        io.emit('disconnected', {disconnect: 'OK'});
                    });
                }
                // временно присутствует для отслеживания timeServer
                console.log(timeServer);
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
        console.log('Разрываем соединение с бд!');
    });
});

// подключаем модуль парсинга
const bodyParser = require('body-parser');
// создаем экземпляр парсера
const urlEncodedParser = bodyParser.urlencoded({
    extended: false
});

server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

const createHbs = expHbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
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

// обработка запроса по адресу /dashboard
app.get('/dashboard', process.getPerson);

// обработка запроса по адресу /404
app.get('/404', pages.notFound);

// обработка запроса к несуществующей странице
app.use((req, res) => {
    res.status(404).sendFile(path.resolve() + '/public/404.html');
});