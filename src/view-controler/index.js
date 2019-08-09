import { components } from '../view/index.js';

const changeView = (router) => {
  const container = document.getElementById('container');
  container.innerHTML = '<img class="img-banner" src="img/img-banner.jpg">';
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
