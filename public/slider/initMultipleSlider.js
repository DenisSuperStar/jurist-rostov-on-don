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
       mobileFirst: true,
       responsive: [
        {
            breakpoint: 1024,
            settings: {
                autoplay: false,
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                arrows: true,
                dots: false
            } 
        },
        {
            breakpoint: 768,
            settings: {
                autoplay: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                arrows: false,
                dots: true
            } 
        },
        {
            breakpoint: 414,
            settings: {
                autoplay: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                arrows: false,
                dots: true
            }
        },
        {
            breakpoint: 375,
            settings: {
                autoplay: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                arrows: false,
                dots: true
            }
        },
        {
            breakpoint: 360,
            settings: {
                autoplay: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                arrows: false,
                dots: true
            } 
        },
        {
            breakpoint: 320,
            settings: {
                autoplay: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                arrows: false,
                dots: true
            }
        }
       ]
   });
});