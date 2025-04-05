document.addEventListener('DOMContentLoaded', function () {
  // Знаходимо всі параграфи в секції "Про нас"
  const aboutTextContainer = document.querySelector('.about-text');

  if (aboutTextContainer) {
    // Обгортаємо текст у контейнер для обмеження висоти
    const textContainer = document.createElement('div');
    textContainer.className = 'expandable-text';

    // Переміщуємо всі елементи з about-text в expandable-text
    while (aboutTextContainer.firstChild) {
      textContainer.appendChild(aboutTextContainer.firstChild);
    }

    // Додаємо обгортку назад у контейнер
    aboutTextContainer.appendChild(textContainer);

    // Додаємо кнопку "Читати більше"
    const expandButton = document.createElement('button');
    expandButton.className = 'expand-button';
    expandButton.textContent = 'Читати більше';
    aboutTextContainer.appendChild(expandButton);

    // Обробник кліку по кнопці
    expandButton.addEventListener('click', function () {
      // Перевіряємо поточний стан контейнера
      const isExpanded = textContainer.classList.contains('expanded');

      if (isExpanded) {
        // Якщо розгорнуто, згортаємо
        textContainer.classList.remove('expanded');
        expandButton.textContent = 'Читати більше';

        // Прокручуємо до початку контейнера
        aboutTextContainer.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Якщо згорнуто, розгортаємо
        textContainer.classList.add('expanded');
        expandButton.textContent = 'Згорнути';
      }
    });
  }
});
