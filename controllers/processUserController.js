const User = require('../models/user.js');

module.exports.addPerson = (req, res) => {
    res.render('aboutView', {
        title: 'О компании "Юрист-на-Дону", Ростова-на-Дону',
        isAbout: true
    });
}

module.exports.createPerson = (req, res) => {
    const uName = req.body.userName;
    const uEmail = req.body.userEmail;
    const uPhone = req.body.userPhone;
    const uMessage = req.body.userMessage;

    if (!uName || !uEmail || !uPhone || !uMessage) return res.sendStatus(400);

    const person = new User(uName, uEmail, uPhone, uMessage);
    person.save();

    res.redirect('/about');
}

module.exports.getPerson = (req, res) => {
    res.render('mailView', {
        title: 'Заявки пользователей',
        persons: User.getAll(),
        isHidden: true,
        isInvisible: true
    });
}