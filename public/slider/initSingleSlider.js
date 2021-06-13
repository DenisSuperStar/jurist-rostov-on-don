document.addEventListener('DOMContentLoaded', () => {
    $('.slider-text').slick({
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: false,
        dots: true,
        fade: true,
        infinite: true,
        mobileFirst: true,
        pauseOnDotsHover: true,
        cssEase: 'ease-in-out'
    });
});