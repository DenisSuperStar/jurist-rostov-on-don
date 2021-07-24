const Person = require('../models/person.js');

module.exports.addPerson = (req, res) => {
    res.render('aboutView', {
        title: 'О компании "Юрист-на-Дону", Ростова-на-Дону',
        isAbout: true
    });
}

module.exports.createPerson = (req, res) => {
    const body = JSON.parse(JSON.stringify(req.body));
    const uName = body.userName;
    const uEmail  = body.userEmail;
    const uPhone = body.userPhone;
    const uMessage = body.userMessage;

    if (!uName || !uEmail || !uPhone || !uMessage) return res.sendStatus(400);

    const person = new Person({
        userName: uName,
        userEmail: uEmail,
        userPhone: uPhone,
        userMessage: uMessage
    });

    person.save(err => {
        if (err) return res.sendStatus(500);
        res.redirect('/about');
    });
}

module.exports.getPerson = (req, res) => {
    Person.find({}, (err, allPerson) => {
        if (err) return res.sendStatus(500);
        res.render('mailView', {
            title: 'Заявки пользователей',
            persons: allPerson,
            isHidden: true,
            isInvisible: true
        });
    });
}