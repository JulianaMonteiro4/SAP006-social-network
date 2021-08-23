// import { currentUser } from '../../services/index.js';
import { navigateTo } from '../../navegation.js';

export const profile = () => {
  const main = document.querySelector('.root');
  main.innerHTML = '';
  // const user = currentUser();
  // const userId = user.uid;
  // const storage = firebase.storage();
  const profilePage = document.createElement('section');
  profilePage.setAttribute('class', 'container background');
  profilePage.innerHTML = `
    <div class="container-principal">
      <header>
        <img class="logo-img" src="img/gif-logo.gif" alt="logo">
      </header>
      <div class="container-main container-profile">
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
          <button class="btn btn-back btn-save" id="btn-save" type="button">Salvar</button>
        </form>
      </div>
    </div>       
  `;

  // const inputName = profilePage.querySelector('.input-name');
  // const inputEmail = profilePage.querySelector('.input-email');
  // const photoProfile = profilePage.querySelector('.photo-profile');
  // const inputPhoto = profilePage.querySelector('.inputPhoto');
  const btnSave = profilePage.querySelector('#btn-save');

  // BOTÃO PARA IR PRO FEED DEPOIS DE SALVAR AS INFORMAÇÕES
  btnSave.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/');
  });

  return main.appendChild(profilePage);
};
