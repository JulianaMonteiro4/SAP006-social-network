import { recoverPassword } from '../../services/index.js';
import { getRoutes } from '../../routes.js';

export const recoverLink = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const recoverPage = document.createElement('div');
  recoverPage.setAttribute('class', 'teste');
  recoverPage.innerHTML = ` 
    <span>Você receberá por e-mail um link para a recuperação da senha.</span>
    <section class="main-container">
      <h2 class="title">Recuperar a Senha</h2>
      <form class="container-form">
        <fieldset class="inputs">
          <input class="text-field" type="email" placeholder="Insira um e-mail" id="recover-email">
          <i class="far fa-envelope"></i>
        </fieldset>
          <img class="meme-senha" src="img/meme-senha.jpg" alt="meme" title="meme">               
          <button class="btn" id="btn-recover" type="button">Recuperar</button>
          <button class="btn btn-blue" id="btn-back-recover" type="button">Retornar</button>
      </form>
    </section>              
  `;

  const btnLinkRecover = recoverPage.querySelector('#btn-recover');
  const inputEmail = recoverPage.querySelector('#recover-email');
  const btnBackRecover = recoverPage.querySelector('#btn-back-recover');

  btnLinkRecover.addEventListener('click', (e) => {
    e.preventDefault();
    recoverPassword(inputEmail.value);
  });

  btnBackRecover.addEventListener('click', (e) => {
    e.preventDefault();
    getRoutes('/');
  });

  return main.appendChild(recoverPage);
};
