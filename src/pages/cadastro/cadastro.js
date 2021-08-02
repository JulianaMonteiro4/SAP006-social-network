import { newRegister } from '../../services/index.js';

export const registerUser = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const cadastrarLogin = document.createElement('div');
  cadastrarLogin.setAttribute('class', 'teste');
  cadastrarLogin.innerHTML = ` 
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

  const btnRegister = cadastrarLogin.querySelector('#btn-register');
  btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    const email = cadastrarLogin.querySelector('#register-email').value;
    const password = cadastrarLogin.querySelector('#register-password').value;
    const repeatPassword = cadastrarLogin.querySelector('#repeat-password').value;
    newRegister(email, password, repeatPassword);
    window.history.pushState({}, '', '/');
    const popStateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popStateEvent);
    // console.log(email, password, repeatPassword);
  });

  const btnBack = cadastrarLogin.querySelector('#btn-back');
  btnBack.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    const popStateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popStateEvent);
  });

  return main.appendChild(cadastrarLogin);
};
