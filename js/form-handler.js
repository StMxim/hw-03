document.addEventListener('DOMContentLoaded', function () {
  // Знаходимо форму контактів
  const contactForm = document.querySelector('.contact-form');

  // Масив для зберігання відправлених форм
  let submittedForms = [];

  // Перевіряємо, чи є дані в localStorage
  if (localStorage.getItem('submittedForms')) {
    try {
      submittedForms = JSON.parse(localStorage.getItem('submittedForms'));
    } catch (error) {
      console.error('Помилка при отриманні даних з localStorage:', error);
      submittedForms = [];
    }
  }

  if (contactForm) {
    // Додаємо обробник події submit для форми
    contactForm.addEventListener('submit', function (event) {
      // Запобігаємо перезавантаженню сторінки
      event.preventDefault();

      // Отримуємо всі поля форми
      const formElements = contactForm.elements;

      // Перевіряємо, чи заповнені всі поля
      let isValid = true;
      let emptyFields = [];

      // Проходимо по всіх полях форми
      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];

        // Перевіряємо тільки input та textarea елементи
        if ((element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') && element.required) {
          if (!element.value.trim()) {
            isValid = false;
            emptyFields.push(element.name || 'Поле #' + (i + 1));
          }
        }
      }

      // Якщо є незаповнені поля, виводимо повідомлення
      if (!isValid) {
        alert('Будь ласка, заповніть наступні поля: ' + emptyFields.join(', '));
        return;
      }

      // Створюємо об'єкт з даними форми
      const formData = {};

      // Збираємо дані з форми
      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];

        // Додаємо тільки поля форми (не кнопки)
        if (element.name && (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA')) {
          formData[element.name] = element.value;
        }
      }

      // Додаємо дату відправлення
      formData.submittedAt = new Date().toISOString();

      // Додаємо дані в масив
      submittedForms.push(formData);

      // Зберігаємо в localStorage
      try {
        localStorage.setItem('submittedForms', JSON.stringify(submittedForms));
      } catch (error) {
        console.error('Помилка при збереженні даних в localStorage:', error);
      }

      // Виводимо дані в консоль
      console.log('Форма відправлена!', formData);
      console.log('Всі відправлені форми:', submittedForms);

      // Показуємо повідомлення про успішне відправлення
      alert('Дякуємо! Ваше повідомлення успішно відправлено.');

      // Очищаємо форму
      contactForm.reset();
    });
  }
});
