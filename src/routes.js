import { registerUser } from './pages/cadastro/cadastro.js';
import { loginMainScreen } from './pages/login/login.js';
import { recoverLink } from './pages/login/recuperar.js';
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

export const getRoutes = (state) => {
  window.history.pushState({}, '', state);
  const popstateEvent = new PopStateEvent('popstate', { state: {} });
  dispatchEvent(popstateEvent);
};
