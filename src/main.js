import { autEmailPass, crearCuentaEmailPass, authCuentaGoogle } from './lib/autenticacion.js';
import {
  createPost, uploadImg, checkAllPost, checkUserPost,
} from './lib/post.js';
import { changeView } from './view-controler/index.js';

// all, Contiene las varibles y eventos.
const all = () => {
  const inputMail = document.getElementById('input-mail');
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

const btnUploadImg = document.getElementById('btn-upload-img');
const imgToPost = document.getElementById('img-to-post');
const photoCurrentUser = document.getElementById('photo-current-user');
const nameCurrentUser = document.getElementById('name-current-user');
const uidCurrentUser = document.getElementById('uid-current-user');
const mailCurrentUser = document.getElementById('mail-current-user');
const contentToPost = document.getElementById('content-to-post');
const btnCreatePost = document.getElementById('btn-create-post');
const containerPosts = document.getElementById('container-posts');


let currentUserAct;

btnCreatePost.addEventListener('click', (e) => {
  e.preventDefault();
  const user = firebase.auth().currentUser;
  if (user) {
    createPost(user.uid, user.displayName, user.photoURL, contentToPost.value, 0);
  }
});

btnUploadImg.addEventListener('change', (e) => {
  const imgFile = e.target.files[0];
  const user = firebase.auth().currentUser;
  uploadImg(imgFile, user.uid, imgToPost);
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    photoCurrentUser.setAttribute('src', user.photoURL === null ? 'img/photo-default.png' : user.photoURL);
    nameCurrentUser.textContent = user.displayName;
    uidCurrentUser.textContent = user.uid;
    mailCurrentUser.textContent = user.email;
    currentUserAct = user.uid;
    checkUserPost(currentUserAct);
  }
});

const array = checkAllPost().map;
console.log(array);

array.forEach((element) => {
    console.log(element);
  containerPosts.innerHTML += `
    <article class="box-post-user">
  <div class="post-user-info">
     <img class="post-user-photo" src="${element.imgUrlUser}">`;
  });




//   for (let index = 0; index < data.length; index++) {
//     const post = data[index];

//     containerPosts.innerHTML += `
//     <article class="box-post-user">
//     <div class="post-user-info">
//       <img class="post-user-photo" src="${post.imgUrlUser}">
//       <div class="cont-post-user-info">
//         <p class="post-user-name">${post.nameUser}</p>
//         <div class="display-flex cont-post-user-date">
//           <span class="post-user-date">20 de feb de 2020</span>
//           <button class="btn-curve btn-icon icon-privacidad"></button>
//         </div>
//       </div>
//       <button class="btn btn-curve btn-icon icon-menu-puntos"></button>
// </div>
//     <div class="post-user-cont">
//       <p class="post-user-text">${post.content}</p>
//       <img class="post-user-img" src="${post.imgUrlPost}">
//     </div>
//     <div class="post-user-nav display-flex">
//       <div class="container-like display-flex">
//           <span class="icon-like btn-icon" id=""></span>
//           <span class="post-user-cant-like">${post.totalLike}</span>
//       </div>
//       <button class="btn btn-form-user icon-text">
//           <span class="btn-icon icon-comentario"></span>Comentar
//       </button>
//     </div>
// </article>`;
//   }

// checkAllPost();
