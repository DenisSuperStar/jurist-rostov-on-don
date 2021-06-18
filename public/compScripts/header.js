const header = $('.header');
const menu = $('.index');
let scrollPrev = 0;

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