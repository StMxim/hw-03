document.addEventListener('DOMContentLoaded', function () {
  // Перевіряємо, чи є підтримка Swiper
  if (typeof Swiper !== 'undefined') {
    // Ініціалізуємо слайдер для секції портфоліо
    const portfolioSwiper = new Swiper('.portfolio-swiper', {
      slidesPerView: 1, // По замовчуванню на мобільних - 1 слайд
      spaceBetween: 20,
      loop: true, // Зациклюємо слайдер
      autoplay: {
        delay: 5000, // 5 секунд між слайдами
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // Адаптивні налаштування для різних розмірів екрану
      breakpoints: {
        // >= 480px
        480: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        // >= 768px
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        // >= 1200px
        1200: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      },
    });
  }
});

// Функція для перевірки ширини вікна та відображення слайдера (опціонально)
function checkWindowSizeForSlider() {
  const portfolioGrid = document.querySelector('.portfolio-grid');
  const portfolioSwiper = document.querySelector('.portfolio-swiper');

  if (window.innerWidth < 768) {
    // На мобільних відображаємо слайдер
    if (portfolioGrid && portfolioSwiper) {
      portfolioGrid.style.display = 'none';
      portfolioSwiper.style.display = 'block';
    }
  } else {
    // На планшетах і десктопах відображаємо сітку
    if (portfolioGrid && portfolioSwiper) {
      portfolioGrid.style.display = 'grid';
      portfolioSwiper.style.display = 'none';
    }
  }
}

// Викликаємо функцію при завантаженні та зміні розміру вікна
window.addEventListener('load', checkWindowSizeForSlider);
window.addEventListener('resize', checkWindowSizeForSlider);
