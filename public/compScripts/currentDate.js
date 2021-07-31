const now = new Date();
const currentDate = $('#currentDate');
const getMonth = now.getUTCMonth() + 1;
const getDay = now.getUTCDate();
const getYear = now.getUTCFullYear();
let getNameMonth;

switch(getMonth) {
    case 1:
        getNameMonth = 'Января';
        break;
    case 2:
        getNameMonth = 'Февраля';
        break;
    case 3:
        getNameMonth = 'Марта';
        break;
    case 4:
        getNameMonth = 'Апреля';
        break;
    case 5:
        getNameMonth = 'Мая';
        break;
    case 6:
        getNameMonth = 'Июня';
        break;
    case 7:
        getNameMonth = 'Июля';
        break;
    case 8:
        getNameMonth = 'Августа';
        break;
    case 9:
        getNameMonth = 'Сентября';
        break;
    case 10:
        getNameMonth = 'Октября';
        break;
    case 11:
        getNameMonth = 'Ноября';
        break;
    case 12:
        getNameMonth = 'Декабря';
}
       
currentDate.prepend(`
    <div class="tab__day">Текущая дата: ${getDay} ${getNameMonth} ${getYear}</div>
`);      