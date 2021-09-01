import {
  currentUser,
  updatePhotoProfile,
  dowloadPhotoProfile,
} from '../../services/index.js';
import { navigateTo } from '../../navegation.js';

export const profile = () => {
  const user = currentUser();

  const main = document.querySelector('.root');
  main.innerHTML = '';
  const profilePage = document.createElement('section');
  profilePage.setAttribute('class', 'container background');
  profilePage.innerHTML = `
    <div class="container-principal">
      <header>
        <img class="logo-img" src="img/gif-logo.gif" alt="logo">
      </header>
      <div class="container-main container-profile">
        <form>
          <label class="label label-profile" for="chk" aria-hidden="true">Perfil</label>
            <div class="photo-profile">
              <img class="icon-profile" src="" alt="meme" title="meme">
            </div>
            <input class="inputPhoto" type="file" />
          <fieldset class="form-login">
            <input class="name-input" type="text" id="text-name" placeholder="User Name" value="${user.displayName}">
              <div class="icons-input">
                <i class="fas fa-user icons"></i>
              </div>
          </fieldset>
          <fieldset class="form-login">
            <input class="email-input" type="email" id="profile-email" value="${user.email}">
            <div class="icons-input">
              <i class="far fa-envelope icons"></i>
            </div>
          </fieldset>
          <button class="btn" id="btn-save" type="button">Salvar</button>
            <div class="modal-bg">
              <div class="modal"></div>
                <h2 class="modal-phrase">Informações salvas.</h2>
                <button class="modal-close">X</button>
              </div>
          <button class="btn btn-back" id="btn-back-feed" type="button">Retornar</button>
        </form>
      </div>
    </div>       
  `;

  // const user = currentUser();
  // const userId = firebase.auth().currentUser.uid;
  const inputName = profilePage.querySelector('.name-input');
  // const inputEmail = profilePage.querySelector('.email-input');
  const iconProfile = profilePage.querySelector('.icon-profile');
  const inputPhoto = profilePage.querySelector('.inputPhoto');
  const btnSave = profilePage.querySelector('#btn-save');
  const btnBackFeed = profilePage.querySelector('#btn-back-feed');
  const modalBg = profilePage.querySelector('.modal-bg');
  const modalClose = profilePage.querySelector('.modal-close');

  // SALVANDO AS INFORMAÇÕES DO PERFIL
  btnSave.addEventListener('click', (e) => {
    e.preventDefault();
    user.updateProfile({
      displayName: inputName.value,
    });
    modalBg.classList.add('bg-active');
  });

  modalClose.addEventListener('click', (e) => {
    e.preventDefault();
    modalBg.classList.remove('bg-active');
  });

  // FOTO DE PERFIL
  iconProfile.src = user.photoURL;

  inputPhoto.addEventListener('change', (e) => {
    const file = e.target.files[0];

    updatePhotoProfile(user.uid, file);
    dowloadPhotoProfile(user.uid).then((url) => {
      const imgProfile = url;

      user.updateProfile({
        photoURL: imgProfile,
      });
    });
  });

  // BOTÃO PARA RETORNAR PRO FEED
  btnBackFeed.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/feed');
  });

  return main.appendChild(profilePage);
};
