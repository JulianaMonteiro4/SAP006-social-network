import { signOut } from '../../services/index.js';

export const feed = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const feedPage = document.createElement('section');
  feedPage.setAttribute('class', 'container');
  feedPage.innerHTML = ` 
    <div class="l-container-grid">
      <nav class="nav-bar">
        <img src="#" alt="logo">
        <button type="button" id="btn-logout" class="btn btn-login"><i class="fas fa-sign-out-alt"></i></button>
      </nav>
      <section>
        <h2 class="title">Bem vindo(a).</h2>
        <form class="container-form">            
          <input class="text-field" type="textarea" placeholder="Novo Post" id="register-email"/>
          <button type="submit" id="btnSendPost" class="send-post">Publicar</i></button>                     
        </form>
      </section>
    </div>              
      `;

  const btnLogout = feedPage.querySelector('#btn-logout');
  btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut();
  });

  return main.appendChild(feedPage);
};

// <textarea id="message" class="msg-field"  required></textarea>