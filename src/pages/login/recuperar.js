import { navigateTo } from '../../navegation.js';
import { error } from '../../services/error.js';
import { recoverPassword } from '../../services/index.js';

export const recoverLink = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const recoverPage = document.createElement('section');
  recoverPage.setAttribute('class', 'container background');
  recoverPage.innerHTML = `              
    <div class="container-principal">
      <header>  
        <img class="logo-img" src="img/gif-logo.gif" alt="logo">  
      </header>
      <main class="container-main">
        <form>
          <label class="label" for="chk" aria-hidden="true">Recuperação</label>
          <fieldset class="form-login">
            <input class="input" type="email" id="recover-email" name="email" placeholder="Email" required="">
            <div class="icons-input">
              <i class="far fa-envelope icons"></i>
            </div>
          </fieldset>
          <img class="meme-senha" src="img/meme-senha.jpg" alt="meme" title="meme">               
          <button class="btn" id="btn-recover" type="button">Recuperar</button>
          <button class="btn btn-back" id="btn-back-recover" type="button">Retornar</button>
        </form>
      </main>
    </div>              
  `;

  const btnLinkRecover = recoverPage.querySelector('#btn-recover');
  const inputEmail = recoverPage.querySelector('#recover-email');
  const btnBackRecover = recoverPage.querySelector('#btn-back-recover');

  // BOTÃO DE ENVIAR RECUPERAÇÃO DE SENHA
  btnLinkRecover.addEventListener('click', (e) => {
    e.preventDefault();
    const email = inputEmail.value;
    recoverPassword(email).then(() => {
      error('E-mail para redefinição de senha enviado');
      navigateTo('/');
    })
      .catch((erro) => {
        const errorCode = erro.code;
        switch (errorCode) {
          case 'auth/invalid-email':
            error('Email inválido');
            break;
          case 'auth/user-not-found':
            error('Usuário não encontrado');
            break;
          default:
            error('Não será possível recuperar sua senha.');
        }
      });
  });

  // BOTÃO DE RETORNAR PARA LOGIN
  btnBackRecover.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/');
  });

  // Validação email LOGIN
  inputEmail.addEventListener('keyup', () => {
    if (inputEmail.value.indexOf('@') === -1) {
      inputEmail.setAttribute('style', 'color: red');
    } else {
      inputEmail.setAttribute('style', 'color: green');
    }
  });

  return main.appendChild(recoverPage);
};
