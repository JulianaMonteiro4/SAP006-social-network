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
        <form class="container-post"> 
          <div class="img-post">
            <img src="img/icone-img.png" class="img-photo" id="btn-img" type="button">
          </div>
          <input id="post-text" type="textarea" class="posts" placeholder="Novo Post"/>
            <button id="btnSendPost" type="submit" class="btn btn-blue">Publicar</i></button> 
        </form>
        <ul id="postList" class="post-list"></ul>
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
    <li id='${post.id}'>
      ${post.data().text} ❤️ ${post.data().likes}
    </li>
    `;
    document.querySelector('#postList').innerHTML += postTemplate;
  };

  // banco de dados dos posts
  const loadPosts = () => {
    const postsCollection = firebase.firestore().collection('posts');
    postsCollection.get().then((snap) => {          // ler todos os posts get().
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
