export default () => {
  const viewRegistro = `
  <p class="text-login">Entra a un mundo consciente.<br> <strong> Siente, piensa y actúa. </strong></p>
    <input type="text" id="input-name" class="login-input" placeholder="Nombre">
      <input type="text" id="input-mail" class="login-input" placeholder="ejemplo@mail.com">
      <input type="password" id="input-password" class="login-input class-input" placeholder="Escribe tu contraseña" >
      <span id="icon-clave" class="icon-clave"></span>
      <button class="btn login-btn" id="btn-iniciar-registrar" data-action='registrar'>Registrar</button>
      <div class="cont-btn-redes display-flex">
        <p class="text-peq">O bien ingresar con...</p>
          <button class="btn-circule btn-icon btn-google" id="login-google" style="background-image: url(img/icon-google.png)"></button>
          <button class="btn-circule btn-icon btn-facebook"></button>
      </div>
      <p id="ms-iniciar-registrar" class="text-peq">¿No tienes una cuenta? <a href= "#/" class="" id="btn-change-iniciar-registrar">Iniciar Sesión</a></p> `;
  const formElem = document.createElement('form');
  formElem.setAttribute('class', 'display-flex form-login');
 formElem.setAttribute('id', 'form-login');
  formElem.innerHTML += viewRegistro;
  return formElem;
};
