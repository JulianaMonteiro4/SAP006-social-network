// import { currentUser } from '../../services/index.js';
import { navigateTo } from '../../navegation.js';

export const profile = () => {
  const main = document.querySelector('.root');
  main.innerHTML = '';
  const profilePage = document.createElement('section');
  profilePage.setAttribute('class', 'root-profile');
  profilePage.innerHTML = `
    <div class="container-principal">
      <header>
        <img class="logo-img" src="img/gif-logo.gif" alt="logo">
      </header>
      <div class="container-main">
        <form>
          <label class="label label-profile" for="chk" aria-hidden="true">Perfil</label>
            <div class="photo-profile">
              <img src="img/perfil.jpg" alt="meme" title="meme">
            </div>
            <input class="input-photo" type="file" name"arquivo">
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

  // const inputName = profilePage.querySelector('.input-name');
  // const inputEmail = profilePage.querySelector('.input-email');
  // const photoProfile = profilePage.querySelector('.photo-profile');
  // const inputPhoto = profilePage.querySelector('.inputPhoto');
  const btnSave = profilePage.querySelector('#btn-save');
  const btnBackFeed = profilePage.querySelector('#btn-back-feed');

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
