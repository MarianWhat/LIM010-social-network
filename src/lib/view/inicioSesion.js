import { autEmailPass, authCuentaGoogle } from '../autenticacion.js';

export default () => {
  const viewInicioSesion = `
  <div class="banner display-flex"><h1>Codebook</h1><p class="text-login">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at ante leo. Sed venenatis, nisl non maximus consequat.</p></div> 
  <form class="display-flex form-login"> 
    <p class="text-login">Entra a un mundo consciente.<br> <strong> Siente, piensa y actúa. </strong></p>
    <div>
    <input type="email" id="input-mail" class="login-input" placeholder="ejemplo@ejemplo.com">
    <span id="icon-mail" class="icon-input"></span>
    </div>
    <div class="cont-password">
    <input type="password" id="input-password" class="login-input class-input" placeholder="Escribe tu contraseña" >
    <span id="icon-clave" class="icon-input icon-clave"></span>
    <span id="icon-password" class="icon-input"></span>

    </div>
    <p class="ms-info-alert" id="ms-info-alert"></p>
    
    <button class="btn login-btn" id="btn-iniciar-registrar" data-action ='login'>Iniciar Sesión</button>
    <div class="cont-btn-redes display-flex">
      <p class="text-peq">O bien ingresar con...</p>
        <button class="btn-curve btn-icon btn-google" id="login-google" style="background-image: url(img/icon-google.png)"></button>
        <button class="btn-curve none btn-icon btn-facebook"></button>
    </div>
    <p id="ms-iniciar-registrar" class="text-peq">¿No tienes una cuenta? <a href= "#/registro" class="" id="btn-change-iniciar-registrar">Regístrate</a></p> 
    </fomr>`;
  const sectionElem = document.createElement('section');
  sectionElem.setAttribute('class', 'sec-autentificacion display-flex');
  sectionElem.innerHTML += viewInicioSesion; // Hasta que no cree este elemento

  const inputMail = sectionElem.querySelector('#input-mail');
  const inputPassword = sectionElem.querySelector('#input-password');
  const loginGoogle = sectionElem.querySelector('#login-google');
  const btnIniciarRegistrar = sectionElem.querySelector('#btn-iniciar-registrar');
  const btnMostrarClave = sectionElem.querySelector('#icon-clave');
  const msInfoAlerta = sectionElem.querySelector('#ms-info-alert');
  const iconMail = sectionElem.querySelector('#icon-mail');
  const iconPassword = sectionElem.querySelector('#icon-password');
  let claveOculta = 0;

  loginGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    authCuentaGoogle()
      .then((respuestaXD) => {
        const infoUser = respuestaXD.user;
        console.log(infoUser);
        // alert(`Bienvenid@ ${infoUser.displayName}, has ingresado con exito.`);
      })
      .catch((error) => { // Para ver si devuelve un error
        console.log(error);
      });
  });
  btnIniciarRegistrar.addEventListener('click', (e) => {
    e.preventDefault();
    if (btnIniciarRegistrar.dataset.action === 'login') {
      autEmailPass(inputMail.value, inputPassword.value)
        .then((resultXD) => {
          console.log(resultXD);
          console.log(resultXD.user);
          console.log(resultXD.user.displayName);


          // const usuarioAct = resultXD.user.displayName;
          window.location.hash = '#/social-network';
        })
        .catch((error) => { // Para ver si devuelve un error
          switch (error.code) {
            case 'auth/invalid-email':
              inputPassword.classList.remove('info-alert');
              iconPassword.classList.remove('icon-alert');

              inputMail.classList.add('info-alert');
              iconMail.classList.add('icon-alert');

              msInfoAlerta.innerHTML = '**El formato del correo ingresado no es valido, verifica e intente de nuevo.';
              break;
            case 'auth/user-not-found':
              inputPassword.classList.remove('info-alert');
              iconPassword.classList.remove('icon-alert');

              inputMail.classList.add('info-alert');
              iconMail.classList.add('icon-alert');

              msInfoAlerta.innerHTML = '**No hay usuario registrado con ese correo., verifica e intente de nuevo.';
              break;
            case 'auth/wrong-password':
              inputMail.classList.remove('info-alert');
              iconMail.classList.remove('icon-alert');

              inputPassword.classList.add('info-alert');
              iconPassword.classList.add('icon-alert');

              msInfoAlerta.innerHTML = '**La contraseña no es válida, verifica e intente de nuevo.';
              break;
            default:
              console.log(error);
              break;
          }
        });
    }
  });
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
  return sectionElem;
};
