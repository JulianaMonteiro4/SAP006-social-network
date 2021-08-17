import { recoverPassword } from '../../services/index.js';
import { navigateTo } from '../../routes.js';
import { error } from '../../services/error.js';

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
      <div class="container-main">
        <form>
          <label for="chk" aria-hidden="true">Recuperação</label>
          <fieldset class="form-login">
            <input type="email" id="email" name="email" placeholder="Email" required="">
            <i class="far fa-envelope icons"></i>
          </fieldset>
          <img class="meme-senha" src="img/meme-senha.jpg" alt="meme" title="meme">               
          <button class="btn" id="btn-recover" type="button">Recuperar</button>
          <button class="btn btn-back" id="btn-back-recover" type="button">Retornar</button>
        </form>
      </div>
    </div>              
  `;

  const btnLinkRecover = recoverPage.querySelector('#btn-recover');
  const inputEmail = recoverPage.querySelector('#recover-email');
  const btnBackRecover = recoverPage.querySelector('#btn-back-recover');

  // BOTÃO DE ENVIAR RECUPERAÇÃO DE SENHA
  btnLinkRecover.addEventListener('click', (e) => {
    e.preventDefault();
    recoverPassword(inputEmail.value).then(() => navigateTo('/'))
      .catch(() => {
        const errorCode = error.code;
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

  return main.appendChild(recoverPage);
};
