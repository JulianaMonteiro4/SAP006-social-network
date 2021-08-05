// MANIPULAÇÃO DO DOM DO LOGIN

import { loginWithRegister, loginWithGoogle, keepLogged } from '../../services/index.js';
import { getRoutes } from '../../routes.js';
// getLoggedUser, userStatus - funções Gabs.

export const loginMainScreen = () => {
  /* userStatus().then((user) => {
    console.log("Ta logado", user.email, user.uid);
  }); */

  const main = document.getElementById('root');
  main.innerHTML = '';
  const loginPage = document.createElement('section');
  loginPage.setAttribute('class', 'container');
  loginPage.innerHTML = `
    <section class="main-container">
      <h2 class="title">Login</h2>
      <form class="container-form">
        <fieldset class="inputs">
          <input class="text-field" id="email" type="e-mail" placeholder="Insira seu e-mail"/>
            <i class="far fa-envelope"></i>
            </fieldset>
        <fieldset class="inputs">
          <input class="text-field" id="password" type="password" placeholder="Insira sua senha"/>
            <i id="open" class="fas fa-lock-open"></i>
            <i id="block" class="fas fa-lock"></i>
        </fieldset>
        <button class="btn" type="button" id="btn-login">Entrar</button>
        <button class="btn btn-blue" type="button" id="cadastro">Cadastrar</button>
        <span class="phrase"> Esqueceu a senha? Recupere-a <a id="recover" href="#">Aqui</a></span>
        <div>
          <input type="checkbox" class="checkbox" name="remember"><label for="remember">Mantenha-me conectado(a)</label>
            <img src="img/icone-google.png" class="btn-google" id="google" type="button">
        </div>
        <p class="phrase">Login com o Google</p>
      </form>
    </section> 
  `;

  const email = loginPage.querySelector('#email');
  const password = loginPage.querySelector('#password');
  const btnLogin = loginPage.querySelector('#btn-login');
  const btnLoginWithGoogle = loginPage.querySelector('#google');
  const imgBtnRegister = loginPage.querySelector('#cadastro');
  const btnRecoverPass = loginPage.querySelector('#recover');
  const keepMeSignedIn = loginPage.querySelector('.checkbox');

  btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    loginWithRegister(email.value, password.value);
  });

  btnLoginWithGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    loginWithGoogle();
  });

  imgBtnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    getRoutes('/cadastro');
  });

  btnRecoverPass.addEventListener('click', (e) => {
    e.preventDefault();
    getRoutes('/recuperar');
  });

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

  /* const icon = document.querySelector('#block');
    icon.addEventListener('click', () => {
    const inputPassword = document.querySelector('#password');

    if (inputPassword.getAttribute('type') === 'password') {
      inputPassword.setAttribute('type', 'text');
    } else {
      inputPassword.setAttribute('type', 'password');
    }
  }); */

  return main.appendChild(loginPage);
};

// JULIANA
/* function mostrarSenha() {
  const senha = document.getElementById('password');
  if (senha.type === 'password') {
    senha.type = 'text';
} else {
    senha.type = 'password';
  }
  senha.addEventListener('click', mostrarSenha());
} */
