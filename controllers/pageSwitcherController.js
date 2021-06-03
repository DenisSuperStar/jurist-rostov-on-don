module.exports.index = (req, res) => {
    res.render('index', {
        title: 'Оказание юридических услуг жителям Юрист-на-Дону, г.Ростова и Ростовской области'
    });
}

module.exports.about = (req, res) => {
    res.render('about', {
        title: 'О компании "Юрист-на-Дону", Ростова-на-Дону'
    });
}

module.exports.services = (req, res) => {
    res.render('services', {
        title: 'Прайс-лист'
    });
}

module.exports.contacts = (req, res) => {
    res.render('contacts', {
        title: 'Контакты - Юрист-на-Дону, г.Ростова-на-Дону'
    });
}

module.exports.contactUs = (req, res) => {
    res.render('contactUs', {
        title: 'Напишите нам'
    });
}