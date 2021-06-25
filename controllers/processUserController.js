const user = require('../models/user.js');
const { v4: uuidv4 } = require('uuid');

module.exports.addUserComment = (req, res) => {
    const body = JSON.parse(JSON.stringify(req.body));
    if (!body.userName || !body.userEmail || !body.userPhone || !body.userMessage) res.sendStatus(400);

    const userName = body.userName;
    const userEmail = body.userEmail;
    const userPhone = body.userPhone;
    const message = body.userMessage;

    const user = new User({
        id: uuidv4(),
        userName,
        userEmail,
        userPhone,
        userMessage: message
    });

    user.save((err) => {
        if (err) throw err;
    });

    const template = `
        <div style="display: flex; flex-direction: column; font-size: 25px;">
            <span>
                Мы <strong>рассмотрим</strong> вашу заявку и <strong>перезвоним</strong>!
            </span>
            <br>
            <a href="/about" style="text-decoration: none; cursor: pointer;">На страницу "О нас"</a>
        </div>
    `;

    res.send(`${template}`);
}

module.exports.showUserComment = (req, res) => {
    user.find({}, (err, all) => {
        if (err) throw err;
        res.render('dashboard.hbs', {
            users: all,
            title: 'Список пользователей'
        });
    });
}