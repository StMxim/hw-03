(() => {
  // Отримуємо необхідні DOM елементи
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');
  const body = document.body;
  const menuLinks = document.querySelectorAll('.mobile-menu-nav .link');
  const contactLinks = document.querySelectorAll('.mobile-contacts-nav .link');
  const socialLinks = document.querySelectorAll('.mobile-socials .link');

  // Функція для анімації елементів меню при відкритті
  const animateMenuItems = () => {
    // Скидаємо стилі перед анімацією
    const allElements = [...menuLinks, ...contactLinks, ...socialLinks];
    allElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateX(20px)';
      element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });

    // Анімуємо кожен елемент з затримкою
    let delay = 0.1;
    menuLinks.forEach(link => {
      setTimeout(() => {
        link.style.opacity = '1';
        link.style.transform = 'translateX(0)';
      }, delay * 1000);
      delay += 0.1;
    });

    delay += 0.1; // Додаткова затримка перед анімацією контактів
    contactLinks.forEach(link => {
      setTimeout(() => {
        link.style.opacity = '1';
        link.style.transform = 'translateX(0)';
      }, delay * 1000);
      delay += 0.1;
    });

    delay += 0.1; // Додаткова затримка перед анімацією соцмереж
    socialLinks.forEach(link => {
      setTimeout(() => {
        link.style.opacity = '1';
        link.style.transform = 'translateX(0)';
      }, delay * 1000);
      delay += 0.05;
    });
  };

  // Функція для закриття меню з параметром анімації
  const closeMenu = (animate = true) => {
    if (!mobileMenu.classList.contains('is-open')) return;
    
    openMenuBtn.setAttribute('aria-expanded', false);
    openMenuBtn.focus();
    
    if (animate) {
      // Додаємо клас для анімації закриття
      mobileMenu.classList.add('is-closing');
      
      // Анімуємо зникнення елементів меню
      const allElements = [...menuLinks, ...contactLinks, ...socialLinks];
      allElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(10px)';
      });
      
      // Чекаємо закінчення анімації перед повним закриттям
      setTimeout(() => {
        mobileMenu.classList.remove('is-open');
        mobileMenu.classList.remove('is-closing');
        enableBodyScroll();
      }, 300); // Час має відповідати тривалості CSS-переходу
    } else {
      mobileMenu.classList.remove('is-open');
      enableBodyScroll();
    }
  };

  // Функція для відкриття меню
  const openMenu = () => {
    if (mobileMenu.classList.contains('is-open')) return;
    
    openMenuBtn.setAttribute('aria-expanded', true);
    mobileMenu.classList.add('is-open');
    closeMenuBtn.focus();
    disableBodyScroll();
    
    // Запускаємо анімацію елементів меню
    animateMenuItems();
  };

  // Функція переключення стану меню
  const toggleMenu = () => {
    const isMenuOpen = openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Функції для блокування/розблокування скролу
  const disableBodyScroll = () => {
    if (typeof bodyScrollLock !== 'undefined' && bodyScrollLock.disableBodyScroll) {
      bodyScrollLock.disableBodyScroll(document.body);
    } else {
      const scrollY = window.scrollY;
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.width = '100%';
      body.dataset.scrollY = scrollY;
    }
  };

  const enableBodyScroll = () => {
    if (typeof bodyScrollLock !== 'undefined' && bodyScrollLock.enableBodyScroll) {
      bodyScrollLock.enableBodyScroll(document.body);
    } else {
      const scrollY = parseInt(body.dataset.scrollY || '0');
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      window.scrollTo(0, scrollY);
    }
  };

  // Обробники подій
  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', closeMenu);

  // Закриваємо мобільне меню при натисканні на посилання
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      // Додаємо затримку перед закриттям меню для кращого UX
      setTimeout(() => {
        closeMenu();
      }, 150);
    });
  });

  // Ефект при наведенні на меню-бургер
  openMenuBtn.addEventListener('mouseenter', () => {
    const hamburger = openMenuBtn.querySelector('.hamburger');
    if (hamburger) {
      const lines = hamburger.querySelectorAll('.line');
      if (lines.length === 3) {
        lines[0].style.transform = 'translateY(2px)';
        lines[2].style.transform = 'translateY(-2px)';
      }
    }
  });

  openMenuBtn.addEventListener('mouseleave', () => {
    const hamburger = openMenuBtn.querySelector('.hamburger');
    if (hamburger) {
      const lines = hamburger.querySelectorAll('.line');
      if (lines.length === 3) {
        lines[0].style.transform = '';
        lines[2].style.transform = '';
      }
    }
  });

  // Закриваємо мобільне меню при натисканні Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Закриваємо мобільне меню при кліку поза ним
  document.addEventListener('click', (e) => {
    const isClickInside = mobileMenu.contains(e.target) || 
                          openMenuBtn.contains(e.target);
    
    if (!isClickInside && mobileMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Відстеження зміни медіа-запиту для адаптивності
  const mediaQuery = window.matchMedia('(min-width: 768px)');
  const handleTabletChange = (e) => {
    if (!e.matches) return;
    closeMenu(false); // Закриваємо без анімації при зміні розміру вікна
  };
  
  mediaQuery.addEventListener('change', handleTabletChange);

  // Відстеження змін орієнтації пристрою
  window.addEventListener('orientationchange', () => {
    // Невелика затримка для коректної обробки змін орієнтації
    setTimeout(() => {
      if (window.innerWidth >= 768) {
        closeMenu(false);
      }
    }, 200);
  });
  
  // Додаємо активний клас для поточного розділу
  const updateActiveLink = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.mobile-menu-nav .link');
    
    let found = false;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight && !found) {
        navLinks.forEach(link => {
          link.classList.remove('current');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('current');
            found = true;
          }
        });
      }
    });
  };
  
  // Відстежуємо скролінг для оновлення активного посилання
  window.addEventListener('scroll', updateActiveLink);
  
  // Ініціалізуємо активне посилання при завантаженні
  window.addEventListener('load', updateActiveLink);
})();