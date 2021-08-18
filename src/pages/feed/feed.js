import {
  signOut,
  createPost,
  postsCollection,
  deletePost,
  editPost,
} from '../../services/index.js';
import { confirmAction } from '../../services/confirm.js';
import { navigateTo } from '../../navegation.js';
// import { error } from '../../services/error.js';

// likesPost,

export const feed = () => {
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

  const main = document.getElementById('root');
  main.innerHTML = '';
  const feedPage = document.createElement('section');
  feedPage.setAttribute('class', 'container');
  feedPage.innerHTML = ` 
    <div class="container-feed">
      <nav class="nav-bar">
        <img class="logoPagefeed" src="./img/logo-nome.png" alt="logo">
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
    const postTemplate = `
      <div class="container-post-publicado">
        <textarea class="post-publicado">${post.data().text}</textarea>
          <div class="container-icons">

            <span>${post.data().likes}</span>
            <div class="btn-post">
              <i class="far fa-star icons-post btn-like icons-post" data-like="like" data-like2="${post.id}">Like</i>
              <i class="far fa-comment-dots icons-post"></i>
              <div class="edit-post">
                <i class="far fa-edit icons-post" data-btneditpost ="${post.id}">Editar</i>
                <i class="far fa-save icons-post" data-btnsavepost>Salvar</i>
              </div>
              <i class="far fa-trash-alt icons-post" data-btndeletpost ="${post.id}"></i>
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
        // console.log(res);
        text.value = '';
        loadPosts();
      });
  });

  // BOTÕES DE LIKE, EXLCUIR, EDITAR E COMENTAR
  // DAR LIKE
  btnIcons.addEventListener('click', (e) => {
    const target = e.target;
    // length
    // const postId = target.dataset.like2;
    // const userUid = target.dataset.;
    // const likesNumber = target.dataset.numberlikes;
    if (target.dataset.like === 'like' && !target.classList.contains('liked')) {
      e.target.classList.add('liked');
      // pegar ID do post, quase igual o deletpost, pegar uid do usuario
      // a variavel likes vai ser um array e dentro colocar o id do usuario,
      // o que vai mostrar na tela é a quantidade de objetos dentro do array
    } else {
      e.target.classList.remove('liked');
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
    // console.log(deleteButton);
    if (deleteButton) {
      const deleteConfirmation = confirmAction('Você realmente gostaria de deletar este post?'); // ver função p/ desabilitar-confirm.js.
      if (deleteConfirmation) {
        deletePost(deleteButton);
        loadPosts();
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

// firebase.firestore.FieldValue.arrayUnion
// remover firebase.firestore.FieldValue.arrayRemove.
