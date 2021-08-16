import { signOut, createPost, postsCollection, deletePost } from '../../services/index.js';
// import { navigateTo } from '../../routes.js';
// import { error } from '../../services/error.js';

export const feed = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const feedPage = document.createElement('section');
  feedPage.setAttribute('class', 'container');
  feedPage.innerHTML = ` 
    <div class="container-main">
      <nav class="nav-bar">
        <img class="logoPagefeed" src="./img/logo-nome.png" alt="logo">
        <h2 class="title">Feed</h2>
        <button class="btn-logout" type="button" id="btn-logout"><i class="fas fa-sign-out-alt"></i></button>
      </nav>
      <section>
          <form id="container-post"> 
            <img src="img/icone-img.png" class="img-photo" id="btn-photo" type="button">
            <input id="post-text" type="textarea" class="new-post" placeholder="Novo Post"/> 
            <button id="btnSendPost" type="submit" class="btn-publicar">Publicar</i></button> 
          </form>
        <div id="postList" class="post-list" data-section></div>
      </section>
    </div>         
  `;

  // DOM-VAR
  const containerPost = feedPage.querySelector('#container-post');
  const text = feedPage.querySelector('#post-text');
  const postList = feedPage.querySelector('#postList');
  const btnLogout = feedPage.querySelector('#btn-logout');
  const section = feedPage.querySelector('[data-section]');

  const addPosts = (post) => {
    const postTemplate = `
      <div class="container-post-publicado">
        <div class="post-publicado">❤️${post.data().text}</div> 
          <div class="container-icons">

            <span>${post.data().likes}</span>
            <div class="heart">
              <button class="btn-like" data-like="like" data-like2="${post.id}">
                <i class="far fa-star icons-post" data-like="like" data-like2="${post.id}"></i>
              </button>
            </div>

            <span>
              <i class="far fa-comment-dots icons-post"></i>
            </span>

            <span>
              <i class="far fa-share-square icons-post"></i>
            </span>

          <i class="far fa-trash-alt" data-btnDeletePost ="${post.id}"></i>

        </div>
      </div>
    `;

    postList.innerHTML += postTemplate;
  };

  // BUSCAR NO BANCO DE DADOS OS POSTS - // get() - ler todos os posts.
  const loadPosts = () => {
    postsCollection().then((snap) => {
      postList.innerHTML = '';
      snap.forEach((post) => {
        addPosts(post);
      });
    });
  };
  loadPosts();

  // Criar post.
  containerPost.addEventListener('submit', (e) => {
    e.preventDefault();
    createPost(text)
      .then((res) => {
        // console.log(res);
        loadPosts();
      });
  });

  // DAR LIKE
  section.addEventListener('click', (e) => {
    const target = e.target;
    // const countLikes = post.data().likes;
    if (target.dataset.like === 'like' && !target.classList.contains('liked')) {
      e.target.classList.add('liked');
      // likes: post.data().likes - 1,
    } else {
      e.target.classList.remove('liked');
      // likes: post.data().likes + 1,
    }
  });

  // let conteudoNumeroDeCurtidas = Number(numeroDeCurtidas.innerHTML);

  // Delete Post:
  /* const deleteButton = target.dataset.btnDeletePost;
  const postId = post.id;
  if (deleteButton) {
    const deleteConfirmation = confirm("Você realmente gostaria de deletar este post?");
    if(deleteConfirmation) {
      deletePost(postId);
    } else {
        return false;
    };
 */

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
  } */

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

// Adicionando foto do perfil (MOBILE)
/* const uploadImage = timeline.querySelector('#uploadImage');
   uploadImage.addEventListener('click', () => {
     const ref = firebase.storage().ref();
     const file = timeline.querySelector('#photo').files[0];
     const name = `${new Date()}-${file.name}`;
     const metadata = {
       contentType: file.type,
     };
     const task = ref.child(name).put(file, metadata);
     task
       .then((snapshot) => snapshot.ref.getDownloadURL())
       .then((url) => {
         console.log(url);
         console.log('imagem upada');
         const image = timeline.querySelector('#preview');
         image.src = url;
         const userUp = firebase.auth().currentUser;
         userUp.updateProfile({
           photoURL: url,
         });
         location.reload();
       });
   });
   */
