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
          <input class="text-field" type="email" placeholder="Insira um e-mail" id="register-email">
          <span class="eye">
            <i class="far fa-envelope"></i> 
          </span>              
        </fieldset>
        
        <fieldset class="input">
          <input class="text-field" type="password" placeholder="Insira uma senha" id="register-password">
          <span class="eye">
            <i id="show" class="fas fa-lock-open"></i>
            <i id="hide" class="fas fa-lock"></i>
          </span>
        </fieldset>
        
        <fieldset class="input">
          <input class="text-field" type="password" placeholder="Confirme sua senha" id="repeat-password">
          <span class="eye">
            <i id="show-again" class="fas fa-lock-open"></i>
            <i id="hide-again" class="fas fa-lock"></i>
          </span>
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
  const show = registerPage.querySelector('#show');
  const hide = registerPage.querySelector('#hide');
  const showAgain = registerPage.querySelector('#show-again');
  const hideAgain = registerPage.querySelector('#hide-again');

  // BOTÃO DE CADASTRAR
  btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    newRegister(email.value, password.value, repeatPassword.value);
  });

  // BOTÃO DE VOLTAR PARA LOGIN
  btnBack.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/');
  });

  // MOSTRAR E OCULTAR A SENHA
  show.addEventListener('click', (e) => {
    e.preventDefault();
    password.setAttribute('type', 'text');
    show.style.display = 'none';
    hide.style.display = 'block';
  });

  hide.addEventListener('click', (e) => {
    e.preventDefault();
    password.setAttribute('type', 'password');
    hide.style.display = 'none';
    show.style.display = 'block';
  });

  // MOSTRAR E OCULTAR DE REPETIR A SENHA
  showAgain.addEventListener('click', (e) => {
    e.preventDefault();
    repeatPassword.setAttribute('type', 'text');
    showAgain.style.display = 'none';
    hideAgain.style.display = 'block';
  });

  hideAgain.addEventListener('click', (e) => {
    e.preventDefault();
    repeatPassword.setAttribute('type', 'password');
    hideAgain.style.display = 'none';
    showAgain.style.display = 'block';
  });

  return main.appendChild(registerPage);
};
