// MANIPULAÇÃO DO DOM DO CADASTRO

// import { register } from '../../services/index.js';

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
        </form>
    </section>              
    `;

  /* const email = cadastrarLogin.querySelector('#email').value;
  const password = cadastrarLogin.querySelector('#password').value; */
  const btnCadastrar = cadastrarLogin.querySelector('#btn-register');

  btnCadastrar.addEventListener('click', (e) => {
    e.preventDefault();
    registerUser(btnCadastrar.querySelector('#email').value, btnCadastrar.querySelector('#password').value);
  });

  return main.appendChild(cadastrarLogin);
};

// registerUser()
// const cadastroPage = document.querySelector('#root').innerHTML =

// PLANTÃO EVE - LAYS
/* export const Cadastro = () => {
    const rootElement = document.createElement("div");
    rootElement.innerHTML = `<h1> FUNCIONOOOOOOOOU </h1>`;
    return rootElement;
  }
  */
