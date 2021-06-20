module.exports.contactUs = (req, res) => {
    // выводим тело запроса в консоль
    console.log(req.body);

    // отправляем 400 статус на клиент, если тело пусто
    if (!req.body) return res.sendStatus(400);
    
    // параметры для функции отправки письма
    const userEmail = req.body.userEmail;
    const userName = req.body.userName;
    const userPhone = req.body.userPhone;
    const gmailUserEmail = 'ignatalex4991@gmail.com';
    const gmailUserPassword = 'itProger1994';
    const host = 'pop.gmail.com';
    const port = 995;
    const secure = true;


    // функция отправки письма на эл.почту
    const sendMail = async (mail, name, mobile, gmailEmail, gmailPass, host, port, secure) => {
        const transporter = nodemailer.createTransport({
            host: `${host}`,
            port: `${port}`,
            secure: `${secure}`,
            auth: {
                user: gmailEmail,
                pass: gmailPass
            }
        });

        // передача данных на конечный E-mail
        const message = await transporter.sendMail({
            from: `${mail}`,
            to: `${gmailEmail}`,
            subject: `Заявка на устную консультацию ${name}.`,
            text: `Вас ожидает ${name}. Телефон для связи с клиентом: ${mobile}.`,
            html: `<strong>Вас ожидает</strong> ${name}. <strong>Телефон для связи</strong> с клиентом: <strong>${mobile}</strong>.`
        });

        // вывод отправленного сообщения в консоль
        console.log(message);
    }

    // вызов функции mailer
    sendMail(
        userEmail,
        userName,
        userPhone,
        gmailUserEmail,
        gmailUserPassword,
        host,
        port,
        secure
    );
}