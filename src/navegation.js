export const navigateTo = (url) => {
  window.history.pushState({}, '', url);
  const popstateEvent = new PopStateEvent('popstate', { state: {} });
  dispatchEvent(popstateEvent);
};
