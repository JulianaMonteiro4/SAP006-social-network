// MANIPULAÇÃO DO DOM DO CADASTRO

// import { register } from '../../services/index.js';

export const registerUser = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const cadastrarLogin = document.createElement('div');
  cadastrarLogin.setAttribute('class', 'teste');
  cadastrarLogin.innerHTML = ` 
    <div class="l-container-grid">
        <header class='title'>  
            <h1 class='title main-title'>MS&U</h1> 
            <span class='title phrase'> Aqui onde os memes socializam e você não. </span>
        </header>
        <section class="register">
        <h2>Registrar</h2>
        <form class="container-form form-register">
            <fieldset class="icons-cadastro">
                <input type="email" placeholder="Insira um e-mail" id="register-email">
                <i class="far fa-envelope"></i>
                <input type="password" placeholder="Insira uma senha" id="register-password">
            </fieldset>
            <fieldset class="icons-cadastro">
                <i class="fas fa-lock-open"></i>
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Repita sua senha" id="repeat-password">
            </fieldset>
            <fieldset class="icons-cadastro">
                <i class="fas fa-lock-open"></i>
                <i class="fas fa-lock"></i>
            </fieldset>
            <button type="button" id="btn-register" class="btn">Cadastrar</button>
        </form>
    </section>  
            
        <footer class="footer">
            <p> Desenvolvido por <a href="#"> Bianca </a>, <a href="#"> Juliana </a> e <a href="#"> Paloma</a>
        </footer>
    </div>
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
