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

  // DOM-VAR
  const createPost = feedPage.querySelector('#container-post');
  const text = feedPage.querySelector('#post-text');
  const postList = feedPage.querySelector('#postList');
  const btnLogout = feedPage.querySelector('#btn-logout');

  // pegar usuario
  function getloggedUser() {
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

  // Criar post.
  createPost.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = firebase.auth().currentUser;
    const post = {
      text: text.value,
      user_id: user.uid, /// linkar com usuário ativo.
      likes: 0,
      comments: [],
    };

    // salvar post no Banco de dados.
    const createCollectionOfPosts = firebase.firestore().collection('posts');
    createCollectionOfPosts.add(post).then(res => {
      text.value = '';
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
    postsCollection.get().then((snap) => {          // ler todos os posts get().
      postList.innerHTML = '';
      snap.forEach((post) => {
        addPosts(post);
      });
      const section = feedPage.querySelector('[data-section]');
      section.addEventListener('click', (e) => {
        const target = e.target;
        if (target.dataset.like === 'like') {
          // console.log('cliquei no like');
          // console.log(target.dataset.like2);
        } else {
          console.log('outra coisa');
        }
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
