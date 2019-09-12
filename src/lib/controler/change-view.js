import { components } from '../view/components-SPA.js';
import { checkUser } from '../autenticacion.js';


// eslint-disable-next-line consistent-return
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
      checkUser(userObj => container.appendChild(components.socialNetwork(userObj))); }
    // eslint-disable-next-line no-fallthrough
    default:
      break;
  }
};
export { changeView };

// <img class="img-logo" src="img/logo.png">
