import { autEmailPass, crearCuentaEmailPass, authCuentaGoogle } from './lib/autenticacion.js';
import { changeView } from './view-controler/index.js';

const all = () => {
  const inputMail = document.getElementById('input-mail');
  const inputPassword = document.getElementById('input-password');
  const inputName = document.getElementById('input-name');
  const loginGoogle = document.getElementById('login-google');
  const btnIniciarRegistrar = document.getElementById('btn-iniciar-registrar');
  const btnMostrarClave = document.getElementById('icon-clave');
  let claveOculta = 0;

  btnMostrarClave.addEventListener('click', () => {
    if (claveOculta === 0) {
      inputPassword.setAttribute('type', 'text');
      claveOculta = 1;
      btnMostrarClave.classList.add('mostrar');
    } else {
      inputPassword.setAttribute('type', 'password');
      claveOculta = 0;
      btnMostrarClave.classList.remove('mostrar');
    }
  });
  loginGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    authCuentaGoogle();
  });
  btnIniciarRegistrar.addEventListener('click', (e) => {
    e.preventDefault();
    const email = inputMail.value;
    const password = inputPassword.value;
    const name = inputName.value;
    if (btnIniciarRegistrar.dataset.action === 'login') {
      autEmailPass(email, password);
    }
    if (btnIniciarRegistrar.dataset.action === 'registrar') {
      crearCuentaEmailPass(email, password, name);
    }
  });
};

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => {
    changeView(window.location.hash);
    all();
  });
};
window.addEventListener('load', init);

setTimeout(() => {
  all();
}, 900);
