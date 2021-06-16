document.addEventListener('DOMContentLoaded', () => {
    $('#contactUs').validate({
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true
            }
        },
        messages: {
            name: {
                required: 'Поле с именем должно быть заполнено'
            },
            email: {
                required: 'Вы не ввели E-mail адрес',
                email: 'E-mail адрес должен быть корректным'
            },
            phone: {
                required: 'Введите ваш номер телефона'
            }
        }
    });
});