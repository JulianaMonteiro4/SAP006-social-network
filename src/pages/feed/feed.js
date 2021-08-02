// import { loginWithRegister } from './dataFeed';

export const feed = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';
  const loginFeed = document.createElement('div');
  loginFeed.setAttribute('class', 'teste');
  loginFeed.innerHTML = ` 
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
              <button type="button" id="btn-logout" class="btn btn-login">Sair</button>
          </form>
      </section>              
      `;

  return main.appendChild(loginFeed);
};
