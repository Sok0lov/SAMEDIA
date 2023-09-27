import './scss/main.scss';




document.addEventListener("DOMContentLoaded", function () {
  const login = document.querySelector(".login");

  if(!login) return;

  const loginInner = document.getElementById("login-inner");
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");
  const loader = document.getElementById("login-loader");

  loginInner.addEventListener("submit", function (e) {
      e.preventDefault();

      // Дизейбл формы и отобразите прелоадер
      loginInner.style.display = "none";
      loader.style.display = "block";

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Скройте предыдущие сообщения об ошибках
      errorMessage.textContent = "";

      // Создайте URL для GET-запроса
      const apiUrl = `https://test-works.pr-uni.ru/api/login/index.php?login=${username}&password=${password}`;

      // Добавьте логику для обработки ошибок
      fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          // Восстановите состояние формы и скройте прелоадер
          loginInner.style.display = "block";
          loader.style.display = "none";
         
          if (data.status === "ok") {
            console.log(5)
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 7); // Установите срок действия на 7 дней
              // Сохраните токен в куки (не забудьте обеспечить безопасное хранение)
              
                document.cookie = `token=${data.token}; expires=${expirationDate.toUTCString()}; path=/`;

              // Скройте форму
              loginForm.style.display = "none";

              // Выведите сообщение об успешной авторизации
              const successMessage = document.createElement("div");
              successMessage.textContent = `${data.user.name}, Вы успешно авторизованы!`;
              successMessage.className = 'login__sucsess-text'

                  // Создайте элемент ссылки
              const homeBtn = document.createElement("button");
              homeBtn.textContent = "Перейти на главную страницу";
              homeBtn.className = 'login__button-home login__button'
              homeBtn.type = "button";

              homeBtn.addEventListener('click', function() {
                window.location.href = '/';
              });


              const loginContainer = document.querySelector(".login__sucsess");
              loginContainer.appendChild(successMessage);
              loginContainer.appendChild(homeBtn);

          } else if (data.status === "error") {

            const errorMessageText = document.createElement("p");
            errorMessageText.textContent = data.errorMessage;
            errorMessageText.className = 'login__error-text'
            errorMessage.appendChild(errorMessageText);

            const loginInput = document.querySelectorAll('.login__input');
            loginInput.forEach(input => {
              input.style.border = '1px solid #F65454';
              input.style.color = '#F65454';
            });
        } else {
          console.log(3)
            // Обработка других статусов
            errorMessage.textContent = "Произошла неизвестная ошибка.";
        } 
      })
      .catch(error => {
          // Восстановите состояние формы и скройте прелоадер
          loginInner.style.display = "block";
          loader.style.display = "none";
          console.log(4)

          // Обработка ошибки запроса...
          console.error('Ошибка:', error);
      });
  });
});