import { loginWithRegister, loginWithGoogle, keepLogged, newRegister } from '../../services/index.js';
import { navigateTo } from '../../routes.js';
import { error } from '../../services/error.js';
// getLoggedUser, userStatus - funções Gabs.

export const loginMainScreen = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const loginPage = document.createElement('section');
  loginPage.setAttribute('class', 'container background');
  loginPage.innerHTML = `
      <header>  
        <img class="logo-img" src="img/gif-logo.gif" alt="logo">  
      </header>
      <div class="container-main">
        <input type="checkbox" id="chk" aria-hidden="true">
          <div class="signup">
            <form>
              <label for="chk" aria-hidden="true">Cadastro</label>
              <fieldset class="form-login">
                <input type="email" id="email" placeholder="Email" required="">
                <i class="far fa-envelope icons"></i>
              </fieldset>
              <fieldset class="form-login">
                <input type="password" id="password" placeholder="Password" required="">
                <span>
                  <i id="show" class="fas fa-lock-open icons"></i>
                  <i id="hide" class="fas fa-lock icons"></i>
                </span>
              </fieldset>
              <fieldset class="form-login">
                <input type="password" id="repeat-password" placeholder="Repeat Password" required="">
                <span>
                  <i id="show-again" class="fas fa-lock-open icons"></i>
                  <i id="hide-again" class="fas fa-lock icons"></i>
                </span>
              </fieldset>
              <button class="btn btn-back" id="btn-register"><i class="fas fa-ticket-alt"> Cadastrar</i></button>
            </form>
          </div>

          <div class="login">
            <label for="chk" aria-hidden="true">Login</label>
            <form>
              <fieldset class="form-login">
                <input type="email" id="email-login" placeholder="Email" required="">
                <i class="far fa-envelope icons"></i>
              </fieldset>

              <fieldset class="form-login">
                <input type="Password" id="password-login" placeholder="Password" required="">
                <span>
                  <i id="show-login" class="fas fa-lock-open icons"></i>
                  <i id="hide-login" class="fas fa-lock icons"></i>
                </span>
              </fieldset>
              <div class="checkbox-container">
              <input class="checkbox" id="checkbox" type="checkbox" name="remember">
              <label class="checkbox-phrase" for="remember">Manter conectado(a)</label>
              <span class="checkbox-phrase"><a class="pass-animation" id="recover" href="#">Esqueceu a senha?</a></span>
            </div>
              <button class="btn" id="btn-login"><i class="far fa-play-circle"></i></button>

                <div>
                    <img src="img/icone-google.png" class="btn-google" id="google" type="button">
                </div>
                <p class="phrase">Entrar com o Google</p>
            </form>
          </div> 
  `;

  const email = loginPage.querySelector('#email');
  const emailLogin = loginPage.querySelector('#email-login');
  const password = loginPage.querySelector('#password');
  const passwordLogin = loginPage.querySelector('#password-login');
  const btnLogin = loginPage.querySelector('#btn-login');
  const btnLoginWithGoogle = loginPage.querySelector('#google');
  const btnRegister = loginPage.querySelector('#btn-register');
  const keepMeSignedIn = loginPage.querySelector('#checkbox');
  const showRegister = loginPage.querySelector('#show');
  const hideRegister = loginPage.querySelector('#hide');
  const showLogin = loginPage.querySelector('#show-login');
  const hideLogin = loginPage.querySelector('#hide-login');
  const showAgain = loginPage.querySelector('#show-again');
  const hideAgain = loginPage.querySelector('#hide-again');
  const repeatPassword = loginPage.querySelector('#repeat-password');
  const btnRecoverPass = loginPage.querySelector('#recover');

  // BOTÃO DE LOGIN
  btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    loginWithRegister(emailLogin.value, passwordLogin.value).then(() => navigateTo('/feed'))
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
  showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    password.setAttribute('type', 'text');
    showRegister.style.display = 'none';
    hideRegister.style.display = 'block';
  });

  hideRegister.addEventListener('click', (e) => {
    e.preventDefault();
    password.setAttribute('type', 'password');
    hideRegister.style.display = 'none';
    showRegister.style.display = 'block';
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

  // MOSTRAR E OCULTAR DE REPETIR A SENHA
  showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    passwordLogin.setAttribute('type', 'text');
    showLogin.style.display = 'none';
    hideLogin.style.display = 'block';
  });

  hideLogin.addEventListener('click', (e) => {
    e.preventDefault();
    passwordLogin.setAttribute('type', 'password');
    hideLogin.style.display = 'none';
    showLogin.style.display = 'block';
  });

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

  return main.appendChild(loginPage);
};

/* senhas iguais no cadastro
if(password.value === repeatPassword.value){
        () => navigateTo('/')
      } */

/* // VERFIFICAÇÃO DE SENHA (TAMANHO E CONFIRMAÇÃO)
const verifyPasswordLength = () => {
  if (password.value.length < 6) {
    passwordLength.style.color = 'red';
    passwordLength.innerHTML = 'Senha com mínimo de 6 dígitos.';
  } else {
    passwordLength.style.color = 'darkgreen';
    passwordLength.innerHTML = 'Senha válida!';
  }
};

const verifyConfirmPassword = () => {
  if (password.value !== passwordConfirm.value) {
    passwordError.style.color = 'red';
    passwordError.innerHTML = 'Senhas não correspondentes.';
    return false;
  } else {
    passwordError.style.color = 'darkgreen';
    passwordError.innerHTML = 'Senhas confirmadas!';
    return true;
  }
};

passwordConfirm.addEventListener('input', verifyConfirmPassword);
  password.addEventListener('input', verifyPasswordLength);
*/
