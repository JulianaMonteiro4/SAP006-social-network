import { newRegister } from '../../services/index.js';
import { navigateTo } from '../../routes.js';

export const registerUser = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const registerPage = document.createElement('section');
  registerPage.setAttribute('class', 'container');
  registerPage.innerHTML = ` 
    <div class="l-container-grid">
      <header class="header-grid">  
        <img class="logo-img" src="img/logo-nome.png" alt="logo">  
      </header>
      <span class="phrase-register"> Aqui, onde até os memes socializam e você não!! Então não fique de fora, cadastre-se. </span>
      <section class="main-container">
        <h2 class="title">Cadastrar</h2>
        <form class="container-form">
          
        <fieldset class="input">
            <i class="far fa-envelope"></i>                
            <input class="text-field" type="email" placeholder="Insira um e-mail" id="register-email">
          </fieldset>
          
          <fieldset class="input">
            <i class="fas fa-lock"></i>                
            <input class="text-field" type="password" placeholder="Insira uma senha" id="register-password">
          </fieldset>
          
          <fieldset class="input">
            <i class="fas fa-lock"></i>                
            <input class="text-field" type="password" placeholder="Confirme sua senha" id="repeat-password">
          </fieldset>
          
          <button class="btn" id="btn-register" type="button">Cadastrar</button>
          <button class="btn btn-blue" id="btn-back" type="button" >Retornar</button>
        </form>
      </section>
    </div>              
  `;

  const btnRegister = registerPage.querySelector('#btn-register');
  const email = registerPage.querySelector('#register-email');
  const password = registerPage.querySelector('#register-password');
  const repeatPassword = registerPage.querySelector('#repeat-password');
  const btnBack = registerPage.querySelector('#btn-back');

  btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    newRegister(email.value, password.value, repeatPassword.value);
  });

  btnBack.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/');
  });

  return main.appendChild(registerPage);
};
