import { signOut, userStatus, criarPost } from '../../services/index.js';
import { navigateTo } from '../../routes.js';
import { error } from '../../services/error.js';

export const feed = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const feedPage = document.createElement('section');
  feedPage.setAttribute('class', 'container');
  feedPage.innerHTML = ` 
    <div class="l-container-grid">
      <nav class="nav-bar">
        <img class="logoPagefeed" src="./img/logo-nome.png" alt="logo">
        <h2 class="title">Feed</h2>
        <button type="button" id="btn-logout" class="btn btn-login"><i class="fas fa-sign-out-alt"></i></button>
      </nav>
      <section>
          <form id="container-post"> 
            <img src="img/icone-img.png" class="img-photo" id="btn-photo" type="button">
            <input id="post-text" type="textarea" class="new-post" placeholder="Novo Post"/> 
            <button id="btnSendPost" type="submit" class="btn-blue btn-publicar">Publicar</i></button> 
          </form>
        <div id="postList" class="post-list" data-section></div>
      </section>
    </div>            
  `;

  // DOM-VAR
  const createPost = feedPage.querySelector('#container-post');
  const text = feedPage.querySelector('#post-text');
  const postList = feedPage.querySelector('#postList');
  const btnLogout = feedPage.querySelector('#btn-logout');
  const section = feedPage.querySelector('[data-section]');

  // pegar usuario
  /* function getloggedUser() {
    userStatus().then((user) => {
      const userId = user.uid;
      const userEmail = user.email;
      const userIniciais = userEmail.substring(0.2); //pegar 2 iniciais do e-mail
      console.log(userId);
      console.log(userIniciais);
      // console.log("Ta logado", user.email, user.uid);
      // return
    });
  }
  getloggedUser();
  */

  // Add post.
  const addPosts = (post) => {
    const postTemplate = `
      <div class="container-post-publicado">
      <div class="post-publicado">❤️${post.data().text}</div>
        <div class="container-icons">
            <button class="like" data-like="like" data-like2="${post.id}"><span data-like2="${post.id}" data-like="like">${post.data().likes}</span><i id="vazio" class="far fa-star icons-post" data-like2="${post.id}" data-like="like"></i></button>
          <span>
            <i class="far fa-comment-dots icons-post"></i>
          </span>
          <span>
            <i class="far fa-share-square icons-post"></i>
          </span
        </div>
      </div>
    `;
    postList.innerHTML += postTemplate;
  };

  // banco de dados dos posts - // get() - ler todos os posts.
  const loadPosts = () => {
    const postsCollection = firebase.firestore().collection('posts');
    postsCollection.orderBy('data', 'desc').get().then((snap) => {
      postList.innerHTML = '';
      snap.forEach((post) => {
        addPosts(post);
      });
      // DAR LIKE
      section.addEventListener('click', (e) => {
        const target = e.target;
        if (target.dataset.like === 'like') {
          console.log('cliquei no like');
          // console.log(target.dataset.like2);
        } else {
          console.log('outra coisa');
        }
      });
    });
  }; // target.classList.add

  loadPosts();

  // Criar post.
  createPost.addEventListener('submit', (e) => {
    e.preventDefault();
    criarPost(text)
      .then((res) => {
        // console.log(res);
        loadPosts();
      });
  });


  // deletar post
  /* function deletePost(postId) {
  const postsCollection = firebase.firestore().collection('posts');
  postsCollection.doc(postId).delete().then(doc => {
    loadPosts()
  }
 */

  // BOTÃO DE SAIR
  btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut().then(() => navigateTo('/'))
      .catch(() => {
        error('Não saiu');
      });
  });

  return main.appendChild(feedPage);
};

/* const getUserFromDatabase = (userLogged) => {
    const usersCollection = firebase.firestore().collection('users');
    usersCollection.get().then((snap) => {
      snap.forEach((user) => {
        if (userLogged === user.data().id) {
          createPost(user.data().id, user.data().name, user.data().email);
        }
      });
    });
  };

  const userLogged = firebase.auth().currentUser;
  if (userLogged !== 'null') {
    getUserFromDatabase(userLogged.uid);
  } */