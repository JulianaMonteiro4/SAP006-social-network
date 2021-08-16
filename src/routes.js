import { loginMainScreen } from './pages/login/login.js';
import { recoverLink } from './pages/login/recuperar.js';
import { feed } from './pages/feed/feed.js';
import { blockUser } from './services/index.js';

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

export const navigateTo = (url) => {
  window.history.pushState({}, '', url);
  const popstateEvent = new PopStateEvent('popstate', { state: {} });
  dispatchEvent(popstateEvent);
};

window.addEventListener('popstate', routRender);
window.addEventListener('load', () => {
  blockUser();
  routRender();
});
