const today = new Date();
const currentYear = today.getFullYear();
const indexFake = '/models/home.json';
const access = require('../dataAccess.js');
const { aboutService, slideService, addressTable } = access(indexFake);
const Main = require('../models/main.js');
const Order = require('../models/order.js');
const Person = require('../models/person.js');

module.exports.index = (req, res) => {
    Main.find({}, (err, allItem) => {
        if (err) return res.sendStatus(500);
        res.render('indexView', {
            title: 'Оказание юридических услуг жителям Юрист-на-Дону, г.Ростова и Ростовской области',
            isIndex: true,
            ads: allItem.ad,
            direction: allItem.activity,
            gallery: allItem.service,
            about: aboutService,
            condition: slideService,
            address: addressTable,
            priceList: allItem.order,
            phone: '+7 (951) 839-59-39',
            year: currentYear
        });
    });
}

module.exports.price = (req, res) => {
    Order.find({}, (err, allOrders) => {
        if (err) return res.sendStatus(500);

        res.render('priceView', {
            title: 'Прайс-лист',
            priceList: allOrders,
            isHidden: true,
            isPrice: true,
            isInvisible: true
        });
    });
}

module.exports.contacts = (req, res) => {
    res.render('contactsView', {
        title: 'Контакты - Юрист-на-Дону, г.Ростова-на-Дону',
        isContact: true
    });
}

module.exports.dashboard = (req, res) => {
    Person.find({}, (err, allPerson) => {
        if (err) return res.sendStatus(500);
        res.render('dashboardView', {
            title: 'Панель расширенных возможностей',
            messageList: 'Заявки пользователей',
            persons: allPerson,
            isHidden: true,
            isInvisible: true
        });
    });
}

module.exports.notFound = (req, res) => {
    res.render('404', {
        title: 'Запрашиваемая страница не была найдена',
        isHidden: true,
        isInvisible: true
    });
}