import { newRegister } from '../../services/index.js';
import { getRoutes } from '../../routes.js';

export const registerUser = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const registerPage = document.createElement('div');
  registerPage.setAttribute('class', 'teste');
  registerPage.innerHTML = ` 
    <section class="register container-login">
        <h2 class="login">Registrar</h2>
        <form class="container-form form-register">
            <fieldset class="icons-cadastro icons-login">
                <input class="text-field" type="email" placeholder="Insira um e-mail" id="register-email">
                <i class="far fa-envelope"></i>                
            </fieldset>
            <fieldset class="icons-cadastro icons-login">
                <input class="text-field"type="password" placeholder="Insira uma senha" id="register-password">
                <i class="fas fa-lock-open"></i>
                <i class="fas fa-lock"></i>                
            </fieldset>
            <fieldset class="icons-cadastro">
                <input class="text-field" type="password" placeholder="Repita sua senha" id="repeat-password">
                <i class="fas fa-lock-open"></i>
                <i class="fas fa-lock"></i>                
            </fieldset>
            <button type="button" id="btn-register" class="btn btn-login">Cadastrar</button>
            <button type="button" id="btn-back" class="btn btn-login">Retornar</button>
        </form>
    </section>              
    `;

  const btnRegister = registerPage.querySelector('#btn-register');
  const email = registerPage.querySelector('#register-email');
  const password = registerPage.querySelector('#register-password');
  const repeatPassword = registerPage.querySelector('#repeat-password');
  const btnBack = registerPage.querySelector('#btn-back');

  btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    newRegister(email.value, password.value, repeatPassword.value);
  });

  btnBack.addEventListener('click', (e) => {
    e.preventDefault();
    getRoutes('/');
  });

  return main.appendChild(registerPage);
};
