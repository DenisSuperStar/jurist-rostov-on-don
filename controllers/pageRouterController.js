// подключение модели
const File = require('../models/home.js');
// создаем экземпляр объекта File
const file = new File();
// получаем массивы методом распаковки
const {
    direction,
    exsistService,
    aboutService,
    slides,
    addressTable
} = file.convertFileData();

module.exports.index = (req, res) => {
    res.render('indexView', {
        title: 'Оказание юридических услуг жителям Юрист-на-Дону, г.Ростова и Ростовской области',
        
        /*
            Передаем преобразованные массивы из home.js в представления
        */

        direction: direction,
        gallery: exsistService,
        about: aboutService, 
        condition: slides,
        address: addressTable
    });
}

module.exports.about = (req, res) => {
    res.render('aboutView', {
        title: 'О компании "Юрист-на-Дону", Ростова-на-Дону'
    });
}

module.exports.services = (req, res) => {
    res.render('servicesView', {
        title: 'Прайс-лист'
    });
}

module.exports.contacts = (req, res) => {
    res.render('contactsView', {
        title: 'Контакты - Юрист-на-Дону, г.Ростова-на-Дону'
    });
}

module.exports.notFound = (req, res) => {
    res.render('404', {
        title: 'Запрашиваемая страница не была найдена'
    });
}