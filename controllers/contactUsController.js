// испорт функции отправки сообщения на почту
const sendMail = require('../mail.js');
const credit = require('../credit/credit.js');

module.exports.contactUs = (req, res) => {
    const body = JSON.parse(JSON.stringify(req.body));
    const template = `
        <div style="display: flex; flex-direction: column; font-size: 25px;">
            <span>
                Ваши данные <strong>успешно</strong> отправлены!
                <br>
                <strong>В ближайшее время</strong> наш менеджер <strong>свяжется</strong> с вами.
            </span>
            <a href="/" style="text-decoration: none; cursor: pointer">Вернуться на главную</a>
        </div>
    `;

    if (!body.name || !body.email || !body.phone) res.sendStatus(400);

    const message = {
        from: `${credit.nickname} <${credit.login}>` ,
        to: body.email,
        subject: `Пользователь ${body.name} ожидает вашего ответа`,
        text: `
            ${body.name} ждет вашего ответа.
            <br>
            Телефон для связи: ${body.phone}
            <br>
            Это письмо не требует ответа! Пожалуйста, не отвечайте на него.
        `,
        html: `
            <strong>${body.name}</strong> ждет вашего ответа.
            <br>
            <strong>Телефон</strong> для <i>связи</i>: <strong>${body.phone}</strong>
            <br>
            Это письмо не требует ответа! Пожалуйста, не отвечайте на него.
        `
    }

    sendMail(message).catch(console.error);

    res.send(`${template}`); 
}