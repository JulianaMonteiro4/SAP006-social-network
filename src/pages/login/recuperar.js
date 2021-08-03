import { recoverPassword } from '../../services/index.js';
import { getRoutes } from '../../routes.js';

export const recoverLink = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const recoverPage = document.createElement('div');
  recoverPage.setAttribute('class', 'teste');
  recoverPage.innerHTML = ` 
      <section class="register container-login">
          <h2 class="login">Recuperar a Senha</h2>
          <form class="container-form form-register">
              <span>Você receberá por e-mail um link para a recuperação da senha.</span>
              <fieldset class="icons-cadastro icons-login">
                <input class="text-field" type="email" placeholder="Insira um e-mail" id="recover-email">
                <i class="far fa-envelope"></i>
              </fieldset>
                <img class="meme-senha" src="img/meme-senha.jpg" alt="meme" title="meme">               
              <button type="button" id="btn-recover" class="btn btn-login">Recuperar</button>
              <button type="button" id="btn-back-recover" class="btn btn-login">Retornar</button>
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
