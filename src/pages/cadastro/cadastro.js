import { newRegister } from '../../services/index.js';
import { navigateTo } from '../../routes.js';
import { error } from '../../services/error.js';

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
        <p class="error-email">Insira um e-mail válido</p>
        
        <fieldset class="input">
          <input class="text-field" type="password" placeholder="Insira uma senha" id="register-password">
          <span class="eye">
            <i id="show" class="fas fa-lock-open"></i>
            <i id="hide" class="fas fa-lock"></i>
          </span>
        </fieldset>
        <p class="error-pass">Insira no mínimo 6 caracteres</p>
        
        <fieldset class="input">
          <input class="text-field" type="password" placeholder="Confirme sua senha" id="repeat-password">
          <span class="eye">
            <i id="show-again" class="fas fa-lock-open"></i>
            <i id="hide-again" class="fas fa-lock"></i>
          </span>
        </fieldset>
        <p class="error-repeat">A senha deve ser igual ao campo anterior</p>
          
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
  const errorEmail = document.querySelector('.error-email');
  const errorPass = document.querySelector('.error-pass');
  const errorRepeat = document.querySelector('.error-repeat');

  // BOTÃO DE CADASTRAR
  btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    newRegister(email.value, password.value, repeatPassword.value).then(() => navigateTo('/'))
      .catch((erro) => {
        const errorCode = erro.code;
        switch (errorCode) {
          case 'auth/email-already-in-use':
            error('Email em uso');
            break;
          case 'auth/invalid-email':
            error('Email inválido');
            break;
          case 'auth/weak-password':
            error('Senha fraca');
            break;
          default:
            error('Por favor, verifique as informações digitadas');
        }
      });
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

  // Validação de email
  email.addEventListener('keyup', () => {
    if (email.value.indexOf('@') == -1) {
      email.setAttribute('style', 'color: red');
      errorEmail.style.display = 'block';
    } else {
      email.setAttribute('style', 'color: green');
      errorEmail.style.display = 'none';
    }
  });

  // Validação de senha
  password.addEventListener('keyup', () => {
    if (password.value.length < 6) {
      password.setAttribute('style', 'color: red');
      errorPass.style.display = 'block';
    } else {
      password.setAttribute('style', 'color: green');
      errorPass.style.display = 'none';
    }
  });

  /* Validação de repetição senha
  repeatPassword.addEventListener('keyup', () => {
    const errorRepeat = document.querySelector('.error-repeat');

    if (repeatPassword.value.length <= 6) {
      repeatPassword.setAttribute('style', 'color: red');
      errorRepeat.style.display = 'block';
    } else {
      repeatPassword.setAttribute('style', 'color: green');
      errorRepeat.style.display = 'none';
    }
  }); */

  // Validação de mensagens igual na senha
  repeatPassword.addEventListener('keyup', () => {
    if (password.value !== repeatPassword.value) {
      repeatPassword.setAttribute('style', 'color: red');
      errorRepeat.style.display = 'block';
    } else {
      repeatPassword.setAttribute('style', 'color: green');
      errorRepeat.style.display = 'none';
    }
  });

  return main.appendChild(registerPage);
};
