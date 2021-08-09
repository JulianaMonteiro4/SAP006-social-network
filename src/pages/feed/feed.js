import { signOut } from '../../services/index.js';

export const feed = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const feedPage = document.createElement('section');
  feedPage.setAttribute('class', 'container');
  feedPage.innerHTML = `
  <button type="button" id="btn-logout" class="btn btn-login"><i class="fas fa-sign-out-alt"></i></button>
      <div class="l-container-grid">
      <nav class="nav-bar">
        <!-- <img class="logoPagefeed" src="./img/logo-nome.png" alt="logo"> -->
      </nav>
      <section>
        <h2 class="title">Bem vindo(a).</h2>
        <form class="container-post"> 
          <input id="post-text" type="textarea" class="text-field" placeholder="Novo Post"/>
          <button id="btnSendPost" type="submit" class="send-post">Publicar</i></button> 
        </form>
        <ul id="postList" class="post-list"></ul>
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
