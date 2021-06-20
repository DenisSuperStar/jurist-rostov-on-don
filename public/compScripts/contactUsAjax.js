$('.is-send').on('click', (e) => {
    // сбрасываем функционал формы по умолчанию
    e.preventDefault();
    // получаем данные формы
    const sendUsForm = document.forms['sendUsForm'];
    const name = sendUsForm.elements['name'].value;
    const email = sendUsForm.elements['email'].value;
    const phone = sendUsForm.elements['phone'].value;

    // сериализуем данные в JSON
    const user = JSON.stringify({
        userName: name,
        userEmail: email,
        userPhone: phone
    });

    const ajax = new XMLHttpRequest();

    // посылаем запрос на адрес "/"
    ajax.open('POST', '/about', true);
    ajax.setRequestHeader(
        'Content-Type',
        'application/json'
    );
    
    ajax.addEventListener('load', () => {
        // получаем и парсим ответ сервера

        const serverData = JSON.parse(ajax.response);

        //выводим данные пользователя в консоль
        console.log(
            'С сервера получены следующие данные:',
            'Имя пользователя: ',
            serverData.userName,
            'E-mail пользователя: ',
            serverData.userEmail,
            'Телефон пользователя: ',
            serverData.userPhone
        );
    });
    ajax.send(user);
});