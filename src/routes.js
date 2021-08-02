// COLOCAR AS ROTAS DO SITE (SPA)

import { registerUser } from './pages/cadastro/cadastro.js';
import { loginMainScreen } from './pages/loginHome/login.js';
// import {} from "../Pages/Feed/feed.js"

const routRender = () => {
  const elemento = document.getElementById('root');
  const routes = {
    '/': loginMainScreen,
    '/cadastro': registerUser,
  };
  elemento.innerHTML = '';
  elemento.appendChild(routes[window.location.pathname]());
};

window.addEventListener('popstate', routRender);
window.addEventListener('load', () => {
  routRender();
});
