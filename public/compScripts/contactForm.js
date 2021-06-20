document.addEventListener('DOMContentLoaded', () => {
    $('#contactForm').validate({
        rules: {
            userName: {
                required: true
            },
            userEmail: {
                required: true,
                email: true
            },
            userPhone: {
                required: true
            },
            userMessage: {
                required: true,
                maxlength: 1024
            }
        },
        messages: {
            userName: {
                required: 'Имя пользователя должно быть заполнено'
            },
            userEmail: {
                required: 'Введите ваш E-mail адрес',
                email: 'Введен некорректный E-mail'
            },
            userPhone: {
                required: 'Поле телефон не заполнено'
            },
            userMessage: {
                required: 'Введите текст вашего сообщения',
                maxlength: 'Превышен допустимый лемит в {0} символа'
            }
        }
    });
});