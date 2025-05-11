$(document).ready(() => {
  $('.carousel__inner').slick({
    infinity: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear',
    prevArrow:
      '<button type="button" class="slick-prev"><img src = "icons/carousel/carousel_left.svg"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src = "icons/carousel/carousel_right.svg"></button>',

    responsive: [
      {
        breakpoint: 1440,
        settings: {
          arrows: false,
        },
      },
    ],
  });
});
