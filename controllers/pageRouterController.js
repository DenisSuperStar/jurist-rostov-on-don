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