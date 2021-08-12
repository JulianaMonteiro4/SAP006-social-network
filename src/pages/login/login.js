// MANIPULAÇÃO DO DOM DO LOGIN

import { loginWithRegister, loginWithGoogle, keepLogged } from '../../services/index.js';
import { navigateTo } from '../../routes.js';
import { error } from '../../services/error.js';
// getLoggedUser, userStatus - funções Gabs.

export const loginMainScreen = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const loginPage = document.createElement('section');
  loginPage.setAttribute('class', 'container background-claquete');
  loginPage.innerHTML = `
    <div class="l-container-grid">
      <header class="header-grid">  
        <img class="logo-img" src="img/logo.png" alt="logo">  
      </header>
      <section class="main-container">
        <div class="btn-cadastrar">
          <img src="img/icone-register.png" class="img-register" id="cadastro" type="button">
        </div>
        <h2 class="title">Login</h2>
        <form class="container-form">
          
        <fieldset class="input">
          <input class="text-field" id="email" type="e-mail" placeholder="Insira seu e-mail"/>
          <i class="far fa-envelope"></i>
        </fieldset>
        
        <fieldset class="input">
          <input class="text-field" id="password" type="password" placeholder="Insira sua senha"/>
          <span class="eye">
            <i id="show" class="fas fa-lock-open"></i>
            <i id="hide" class="fas fa-lock"></i>
          </span>
        </fieldset>
          
          <button class="btn btn-animation" type="button" id="btn-login"><i class="far fa-play-circle"></i></button>
          <div class="checkbox-container">
            <input id="checkbox" type="checkbox" name="remember"><label class="checkbox-phrase" for="remember">Manter conectado(a)</label>
            <span class="checkbox-phrase"><a id="recover" href="#">Esqueceu a senha?</a></span>
          </div>
          <div>
              <img src="img/icone-google.png" class="btn-google" id="google" type="button">
          </div>
          <p class="phrase">Entrar com o Google</p>
        </form>
      </section> 
    </div>
  `;

  const email = loginPage.querySelector('#email');
  const password = loginPage.querySelector('#password');
  const btnLogin = loginPage.querySelector('#btn-login');
  const btnLoginWithGoogle = loginPage.querySelector('#google');
  const imgBtnRegister = loginPage.querySelector('#cadastro');
  const btnRecoverPass = loginPage.querySelector('#recover');
  const keepMeSignedIn = loginPage.querySelector('#checkbox');
  const show = loginPage.querySelector('#show');
  const hide = loginPage.querySelector('#hide');

  // BOTÃO DE LOGIN
  btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    loginWithRegister(email.value, password.value).then(() => navigateTo('/feed'))
      .catch((erro) => {
        const errorCode = erro.code;
        switch (errorCode) {
          case 'auth/wrong-password':
            error('Senha inválida');
            break;
          case 'auth/invalid-email':
            error('Email inválido');
            break;
          case 'auth/user-not-found':
            error('usuário não encontrado');
            break;
          default:
            error('Por favor insira uma conta existente ou cadastre-se');
        }
      });
  });

  // BOTÃO DE LOGIN COM O GOOGLE
  btnLoginWithGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    loginWithGoogle();
  });

  // BOTÃO PARA CADASTRAR
  imgBtnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/cadastro');
  });

  // LINK ESQUECEU A SENHA
  btnRecoverPass.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/recuperar');
  });

  // CHECKBOX DE MANTER CONECTADO
  keepMeSignedIn.addEventListener('change', () => {
    const local = firebase.auth.Auth.Persistence.LOCAL;
    const none = firebase.auth.Auth.Persistence.NONE;
    if (keepMeSignedIn.checked === true && loginWithGoogle) {
      keepLogged(local);
    } else if (keepMeSignedIn.checked === true && loginWithRegister) {
      keepLogged(local);
    }
    keepLogged(none);
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

  return main.appendChild(loginPage);
};
