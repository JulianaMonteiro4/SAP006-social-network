import {
  signOut,
  createPost,
  postsCollection,
  deletePost,
  editPost,
  likesPost,
  currentUser,
  uploadPicture,
  downloadPicturePost,
} from '../../services/index.js';
import { confirmAction } from '../../services/confirm.js';
import { navigateTo } from '../../navegation.js';
import { error } from '../../services/error.js';

export const feed = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const feedPage = document.createElement('section');
  feedPage.setAttribute('class', 'container background-feed');
  feedPage.innerHTML = ` 
    <main class="container-feed">
      <nav class="nav-bar">
        <img class="logoPageFeed" src="./img/logo-nome.png" alt="logo">
        <!-- <button class="btn btn-logout" type="button" id="btn-logout"><i class="fas fa-sign-out-alt"></i></button> -->

        <section class="menu" id="openMenu">
          <div id="bar1" class="bar"></div>
          <div id="bar2" class="bar"></div>
          <div id="bar3" class="bar"></div>
        </section>

        <ul class="nav" id="mainMenu">
          <li id="menu-profile"><a href="#">👥 PROFILE</a></li>
          <li id="btn-logout"><a href="#">🚪 SAIR</a></li>
          <div id="closeMenu"><i class="fa fa-times"></i></div>
        </ul>
      </nav>

      <article>
          <form class="form-post" id="container-post"> 
            <section class="post">
              <textarea id="post-text" type="textarea" class="new-post" placeholder="Novo Post"></textarea> 
              <input class="input-photo-post" id="input-photo" type="file" name"arquivo">
              <button id="btnSendPost" type="submit" class="btn-publicar">Publicar</button>
            </section>
          </form>
        <ul id="postList" class="post-list" data-section></ul>
      </article>
    </main>         
  `;

  // DOM-VAR
  const containerPost = feedPage.querySelector('#container-post');
  const text = feedPage.querySelector('#post-text');
  const postList = feedPage.querySelector('#postList');
  const btnLogout = feedPage.querySelector('#btn-logout');
  const btnIcons = feedPage.querySelector('[data-section]');
  const btnMenuProfile = feedPage.querySelector('#menu-profile');

  const addPosts = (post) => {
    const getLike = post.data().likes.find((el) => el === currentUser().uid);
    const textPost = post.data().text;
    const userId = post.data().user_id;
    const dataPost = post.data().data;
    const postId = post.id;
    const likes = post.data().likes.length;
    const userPhoto = post.data().user_photo;
    const userNamePost = post.data().nameUser;
    const userImgPost = post.data().user_img;
    const loggedUser = currentUser().uid === userId;

    const postTemplate = `
      <img class="photo-post" src="${userPhoto || 'img/perfil.jpg'}"  alt="photo-user" title="photo-user">
      <li class="container-post-publicado">
        <section class="info-user">
          <p class="user-name">${userNamePost}</p>
          <p class="data-post" id="date-post">${dataPost}</p>
          ${loggedUser ? `<img src="img/lixeira.png" class="icons-post delete-button" data-btndeletpost="${postId}">` : ''}
        </section>
        <textarea class="post-publicado">${textPost}</textarea>
        <img class="img-post" src="${userImgPost || ''}">
        <section class="container-icons">
          <div class="btn-post">
            <i class="fas fa-star icons-post ${getLike ? 'liked' : ''} btn-like" data-useruid="${userId}" data-like="like" data-postid="${postId}">
            <span class="number-likes">${likes}</span></i>
            ${loggedUser ? `<img src="img/editar.png" class="icons-post btn-edit" data-btneditpost="${postId}">` : ''}
            ${loggedUser ? `<img src="img/salvar.png" class="icons-post hidden-content btn-save" data-btnsavepost="${postId}">` : ''}
          </div>
        </section>
      </li>
    `;

    postList.innerHTML += postTemplate;

    // ADICIONAR IMAGEM
    const inputPhotoPost = feedPage.querySelector('#input-photo');
    // console.log(inputPhotoPost);

    inputPhotoPost.addEventListener('change', (e) => {
      const file = e.target.files[0];
      const namePicturePost = file.name;
      // console.log(namePicturePost);

      uploadPicture(namePicturePost, file);
      // downloadPicturePost(namePicturePost, postId);
    });
  };

  // MENU HAMBURGUER
  const mainMenu = feedPage.querySelector('#mainMenu');
  const closeMenu = feedPage.querySelector('#closeMenu');
  const openMenu = feedPage.querySelector('#openMenu');

  function show() {
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
    openMenu.classList.toggle('change');
  }

  function close() {
    mainMenu.style.top = '-100%';
  }

  openMenu.addEventListener('click', show);
  closeMenu.addEventListener('click', close);

  // ROTA MENU HAMBURGUER PROFILE
  btnMenuProfile.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/profile');
  });

  // BUSCAR NO BANCO DE DADOS OS POSTS
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
    const inputPhotoPost = feedPage.querySelector('#input-photo');

    const inputPost = inputPhotoPost.files[0];
    uploadPicture(inputPost.name, inputPost).then(() => {
      downloadPicturePost(inputPost.name).then((url) => {
        createPost(text, url)
          .then(() => {
            text.value = '';
            loadPosts();
          });
      });
    });
  });

  // BOTÕES DE LIKE, EXCLUIR, EDITAR E COMENTAR
  // DAR LIKE
  btnIcons.addEventListener('click', (e) => {
    const target = e.target; // target referencia ao objeto que enviou o evento
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

    // BOTÃO DE EDITAR POST
    const editButton = target.dataset.btneditpost;
    if (editButton) {
      const textAreaPost = e.target.parentNode.parentNode.parentNode.querySelector('.post-publicado');
      const elementEditButton = e.target.parentNode.querySelector('.btn-edit');
      const elementSaveButton = e.target.parentNode.querySelector('.btn-save');
      textAreaPost.focus();
      elementEditButton.classList.add('hidden-content');
      elementSaveButton.classList.add('show-content');
    }

    // BOTÃO PARA SALVAR O POST EDITADO
    const saveButton = target.dataset.btnsavepost; // é o post id
    if (saveButton) {
      const textAreaSaveNewPost = e.target.parentNode.parentNode.parentNode.querySelector('.post-publicado');
      const elementEditButton = e.target.parentNode.querySelector('.btn-edit');
      const elementSaveButton = e.target.parentNode.querySelector('.btn-save');
      const newEditedPost = textAreaSaveNewPost.value;
      elementEditButton.classList.remove('hidden-content');
      elementSaveButton.classList.remove('show-content');
      editPost(newEditedPost, saveButton);
      loadPosts();
    }

    // DELETAR POST
    const deleteButton = target.dataset.btndeletpost;
    if (deleteButton) {
      const deleteConfirmation = confirmAction('Você realmente gostaria de deletar este post?');
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
    signOut().then(() => navigateTo('/'))
      .catch(() => {
        error('Tente novamente.');
      });
  });

  return main.appendChild(feedPage);
};
