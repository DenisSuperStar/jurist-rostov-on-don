const mailer = require('nodemailer');
const credit = require('./credit/credit.js');

// настройки почтового сервера
const transporter = mailer.createTransport({
    host: `${credit.mail}`,
    port: credit.port,
    secure: credit.protect,
    auth: {
        user: `${credit.login}`,
        pass: `${credit.passw}`
    }
});


module.exports = async (message) => {
    await transporter.sendMail(message, (err, info) => {
        if (err) throw err;

        // Выводим messageId
        console.log('Message sent: %s', info.messageId);
        
        // Preview mail message
        console.log('Preview URL: %s', mailer.getTestMessageUrl(info));
    });
}