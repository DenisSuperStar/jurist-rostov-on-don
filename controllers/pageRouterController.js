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
        isIndex: true,
        
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

module.exports.price = (req, res) => {
    res.render('priceView', {
        title: 'Прайс-лист'
    });
}

module.exports.contacts = (req, res) => {
    res.render('contactsView', {
        title: 'Контакты - Юрист-на-Дону, г.Ростова-на-Дону',
        isContact: true
    });
}

module.exports.notFound = (req, res) => {
    res.render('404', {
        title: 'Запрашиваемая страница не была найдена',
        isHidden: true
    });
}