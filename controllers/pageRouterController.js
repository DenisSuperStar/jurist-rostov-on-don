const homePath = '/models/home.json';
const pricePath = '/models/price.json';
const access = require('../dataAccess.js');

const { direction, exsistService, aboutService, slides, addressTable } = access(homePath);
const { price } = access(pricePath);

const today = new Date();
const currentYear = today.getFullYear();

module.exports.index = (req, res) => {
    res.render('indexView', {
        title: 'Оказание юридических услуг жителям Юрист-на-Дону, г.Ростова и Ростовской области',
        isIndex: true,
        // инициализация данных из home.json
        direction: direction,
        gallery: exsistService,
        about: aboutService,
        condition: slides,
        address: addressTable,
        priceList: price,
        phone: '+7 (951) 839-59-39',
        year: currentYear
    });
}

module.exports.price = (req, res) => {
    res.render('priceView', {
        title: 'Прайс-лист',
        priceList: price,
        isPrice: true
    });
}

module.exports.contacts = (req, res) => {
    res.render('contactsView', {
        title: 'Контакты - Юрист-на-Дону, г.Ростова-на-Дону',
        isContact: true
    });
}

module.exports.admin = (req, res) => {
    res.render('adminView.hbs', {
        title: 'Панель расширенных возможностей'
    });
}

module.exports.notFound = (req, res) => {
    res.render('404', {
        title: 'Запрашиваемая страница не была найдена',
        isHidden: true
    });
}