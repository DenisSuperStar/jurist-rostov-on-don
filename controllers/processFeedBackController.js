const Person = require('../models/person.js');

module.exports.addPerson = (req, res) => {
    res.render('aboutView', {
        title: 'О компании "Юрист-на-Дону", Ростова-на-Дону',
        isAbout: true
    });
}

module.exports.createPerson = (req, res) => {
    const {body} = req;

    const uName = body.userName;
    const uEmail = body.userEmail;
    const uPhone = body.userPhone;
    const uMessage = body.userMessage;;

    if (uName && uEmail && uPhone && uMessage) {
        const person = new Person({
            userName: uName,
            userEmail: uEmail,
            userPhone: uPhone,
            userMessage: uMessage
        });

        person.save(err => {
            if (err) process.exit(-1);

            res.redirect('/about');
        });
    } else {}
}