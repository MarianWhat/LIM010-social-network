import { autEmailPass, crearCuentaEmailPass, authCuentaGoogle } from './lib/autenticacion.js';
import { changeView } from './view-controler/index.js';

// all, Contiene las varibles y eventos.
const all = () => {
  const inputMail = document.getElementById('input-mail')
  const inputPassword = document.getElementById('input-password');
  const inputName = document.getElementById('input-name');
  const loginGoogle = document.getElementById('login-google');
  const btnIniciarRegistrar = document.getElementById('btn-iniciar-registrar');
  const btnMostrarClave = document.getElementById('icon-clave');
  const msInfoAlerta = document.getElementById('ms-info-alert');
  const iconMail = document.getElementById('icon-mail');
  const iconPassword = document.getElementById('icon-password');


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
    if (btnIniciarRegistrar.dataset.action === 'login') {
      autEmailPass(inputMail, inputPassword, msInfoAlerta, iconPassword, iconMail);
    }
    if (btnIniciarRegistrar.dataset.action === 'registrar') {
      crearCuentaEmailPass(inputMail, inputPassword, inputName, msInfoAlerta, iconPassword, iconMail);
    }
  });
};

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => {
    changeView(window.location.hash);
    all(); // Contiene las varibles y eventos.
  });
};

window.addEventListener('load', init);

// Esto es temporal, Lulu dice que lo deje asi mientras.
setTimeout(() => {
  all(); // Contiene las varibles y eventos.
}, 700);
