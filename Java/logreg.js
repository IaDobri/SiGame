document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded - checking elements...');
  
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  console.log('Elements found:', {
    loginTab: loginTab ? 'YES' : 'NO',
    registerTab: registerTab ? 'YES' : 'NO', 
    loginForm: loginForm ? 'YES' : 'NO',
    registerForm: registerForm ? 'YES' : 'NO'
  });

  // Если элементы не найдены, выводим ошибку
  if (!loginTab || !registerTab || !loginForm || !registerForm) {
    console.error('ERROR: Some elements are missing!');
    console.log('Available elements with IDs:');
    document.querySelectorAll('[id]').forEach(el => {
      console.log(`- ${el.id}: ${el.tagName}`);
    });
    return;
  }

  // Функция переключения форм
  function switchToForm(formToShow) {
    console.log('Switching to form:', formToShow.id);
    
    // Скрываем все формы
    loginForm.classList.remove('active');
    registerForm.classList.remove('active');
    
    // Показываем нужную форму
    formToShow.classList.add('active');
    
    // Обновляем активные кнопки
    if (formToShow === loginForm) {
      loginTab.classList.add('active');
      registerTab.classList.remove('active');
    } else {
      loginTab.classList.remove('active');
      registerTab.classList.add('active');
    }
    
    // Подстраиваем высоту контейнера
    adjustContainerHeight();
  }

  // Функция для подстройки высоты контейнера
  function adjustContainerHeight() {
    const activeForm = document.querySelector('.form.active');
    const formContainer = document.querySelector('.form-container');
    
    if (activeForm && formContainer) {
      setTimeout(() => {
        const formHeight = activeForm.scrollHeight;
        formContainer.style.minHeight = formHeight + 'px';
        console.log('Adjusted container height to:', formHeight);
      }, 100);
    }
  }

  // Обработчики для кнопок
  loginTab.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Login tab clicked');
    switchToForm(loginForm);
  });

  registerTab.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Register tab clicked');
    switchToForm(registerForm);
  });

  // Обработчики отправки форм
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Login form submitted');
    
    // Простая валидация
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    
    if (!email || !password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    
    alert('Форма входа отправлена');
  });

  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Register form submitted');
    
    // Простая валидация
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
    
    if (!email || !password || !confirmPassword) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    
    alert('Форма регистрации отправлена');
  });

  // Инициализация высоты при загрузке
  setTimeout(() => {
    adjustContainerHeight();
  }, 200);

  console.log('All event listeners attached successfully!');
  console.log('Current active form:', document.querySelector('.form.active').id);
});