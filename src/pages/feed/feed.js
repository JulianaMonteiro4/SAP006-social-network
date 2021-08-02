// import { loginWithRegister} from './dataFeed';

import { btnSignOut } from '../../services/index.js';

export const feed = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const loginFeed = document.createElement('div');
  loginFeed.setAttribute('class', 'teste');
  loginFeed.innerHTML = ` 
      <section class="register container-login">
          <h2 class="login">Feed</h2>
          <form class="container-form form-register">
              <fieldset class="icons-cadastro icons-login">
                  <input class="text-field" type="email" placeholder="" id="register-email"/>
              </fieldset>
              <button type="button" id="btn-logout" class="btn btn-login">Sair</button>
          </form>
      </section>              
      `;

  const btnLogout = loginFeed.querySelector('#btn-logout');
  btnLogout.addEventListener('click', btnSignOut());

  /* const btnLogout = loginFeed.querySelector('#btn-logout');
  btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
    btnSignOut();
  }); */

  /* window.history.pushState({}, '', '/feed');
  const popStateEvent = new PopStateEvent('popstate', { state: {} }); dispatchEvent(popStateEvent);
  */

  return main.appendChild(loginFeed);
};
