import { changeView } from './lib/controler/change-view.js';

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => {
    changeView(window.location.hash);
  });
};

window.addEventListener('load', init);

const menuChico = document.getElementById('menu-chico');
const menuDes = document.getElementById('menu-des');
let menuStatus = 0;
// 0 = cerrar
// 1 = abierto
menuDes.addEventListener('click', () => {
  if (menuStatus === 0) {
    menuChico.classList.add('block');
    menuChico.classList.remove('none');
    menuStatus = 1;
  } else {
    menuChico.classList.add('none');
    menuChico.classList.remove('block');
    menuStatus = 0;
  }
});
