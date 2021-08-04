// MANIPULAÇÃO DO DOM DO LOGIN

import { loginWithRegister, loginWithGoogle, keepLogged } from '../../services/index.js';
import { getRoutes } from '../../routes.js';

export const loginMainScreen = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const loginPage = document.createElement('div');
  loginPage.setAttribute('class', 'teste');
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
            <i class="fas fa-lock-open"></i>
            <i class="fas fa-lock"></i>
        </fieldset>
        <div class="checkbox-container">
          <input id="checkbox" type="checkbox" name="remember"><label class="checkbox-phrase" for="remember">Manter conectado(a)</label>
          <span class="checkbox-phrase"><a id="recover" href="#">Esqueceu a senha?</a></span>
        </div>
        <button class="btn" type="button" id="btn-login">Entrar</button>
        <button class="btn btn-blue" type="button" id="cadastro">Cadastrar</button>
        <div>
            <img src="img/icone-google.png" class="btn-google" id="google" type="button">
        </div>
        <p class="phrase">Entrar com o Google</p>
      </form>
    </section> 
  `;

  const email = loginPage.querySelector('#email');
  const password = loginPage.querySelector('#password');
  const btnLogin = loginPage.querySelector('#btn-login');
  const btnLoginWithGoogle = loginPage.querySelector('#google');
  const imgBtnRegister = loginPage.querySelector('#cadastro');
  const btnRecoverPass = loginPage.querySelector('#recover');
  const keepMeSignedIn = loginPage.querySelector('#checkbox');

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
