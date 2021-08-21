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
          <label class="label" for="chk" aria-hidden="true">Perfil</label>
          <fieldset class="form-login">
            <input class=" input input-name" type="text" text="Nome de Usuário" value="">
            <input class="input input-email" type="email" id="recover-email" placeholder="Email" value="">
            <div class="icons-input">
              <i class="far fa-envelope icons"></i>
            </div>
          </fieldset>
          <img class="photo-profile" src="img/perfil.png" alt="meme" title="meme">               
          <input class="inputPhoto" type="file" name"arquivo">
          <button class="btn btn-save" id="btn-save" type="button">Salvar</button>
          <button class="btn btn-back btn-save" id="btn-back-feed" type="button">Retornar</button>
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
