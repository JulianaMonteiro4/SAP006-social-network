import { recoverPassword } from '../../services/index.js';

export const recoverLink = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const recoverPass = document.createElement('div');
  recoverPass.setAttribute('class', 'teste');
  recoverPass.innerHTML = ` 
      <section class="register container-login">
          <h2 class="login">Recuperar a Senha</h2>
          <form class="container-form form-register">
              <span>Você receberá por e-mail um link para a recuperação da senha.</span>
              <fieldset class="icons-cadastro icons-login">
                <input class="text-field" type="email" placeholder="Insira um e-mail" id="recover-email">
                <i class="far fa-envelope"></i>
              </fieldset>
                <img class="meme" src="img/meme-senha.jpg" alt="meme" title="meme">               
              <button type="button" id="btn-recover" class="btn btn-login">Recuperar</button>
              <button type="button" id="btn-back-recover" class="btn btn-login">Retornar</button>
          </form>
      </section>              
    
    `;
  const btnRecoverPass = recoverPass.querySelector('#btn-recover');

  btnRecoverPass.addEventListener('click', (e) => {
    e.preventDefault();
    const email = recoverPass.querySelector('#recover-email').value;
    recoverPassword(email);
    // console.log(email);
  });

  const btnBackRecover = recoverPass.querySelector('#btn-back-recover');
  btnBackRecover.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    const popStateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popStateEvent);
  });

  return main.appendChild(recoverPass);
};
