// COLOCAR AS ROTAS DO SITE (SPA)

import { registerUser } from './pages/cadastro/cadastro.js';
import { loginMainScreen } from './pages/LogIn-Home/login.js';
import { recoverLink } from './pages/LogIn-Home/recuperar.js';
import { feed } from './pages/feed/feed.js';

const routRender = () => {
  const elemento = document.getElementById('root');
  const routes = {
    '/': loginMainScreen,
    '/cadastro': registerUser,
    '/recuperar': recoverLink,
    '/feed': feed,
  };
  elemento.innerHTML = '';
  elemento.appendChild(routes[window.location.pathname]());
};

window.addEventListener('popstate', routRender);
window.addEventListener('load', () => {
  routRender();
});
