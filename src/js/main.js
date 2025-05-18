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
  $('ul.catalog__tabs').on(
    'click',
    'li:not(.catalog__tab_active)',
    function () {
      $(this)
        .addClass('catalog__tab_active')
        .siblings()
        .removeClass('catalog__tab_active')
        .closest('div.container')
        .find('div.catalog__content')
        .removeClass('catalog__content_active')
        .eq($(this).index())
        .addClass('catalog__content_active');
    }
  );

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content')
          .eq(i)
          .toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });
  }
  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  $('[data-modal=consultation]').on('click', () => {
    $('.overlay, #consultation').fadeIn();
  });

  $('.modal__close').on('click', () => {
    $('.overlay, #consultation, #order, #thanks').fadeOut();
  });
  $('.btn_mini').on('click', function () {
    const i = $('.btn_mini').index(this);
    $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
    $('.overlay, #order').fadeIn();
  });

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          minlength: 2,
          required: true,
        },
        phone: 'required',
        email: {
          email: true,
          required: true,
        },
        message: {
          name: {
            required: 'Please, enter your name',
            minlength: jQuery.validator.format('Please, enter {0} symbols'),
          },
          email: {
            email: 'Please, enter correct e-mail',
          },
        },
      },
    });
  }
  validateForms('.form_feed');
  validateForms('#consultation form');
  validateForms('#order form');

  $('input[name=phone]').mask('+99 (999) 999-999');

  $('form').submit((e) => {
    e.preventDefault();
    if (!$(this).valid()) {
      return;
    }
    $.ajax({
      type: 'POST',
      url: 'mailer/smart.php',
      data: $(this).serialize(),
    }).done(() => {
      $(this).find('input').val('');
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
    });
    return false;
  });

  $(window).scroll(() => {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });
});
