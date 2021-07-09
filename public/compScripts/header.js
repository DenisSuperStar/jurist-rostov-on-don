const header = $('.header');
const menu = $('.index');
let scrollPrev = 0;
const btnHumb = $('#btnHumb');
const dropdownHumb = $('#dropdownHumb');
const dropdownList = $('#header__menu-humb');
const dropdownItem = $('.header__item-humb');

$(() => {
    window.addEventListener('scroll', function() {
        const scrolled = $(this).scrollTop();
    
        if ((scrolled > 100) && (scrolled > scrollPrev)) {
            header.addClass('out');
            menu.addClass('scroll');
        } else {
            header.removeClass('out');
            menu.removeClass('scroll');
        }
        scrollPrev = scrolled; 
    });
    
    btnHumb.on('click', () => {
        if (dropdownHumb.hasClass('is-open')) {
            dropdownHumb.removeClass('is-open');
        } else {
            dropdownHumb.addClass('is-open');
        }
    });

    dropdownItem.on('click', e => {
        $('.header__item-humb').each(function() {
            $(this).removeClass('is-active');
        });

        if ($(e.target)) {
            $(e.target).addClass('is-active');
        }
    });
});