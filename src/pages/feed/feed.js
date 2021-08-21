import {
  signOut,
  createPost,
  postsCollection,
  deletePost,
  editPost,
  likesPost,
  currentUser,
} from '../../services/index.js';
import { confirmAction } from '../../services/confirm.js';
import { navigateTo } from '../../navegation.js';
// import { error } from '../../services/error.js';

export const feed = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const feedPage = document.createElement('section');
  feedPage.setAttribute('class', 'container background-feed');
  feedPage.innerHTML = ` 
    <div class="container-feed">
      <nav class="nav-bar">
        <img class="logoPageFeed" src="./img/logo-nome.png" alt="logo">
        <h2 class="photo"></h2>
        <button class="btn btn-logout" type="button" id="btn-logout"><i class="fas fa-sign-out-alt"></i></button>
      </nav>
      <section>
          <form class="form-post" id="container-post"> 
            <!-- <img src="img/icone-img.png" class="img-photo" id="btn-photo" type="button"> -->
            <textarea id="post-text" type="textarea" class="new-post" placeholder="Novo Post"></textarea> 
            <button id="btnSendPost" type="submit" class="btn-publicar">Publicar</button> 
          </form>
        <ul id="postList" class="post-list" data-section></ul>
      </section>
    </div>         
  `;

  // DOM-VAR
  const containerPost = feedPage.querySelector('#container-post');
  const text = feedPage.querySelector('#post-text');
  const postList = feedPage.querySelector('#postList');
  const btnLogout = feedPage.querySelector('#btn-logout');
  const btnIcons = feedPage.querySelector('[data-section]');

  const addPosts = (post) => {
    const getLike = post.data().likes.find((el) => el === currentUser().uid);
    const textPost = post.data().text;
    const userId = post.data().user_id;
    const postId = post.id;
    const likes = post.data().likes.length;

    const postTemplate = `
      <div class="container-post-publicado">
        <textarea class="post-publicado">${textPost}</textarea>
          <div class="container-icons">

          <div class="wrapper">
            <input type="radio" name="rate" id="star-1">
            <input type="radio" name="rate" id="star-2">
            <input type="radio" name="rate" id="star-3">
            <input type="radio" name="rate" id="star-4">
            <input type="radio" name="rate" id="star-5">
            <div class="content">
              <div class="stars">
                <label for="star-1" class="star-1 fas fa-star label-star"></label>
                <label for="star-2" class="star-2 fas fa-star label-star"></label>
                <label for="star-3" class="star-3 fas fa-star label-star"></label>
                <label for="star-4" class="star-4 fas fa-star label-star"></label>
                <label for="star-5" class="star-5 fas fa-star label-star"></label>
              </div>
            </div>
          </div>

            <div class="btn-post">
              <i class="far fa-heart icons-post ${getLike ? 'liked' : ''}" data-useruid="${userId}" data-like="like" data-postid="${postId}">
              <span class="number-likes">${likes}</span></i>
              <!-- <i class="far fa-comment-dots icons-post"></i> -->
              <div class="edit-post">
                <i class="far fa-edit icons-post" data-btneditpost ="${postId}">Editar</i>
                <!-- <i class="far fa-save icons-post" data-btnsavepost>Salvar</i> -->
              </div>
              <i class="far fa-trash-alt icons-post delete-button" data-btndeletpost="${postId}"></i>
            </div>

          </div>
      </div>
    `;

    postList.innerHTML += postTemplate;
  };

  // BUSCAR NO BANCO DE DADOS OS POSTS - // get() - ler todos os posts.
  const loadPosts = () => {
    postsCollection().orderBy('data', 'desc').get().then((snap) => {
      postList.innerHTML = '';
      snap.forEach((post) => {
        addPosts(post);
      });
    });
  };
  loadPosts();

  // CRIAR POST
  containerPost.addEventListener('submit', (e) => {
    e.preventDefault();
    createPost(text)
      .then(() => {
        text.value = '';
        loadPosts();
      });
  });

  // BOTÕES DE LIKE, EXCLUIR, EDITAR E COMENTAR
  // DAR LIKE
  btnIcons.addEventListener('click', (e) => {
    const target = e.target;
    const numberLikesElement = target.querySelector('.number-likes');
    if (target.dataset.like === 'like' && !target.classList.contains('liked')) {
      e.target.classList.add('liked');
      const postId = target.dataset.postid;
      likesPost(postId)
        .then(() => {
          const countLikesUp = Number(numberLikesElement.innerHTML) + 1;
          numberLikesElement.innerHTML = countLikesUp;
        });
    } else if (target.dataset.like === 'like' && target.classList.contains('liked')) {
      e.target.classList.remove('liked');
      const postId = target.dataset.postid;
      likesPost(postId)
        .then(() => {
          const countLikesDown = Number(numberLikesElement.innerHTML) - 1;
          numberLikesElement.innerHTML = countLikesDown;
        });
    }

    // COMENTAR POST

    // EDITAR POST
    const editButton = target.dataset.btneditpost;
    if (editButton) {
      // text.value = '';
      editPost();
    }
    // DELETAR POST
    const deleteButton = target.dataset.btndeletpost;
    if (deleteButton) {
      const deleteConfirmation = confirmAction('Você realmente gostaria de deletar este post?'); // ver função p/ desabilitar-confirm.js.
      if (deleteConfirmation) {
        deletePost(deleteButton)
          .then(() => {
            loadPosts();
          });
      } else {
        return false;
      }
    }
  });

  // BOTÃO DE SAIR
  btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut().then(() => navigateTo('/'));
  });

  return main.appendChild(feedPage);
};

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
