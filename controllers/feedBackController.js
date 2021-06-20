module.exports.feedBack = (req, res) => {
    // вывод тела запрос в консоль для проверки
    console.log(req.body);

    // отправляем 400 статус на клиент, если тело запроса пусто
    if (!req.body) return res.sendStatus(400);

    // инициализация параметров функции отправки письма
    const personEmail = req.body.userEmail;
    const personName = req.body.userName;
    const personMessage = req.body.userMessage;
    const personPhone = req.body.userPhone;
    const gmailUserEmail = 'ignatalex4991@gmail.com';
    const gmailUserPassword = 'itProger1994';
    const host = 'pop.gmail.com';
    const port = 995;
    const secure = true;

    // функция отправки письма
    const mailer = async (email, name, message, phone, gmailEmail, gmailPass, host, port, protect) => {
        // создание объекта для передачи данных
        const transporter = nodemailer.createTransport({
            host: `${host}`,
            port: `${port}`,
            secure: `${protect}`,
            auth: {
                user: gmailEmail,
                pass: gmailPass
            }
        });

        // передача данных на конечный E-mail
        const sendMessage = await transporter.sendMail({
            from: `${email}`,
            to: `${gmailEmail}`,
            subject: `Вопрос от ${name}`,
            text: `У вас новый вопрос от ${name}: ${message}. Телефон для связи: ${phone}`,
            html: `У вас <strong>новый вопрос</strong> от <strong>${name}</strong>: <i>${message}</i>. 
                    Телефон для связи: <strong>${phone}</strong>.`
        });

        // вывод отправленного сообщения в консоль
        console.log(sendMessage);
    }

    // вызов функции mailer
    mailer(
        personEmail,
        personName,
        personMessage,
        personPhone,
        gmailUserEmail,
        gmailUserPassword,
        host,
        port,
        secure
    );
}