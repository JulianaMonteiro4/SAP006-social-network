import { navigateTo } from '../../navegation.js';
/* import {
  currentUser,
  updateProfile,
  dowloadProfile,
} from '../../services/index.js'; */

export const profile = () => {
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
              <img class="icon-profile" src="img/perfil.jpg" alt="meme" title="meme">
            </div>
            <input class="inputPhoto" type="file" />
          <fieldset class="form-login">
            <input class="input" type="text" id="text-name" placeholder="User Name" required="">
              <div class="icons-input">
                <i class="fas fa-user icons"></i>
              </div>
          </fieldset>
          <fieldset class="form-login">
            <input class="input" type="email" id="profile-email" placeholder="Email" required="">
            <div class="icons-input">
              <i class="far fa-envelope icons"></i>
            </div>
          </fieldset>
          <button class="btn btn-save" id="btn-save" type="button">Salvar</button>
          <button class="btn btn-back" id="btn-back-feed" type="button">Retornar</button>
        </form>
      </div>
    </div>       
  `;

  // const user = currentUser();
  // const userId = firebase.auth().currentUser.uid;
  // console.log(userId);
  // const inputName = profilePage.querySelector('.input-name').value;
  // const inputEmail = profilePage.querySelector('.input-email');
  // const iconProfile = profilePage.querySelector('.icon-profile');
  // const inputPhoto = profilePage.querySelector('.inputPhoto');
  const btnSave = profilePage.querySelector('#btn-save');
  const btnBackFeed = profilePage.querySelector('#btn-back-feed');

  // FOTO DE PERFIL
  /* function mostrarFoto() {
    const photoUser = user.photoURL;

    if (photoUser) {
      iconProfile.src = photoUser;
    }
  }

  mostrarFoto();

  inputPhoto.addEventListener('change', (e) => {
    const file = e.target.files[0];
    // console.log(namePicture);

    updateProfile(userId, file).then(() => {
      dowloadProfile(userId).then((url) => {
        const imgURL = url;

        user.updateImg({
          photoURL: imgURL,
        });
        mostrarFoto();
      });
    });
  }); */

  // SALVAR INFORMAÇÕES DO USUARIO
  /* btnSave.addEventListener('click', (e) => {
    e.preventDefault();
    const infoUser = {
      inputName: inputName.value,
      inputEmail: inputEmail.value,
    };
    console.log(infoUser);
  }); */

  // BOTÃO PARA IR PRO FEED DEPOIS DE SALVAR AS INFORMAÇÕES
  btnSave.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/feed');
  });

  // BOTÃO PARA RETORNAR PRO FEED
  btnBackFeed.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/feed');
  });

  return main.appendChild(profilePage);
};
