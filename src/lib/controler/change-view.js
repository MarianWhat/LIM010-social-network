import { components } from '../view/components-SPA.js';

const changeView = (router) => {
  const container = document.getElementById('container-main');
  container.innerHTML = '';
  switch (router) {
    case '': {
      return container.appendChild(components.inicioSesion()); }
    case '#/': {
      return container.appendChild(components.inicioSesion()); }
    case '#/registro': {
      return container.appendChild(components.registro()); }
    case '#/social-network': {
      return container.appendChild(components.socialNetwork()); }
    default:
      break;
  }
};
export { changeView };

// <img class="img-logo" src="img/logo.png">
