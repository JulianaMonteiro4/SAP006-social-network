import { newRegister } from '../../services/index.js';
import { getRoutes } from '../../routes.js';

export const registerUser = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const registerPage = document.createElement('div');
  registerPage.setAttribute('class', 'teste');
  registerPage.innerHTML = ` 
    <span class="phrase-register"> Aqui, onde até os memes socializam e você não. </span>
    <section class="main-container">
      <h2 class="title">Cadastrar</h2>
      <form class="container-form">
        <fieldset class="inputs">
          <input class="text-field" type="email" placeholder="Insira um e-mail" id="register-email">
            <i class="far fa-envelope"></i>                
        </fieldset>
        <fieldset class="inputs">
          <input class="text-field" type="password" placeholder="Insira uma senha" id="register-password">
            <i class="fas fa-lock-open"></i>
            <i class="fas fa-lock"></i>                
        </fieldset>
        <fieldset class="inputs">
          <input class="text-field" type="password" placeholder="Repita sua senha" id="repeat-password">
            <i class="fas fa-lock-open"></i>
            <i class="fas fa-lock"></i>                
        </fieldset>
        <button class="btn" id="btn-register" type="button">Cadastrar</button>
        <button class="btn btn-blue" id="btn-back" type="button" >Retornar</button>
      </form>
    </section>              
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
    getRoutes('/');
  });

  return main.appendChild(registerPage);
};
