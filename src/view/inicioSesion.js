export default () => {
  const viewInicioSesion = `
    <p class="text-login">Entra a un mundo consciente.<br> <strong> Siente, piensa y actúa. </strong></p>
    <input type="text" id="input-name" class="login-input none" placeholder="Nombre">
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
    <p id="ms-iniciar-registrar" class="text-peq">¿No tienes una cuenta? <a href= "#/registro" class="" id="btn-change-iniciar-registrar">Regístrate</a></p> `;
  const formElem = document.createElement('form');
  formElem.setAttribute('class', 'display-flex form-login');

  formElem.innerHTML += viewInicioSesion;
  return formElem;
};

// Por solucionar:
// - <input type="text" id="input-name" class="login-input none" placeholder="Nombre"></input>
