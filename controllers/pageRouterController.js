module.exports.index = (req, res) => {
    res.render('index', {
        title: 'Оказание юридических услуг жителям Юрист-на-Дону, г.Ростова и Ростовской области',
        direction: [
            {
                id: '1',
                header: '01 ____ области экспертизы', 
                directionName: 'Гражданско-правовые споры', 
                title: 'Узнать больше',
                imageUrl: '../../assets/strong.jpg',
                sectionId: 'balance-scale'
                
            },
            {   
                id: '2',
                directionName: 'Семейно-правовые споры',
                title: 'Подробнее',
                imageUrl: '../../assets/justice.jpg',
                sectionId: 'handshake'
            }
        ],

        cards: [
            {
                name: 'Алиментные обстоятельства',
                title: 'Алиментные споры',
                src: '../assets/handcuffs.svg',
                text: `Урегулирование споров
                        по взысканию алиментов`
            },
            {
                name: 'Развод и раздел имущества',
                title: 'Раздел имущества',
                src: '../assets/rings.svg',
                text: `Защита имущественных интересов
                        клиентов при разводе`
            },
            {
                name: 'Родительские права',
                title: 'Родительские права',
                src: '../assets/protection.svg',
                text: `Помощь в спорах,
                        связанных с правами на детей`
            },
            {
                name: 'Вопросы по усыновлению',
                title: 'Вопросы усыновления',
                src: '../assets/statue.svg',
                text: `Консультации при усыновлении детей`
            },
            {
                name: 'Общение с ребенком',
                title: 'Споры при разводе',
                src: '../assets/balance.svg',
                text: `Помощь в решении конфликтов 
                        при разводе родителей`
            },
            {
                name: 'Семейный психолог',
                title: 'Семейный психолог',
                src: '../assets/solution.svg',
                text: `Помощь в решении конфликтов супругов, 
                        родителей и детей`
            }  
        ],

        conditions: [
            {   
                itemId: 1,
                title: 'Обращение в компанию',
                text: 'Вы оставляете заявку на сайте или по телефону',
                info: '+7 (951) 839 59 39',
                src: '../../assets/table.jpg'
            },
            {   
                itemId: 2,
                title: 'Обратная связь',
                text: 'Менеджер связывается с вами для обсуждения деталей',
                src: '../../assets/calling.jpg'
            },
            {
                itemId: 3,
                title: 'Этап подписания договора',
                text: `
                        Согласование деталей и заключение договора
                        на оказание услуг
                `,
                src: '../../assets/singing.jpg'
            },
            {
                itemId: 4,
                title: 'Решение вопроса',
                text: 'Наши лучшие специалисты решают вашу проблему',
                src: '../../assets/deal.jpg'
            }
        ],

        address: [
            {
                title: 'Телефон',
                info: '+7 (951) 839-59-39',
                name: 'phone'
            },
            {
                title: 'Адрес',
                info: 'Ростов-на-Дону, ул.Максима Горького, 151',
                name: 'clock'
            },
            {
                title: 'Часы',
                info: 'Пон-Вс: 10.00 – 20.00',
                name: 'home'
            },
            {
                title: 'Email',
                info: 'sergeynazarov161@yandex.ru',
                name: 'envelope'
            }
        ]
    });
}

module.exports.about = (req, res) => {
    res.render('about', {
        title: 'О компании "Юрист-на-Дону", Ростова-на-Дону'
    });
}

module.exports.services = (req, res) => {
    res.render('services', {
        title: 'Прайс-лист'
    });
}

module.exports.contacts = (req, res) => {
    res.render('contacts', {
        title: 'Контакты - Юрист-на-Дону, г.Ростова-на-Дону'
    });
}

module.exports.contactUs = (req, res) => {
    res.render('contactUs', {
        title: 'Напишите нам'
    });
}