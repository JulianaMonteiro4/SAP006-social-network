import { signOut, userStatus} from '../../services/index.js';

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

  // Criar post.
  feedPage.querySelector('#container-post').addEventListener('submit', (e) => {
    e.preventDefault();
    // pegar usuario
    userStatus().then((user) => {
      const userId = user.uid;
      console.log(userId);
      // console.log("Ta logado", user.email, user.uid);
    });
    const text = feedPage.querySelector('#post-text').value;
    const post = {
      text: text,
      user_id: userId,
      likes: 0,
      comments: [],
    };
    // salvar post no Banco de dados.
    const createCollectionOfPosts = firebase.firestore().collection('posts');
    createCollectionOfPosts.add(post).then(res => {
      const text = feedPage.querySelector('#post-text').value = "";
      loadPosts();
    });
  });

  // Add post.
  const addPosts = (post) => {
    const postTemplate = `
    <div class="container-post-publicado">
      <div class="post-publicado">❤️${post.data().text}</div>
        <div class="container-icons">
          <span>${post.data().likes}</span>
          <button class="like" data-like><i id="vazio" class="far fa-star icons-post"></i></button>
          <span>
            <i class="far fa-comment-dots icons-post"></i>
          </span>
          <span>
            <i class="far fa-share-square icons-post"></i>
          </span
        </div>
    </div>
    `;

    // FUNÇÃO DE CURTIR
    const section = feedPage.querySelector('[data-section]');
    section.addEventListener('click', (e) => {
      const target = e.target;
      if (target.dataset.like === '') {
        console.log('cliquei no like');
      } else {
        console.log('outra coisa');
      }
    });

    document.querySelector('#postList').innerHTML += postTemplate;
  };

  // banco de dados dos posts - // get() - ler todos os posts.
  const loadPosts = () => {
    const postsCollection = firebase.firestore().collection('posts');
    postsCollection.get().then((snap) => {
      feedPage.querySelector('#postList').innerHTML = '';
      snap.forEach((post) => {
        addPosts(post);
      });
    });
  };

  loadPosts();

  // deletar post
  /* function deletePost(postId) {
  const postsCollection = firebase.firestore().collection('posts');
  postsCollection.doc(postId).delete().then(doc => {
    loadPosts()
  }
} */

  // BOTÃO DE SAIR
  const btnLogout = feedPage.querySelector('#btn-logout');
  btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut();
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
  }

  */
