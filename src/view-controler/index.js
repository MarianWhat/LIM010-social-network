import { components } from '../view/index.js';

const changeView = (router) => {
  const container = document.getElementById('container');
  container.innerHTML = '<div class="banner display-flex"><h1>Codebook</h1><p class="text-login">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at ante leo. Sed venenatis, nisl non maximus consequat.</p></div> ';
  switch (router) {
    case '': {
      return container.appendChild(components.inicioSesion()); }
    case '#/': {
      return container.appendChild(components.inicioSesion()); }
    case '#/registro': {
      return container.appendChild(components.registro()); }
    default:
      break;
  }
};
export { changeView };

// <img class="img-logo" src="img/logo.png">