export default () => {
  const viewInicioSesion = `<h1>Codebook<img class="img-log" src="img/logo.jpg"></h1>
    <p>¡Bienvenida, coder¡</p>
    <input type="text" id="input-name" class="login-input none" placeholder="Nombre">

    <input type="text" id="input-mail" class="login-input" placeholder="ejemplo@mail.com">
    <input type="password" id="input-password" class="login-input class-input" placeholder="Escribe tu contraseña" >
    <span id="icon-clave" class="icon-clave"></span>
    <button class="btn login-btn" id="btn-iniciar-registrar" data-action ='login'>Iniciar Sesión</button>
    <div class="cont-btn-redes display-flex">
      <p>O bien ingresar con...</p>
        <button class="btn-circule btn-icon btn-google" id="login-google" style="background-image: url(img/icon-google.png)"></button>
        <button class="btn-circule btn-icon btn-facebook"></button>
    </div>
    <p id="ms-iniciar-registrar">¿No tienes una cuenta? <a href= "#/registro" class="" id="btn-change-iniciar-registrar">Regístrate</a></p> `;
  const formElem = document.createElement('form');
  formElem.setAttribute('class', 'display-flex');
  formElem.setAttribute('id', 'form-login');
  formElem.innerHTML += viewInicioSesion;
  return formElem;
};
