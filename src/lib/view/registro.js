import { autEmailPass, crearCuentaEmailPass } from '../autenticacion.js';

export default () => {
  const viewRegistro = `
  <div class="banner display-flex"><h1>Codebook</h1><p class="text-login">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at ante leo. Sed venenatis, nisl non maximus consequat.</p></div> 
  <form class="display-flex form-login">
  <p class="text-login">Entra a un mundo consciente.<br> <strong> Siente, piensa y actúa. </strong></p>
    <input type="text" id="input-name" class="login-input" placeholder="Nombre">
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
    <button class="btn login-btn" id="btn-iniciar-registrar" data-action='registrar'>Registrar</button>      
    <p id="ms-iniciar-registrar" class="text-peq">¿Ya tienes una cuenta? <a href= "#/" class="" id="btn-change-iniciar-registrar">Iniciar Sesión</a></p>
    </fomr>`;
  const sectionElem = document.createElement('section');
  sectionElem.setAttribute('class', 'sec-autentificacion display-flex');
  sectionElem.innerHTML += viewRegistro; // Hasta que no cree este elemento

  setTimeout(() => {
    const inputMail = document.getElementById('input-mail');
    const inputPassword = document.getElementById('input-password');
    const inputName = document.getElementById('input-name');
    const btnIniciarRegistrar = document.getElementById('btn-iniciar-registrar');
    const btnMostrarClave = document.getElementById('icon-clave');
    const msInfoAlerta = document.getElementById('ms-info-alert');
    const iconMail = document.getElementById('icon-mail');
    const iconPassword = document.getElementById('icon-password');
    let claveOculta = 0;

    btnIniciarRegistrar.addEventListener('click', (e) => {
      e.preventDefault();
      if (btnIniciarRegistrar.dataset.action === 'login') {
        autEmailPass(inputMail.value, inputPassword.value)
          .then((resultXD) => {
            const usuarioAct = resultXD.user.displayName;
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
      if (btnIniciarRegistrar.dataset.action === 'registrar') {
        crearCuentaEmailPass(inputMail.value, inputPassword.value)
          .then((resultXD) => {
            resultXD.user.updateProfile({ // Para actualizar
              displayName: inputName.value, // No podemos guardatos, solo podemos guardar una URL Img, nombre photoURL
            });
          })
          .then(() => {

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
              case 'auth/email-already-in-use':
                inputPassword.classList.remove('info-alert');
                iconPassword.classList.remove('icon-alert');
                inputMail.classList.add('info-alert');
                iconMail.classList.add('icon-alert');
                msInfoAlerta.innerHTML = '**El correo electrónico proporcionado esta siendo utilizado por otro miembro., verifica e intente de nuevo.';
                break;
              case 'auth/email-already-exists':
                inputPassword.classList.remove('info-alert');
                iconPassword.classList.remove('icon-alert');
                inputMail.classList.add('info-alert');
                iconMail.classList.add('icon-alert');
                msInfoAlerta.innerHTML = '**El correo electrónico proporcionado esta siendo utilizado por otro miembro., verifica e intente de nuevo.';
                break;
              case 'auth/weak-password':
                inputMail.classList.remove('info-alert');
                iconMail.classList.remove('icon-alert');
                inputPassword.classList.add('info-alert');
                iconPassword.classList.add('icon-alert');
                msInfoAlerta.innerHTML = '**La contraseña debe tener al menos 6 caracteres.';
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
  }, 700);
  return sectionElem;
};
