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

      loginInner.style.display = "none";
      loader.style.display = "block";

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      errorMessage.textContent = "";

      const apiUrl = `https://test-works.pr-uni.ru/api/login/index.php?login=${username}&password=${password}`;

      fetch(apiUrl)
      .then(response => response.json())
      .then(data => {

          loginInner.style.display = "block";
          loader.style.display = "none";
         
          if (data.status === "ok") {
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 7);
              
                document.cookie = `token=${data.token}; expires=${expirationDate.toUTCString()}; path=/`;

              loginForm.style.display = "none";

              const successMessage = document.createElement("div");
              successMessage.textContent = `${data.user.name}, Вы успешно авторизованы!`;
              successMessage.className = 'login__sucsess-text'

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
            errorMessage.textContent = "Произошла неизвестная ошибка.";
        } 
      })
      .catch(error => {
          loginInner.style.display = "block";
          loader.style.display = "none";

          // Обработка ошибки запроса...
          console.error('Ошибка:', error);
      });
  });
});