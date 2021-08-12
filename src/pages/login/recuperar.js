import { recoverPassword } from '../../services/index.js';
import { navigateTo } from '../../routes.js';
import { error } from '../../services/error.js';

export const recoverLink = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const recoverPage = document.createElement('section');
  recoverPage.setAttribute('class', 'container');
  recoverPage.innerHTML = `              
    <div class="l-container-grid">
      <header class="header-grid">  
        <img class="logo-img" src="img/logo-nome.png" alt="logo">  
      </header>
      <span class="phrase-recover">Você receberá por e-mail um link para a recuperação da senha.</span>
      <section class="main-container">
        <h2 class="title">Recuperar a Senha</h2>
        <form class="container-form">
          <fieldset class="input">
            <input class="text-field" type="email" placeholder="Insira um e-mail" id="recover-email">
            <span class="eye">
              <i class="far fa-envelope"></i>
            </span>              
          </fieldset>
            <img class="meme-senha" src="img/meme-senha.jpg" alt="meme" title="meme">               
            <button class="btn" id="btn-recover" type="button">Recuperar</button>
            <button class="btn btn-blue" id="btn-back-recover" type="button">Retornar</button>
        </form>
      </section>  
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
