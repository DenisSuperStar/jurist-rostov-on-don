$('#is-send').on('click', e => {
    /*e.preventDefault();*/

    const sendForm = document.forms['sendForm'];
    const userName = sendForm.elements['userName'].value;
    const userEmail = sendForm.elements['userEmail'].value;
    const userPhone = sendForm.elements['userPhone'].value;
    const userMessage = sendForm.elements['userMessage'].value;

    const feedback = JSON.stringify({
        userName,
        userEmail,
        userPhone,
        userMessage
    });

    const ajax = new XMLHttpRequest();

    ajax.open('POST', '/', true);
    ajax.setRequestHeader(
        'Content-Type',
        'application/json'
    );

    ajax.addEventListener('load', () => {
        const back = JSON.parse(ajax.response);
        
        console.log(
            'С сервера получены следующие данные о заявке',
            'Имя пользователя: ',
            back.userName,
            'E-mail пользователя: ',
            back.userEmail,
            'Телефон пользователя: ',
            back.userPhone,
            'Сообщение пользователя: ',
            back.userMessage
        );
    });
    ajax.send(feedback);
});