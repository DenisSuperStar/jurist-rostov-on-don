document.addEventListener('DOMContentLoaded', () => {
    $('.carousel-image').slick({
       adaptiveHeight: true,
       autoplay: true,
       autoplaySpeed: 7000,
       arrows: true,
       dots: false,
       infinite: true,
       slidesToShow: 2,
       slidesToScroll: 2,
       mobileFirst: true
   });
});