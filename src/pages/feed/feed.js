import { signOut} from '../../services/index.js';

export const feed = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const feedPage = document.createElement('section');
  feedPage.setAttribute('class', 'container');
  feedPage.innerHTML = ` 
    <div class="l-container-grid">
      <nav class="nav-bar">
        <img class="logoPagefeed" src="./img/logo-nome.png" alt="logo">
        <button type="button" id="btn-logout" class="btn btn-login"><i class="fas fa-sign-out-alt"></i></button>
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

  feedPage.querySelector('.container-post').addEventListener('submit', (e) => {
    e.preventDefault();
    const text = feedPage.querySelector('#post-text').value;
    const post = {
      text: text,
      user_id:'paloma',
      likes:0,
      comments:[],
    }
    const createPost = firebase.firestore().collection('posts')
    createPost.add(post);
  });

  const addPosts = (post) => {
    const postTemplate = `
    <li id='${post.id}'>
      ${post.data().text} ❤️ ${post.data().likes}
    </li>
    `;
    document.getElementById('posts').innerHTML += postTemplate;
  };

  const loadPosts = () => {
    const postsCollection = firebase.firestore().collection('posts');
    postsCollection.get().then((snap) => {
      feedPage.querySelector('#postsList').innerHTML = '';
      snap.forEach((post) => {
        addPosts(post);
      });
    });
  };

  loadPosts();


  // BOTÃO DE SAIR
  const btnLogout = feedPage.querySelector('#btn-logout');
  btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut();
  });

  return main.appendChild(feedPage);
};
