import { signOut } from '../../services/index.js';

export const feed = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const feedPage = document.createElement('section');
  feedPage.setAttribute('class', 'container');
  feedPage.innerHTML = ` 
      <section class="main-container">
          <h2 class="title">Feed</h2>
          <form class="container-form">
              <fieldset class="icons-cadastro icons-login">
                  <input class="text-field" type="text" placeholder="Novo Post" id="register-email"/>
              </fieldset>
              <button type="button" id="btn-logout" class="btn btn-login">Sair</button>
          </form>
      </section>              
      `;

  const btnLogout = feedPage.querySelector('#btn-logout');
  btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut();
  });

  return main.appendChild(feedPage);
};

// <textarea id="message" class="msg-field"  required></textarea>