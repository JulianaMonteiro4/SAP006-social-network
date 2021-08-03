import { btnSignOut } from '../../services/index.js';

export const feed = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const feedPage = document.createElement('div');
  feedPage.setAttribute('class', 'teste');
  feedPage.innerHTML = ` 
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

  const btnLogout = feedPage.querySelector('#btn-logout');
  btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
    btnSignOut();
  });

  return main.appendChild(feedPage);
};
