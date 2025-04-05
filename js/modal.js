document.addEventListener('DOMContentLoaded', function () {
  // Знаходимо кнопку, яка відкриває модальне вікно
  const openModalBtn = document.querySelector('.hero-button');

  // Знаходимо або створюємо модальне вікно
  let modalWindow = document.querySelector('.modal');

  if (!modalWindow) {
    // Якщо модального вікна немає, створюємо його
    modalWindow = document.createElement('div');
    modalWindow.className = 'modal';
    modalWindow.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Замовити сайт</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <p>Заповніть форму нижче, і ми зв'яжемося з вами найближчим часом.</p>
            <form class="modal-form" name="order-form" autocomplete="off">
              <label class="form-label" for="order-name">
                Ім'я
                <input type="text" name="name" id="order-name" class="form-input" required placeholder="Ваше ім'я">
              </label>
              <label class="form-label" for="order-email">
                Email
                <input type="email" name="email" id="order-email" class="form-input" required placeholder="example@mail.com">
              </label>
              <label class="form-label" for="order-phone">
                Телефон
                <input type="tel" name="phone" id="order-phone" class="form-input" required placeholder="+380 XX XXX XX XX">
              </label>
              <label class="form-label" for="order-project-type">
                Тип проекту
                <select name="project-type" id="order-project-type" class="form-input" required>
                  <option value="" disabled selected>Оберіть тип проекту</option>
                  <option value="landing">Лендінг</option>
                  <option value="corporate">Корпоративний сайт</option>
                  <option value="e-commerce">Інтернет-магазин</option>
                  <option value="custom">Індивідуальний проект</option>
                </select>
              </label>
              <label class="form-label" for="order-message">
                Деталі проекту
                <textarea name="message" id="order-message" class="form-textarea" placeholder="Опишіть ваш проект..."></textarea>
              </label>
              <button type="submit" class="form-button modal-submit">Відправити заявку</button>
            </form>
          </div>
        </div>
      `;

    // Додаємо модальне вікно до body
    document.body.appendChild(modalWindow);
  }

  // Знаходимо кнопку закриття
  const closeModalBtn = modalWindow.querySelector('.modal-close');

  // Знаходимо форму в модальному вікні
  const modalForm = modalWindow.querySelector('.modal-form');

  // Функція для відкриття модального вікна
  function openModal() {
    modalWindow.classList.add('active');
    document.body.style.overflow = 'hidden'; // Забороняємо прокрутку body

    // Фокус на перше поле форми
    const firstInput = modalWindow.querySelector('input');
    if (firstInput) {
      setTimeout(() => {
        firstInput.focus();
      }, 300);
    }
  }

  // Функція для закриття модального вікна
  function closeModal() {
    modalWindow.classList.remove('active');
    document.body.style.overflow = ''; // Відновлюємо прокрутку body
  }

  // Відкриваємо модальне вікно при кліку на кнопку
  if (openModalBtn) {
    openModalBtn.addEventListener('click', openModal);
  }

  // Закриваємо модальне вікно при кліку на кнопку закриття
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Закриваємо модальне вікно при кліку поза ним
  modalWindow.addEventListener('click', function (event) {
    if (event.target === modalWindow) {
      closeModal();
    }
  });

  // Закриваємо модальне вікно при натисканні Esc
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  // Обробка відправки форми в модальному вікні
  if (modalForm) {
    modalForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Перевірка на заповненість полів
      let isValid = true;
      let emptyFields = [];

      const formElements = modalForm.elements;

      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];

        if (
          (element.tagName === 'INPUT' ||
            element.tagName === 'SELECT' ||
            element.tagName === 'TEXTAREA') &&
          element.required
        ) {
          if (!element.value.trim()) {
            isValid = false;
            emptyFields.push(element.name || 'Поле #' + (i + 1));
          }
        }
      }

      if (!isValid) {
        alert('Будь ласка, заповніть наступні поля: ' + emptyFields.join(', '));
        return;
      }

      // Збираємо дані форми
      const formData = {};

      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];

        if (
          element.name &&
          (element.tagName === 'INPUT' ||
            element.tagName === 'SELECT' ||
            element.tagName === 'TEXTAREA')
        ) {
          formData[element.name] = element.value;
        }
      }

      console.log('Форма замовлення відправлена:', formData);

      // Показуємо повідомлення про успішне відправлення
      alert("Дякуємо за заявку! Ми зв'яжемося з вами найближчим часом.");

      // Закриваємо модальне вікно і очищаємо форму
      modalForm.reset();
      closeModal();
    });
  }
});
