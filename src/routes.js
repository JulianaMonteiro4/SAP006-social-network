import { loginMainScreen } from './pages/login/login.js';
import { recoverLink } from './pages/login/recuperar.js';
import { feed } from './pages/feed/feed.js';
import { blockNotLoggedUser } from './services/index.js';

const routRender = () => {
  const elemento = document.getElementById('root');
  const routes = {
    '/': loginMainScreen,
    '/recuperar': recoverLink,
    '/feed': feed,
  };
  elemento.innerHTML = '';
  elemento.appendChild(routes[window.location.pathname]());
};

window.addEventListener('popstate', routRender);
window.addEventListener('load', () => {
  blockNotLoggedUser();
  routRender();
});
