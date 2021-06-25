// Высота документа
const docHeight = $(document).height();

// Когда DOM почти загружен, ...
document.addEventListener('DOMContentLoaded', () => {
    // Прячем элемент "Вверх"
    $('#toTop').hide();
    // Показываем элемент "Вниз"
    $('#toBottom').show();
});

// При срабатывании события scroll
window.addEventListener('scroll', function() {
    // Анимация кнопки "Вверх"
    if ($(this).scrollTop() >= 1000) $('#toTop').show(500);
    else if ($(this).scrollTop() < 1000) $('#toTop').hide(500);
    
    // Анимация кнопки "Вниз"
    if ($(this).scrollTop() >= (docHeight - 1211)) $('#toBottom').hide(500);
    else if ($(this).scrollTop() < (docHeight - 1211)) $('#toBottom').show(500);
});


// Анимация прокрутки вверх
$('#toTop').on('click', () => {
    $('html, body').animate({scrollTop: 0}, 800);
});

// Анимация прокрутки вверх
$('#toBottom').on('click', () => {
    $('html, body').animate({scrollTop: (docHeight - 1211)}, 800);
});