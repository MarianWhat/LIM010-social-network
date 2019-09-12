import {
  createPost, uploadImgPost, checkAllPost, deletePost, updatePost,
} from '../post.js';
import { templatePost, templateFormUpdatePost } from './template.js';

export default (userObj) => {
  const socialNetworkView = `
  <div class="user-card display-flex">
    <img id="photo-current-user" class="photo-current-user" src="">
    <div class="user-card-info">
        <h2 id="name-current-user"></h2>
        <p id="mail-current-user" class="mail-user"></p>
    </div>
  <button class="btn btn-form-user btn-publicar" id="close">Cerrar Sesión</button>

  </div>
  <div class="container-post-form">
    <form class="display-flex box-form-user">
        <textarea class="input-form-user"  id="content-to-post" placeholder="¿Tienes algo que contarnos?"></textarea>
         <div class="img-loading-container">
          <span class="none remove-img btn-icon icon-img" id="btn-remove-img" title="Quitar imagen"></span>
                <input id="btn-upload-img" type="file" name="img-post-new" accept="image/png, image/jpeg" class="btn-upload-img">
                <img class="img-to-post" id="img-to-post" src="">
                <div class="container-more-percentage">
                <span class="icon-more btn-icon icon-img"></span><br>
                <span class="load-percentage">Agrega una imagen</span>
                </div>
            </div>
         <button class="btn btn-form-user icon-text" id="btn-privacy" data-privacy='0'>
         <span class="btn-icon icon-public"></span><span id="text-privacy">Publico</span>
         <span class="icon-arrow icon-arrow-bottom"></span>
         </button>
         <nav class="list-menu none">
         <ul>
          <li class="icon-text" id="btn-public"><span class="btn-icon icon-public" ></span>Publico</li>
          <span class="line-horizontal"></span>
          <li class="icon-text" id="btn-private"><span class="btn-icon icon-private" ></span>Solo yo</li>
        </ul>
        </nav>
        <button class="btn btn-form-user btn-publicar" id="btn-create-post">Publicar</button>
      </form>
      <div class="container-posts" id="container-posts"></div>
</div>
`;
  const containerSocialNetworkViewElem = document.createElement('section');
  containerSocialNetworkViewElem.setAttribute('id', 'container-net');
  containerSocialNetworkViewElem.setAttribute('class', 'container-net display-flex');
  containerSocialNetworkViewElem.innerHTML += socialNetworkView;
  const btnUploadImg = containerSocialNetworkViewElem.querySelector('#btn-upload-img');
  const imgToPost = containerSocialNetworkViewElem.querySelector('#img-to-post');
  const btnRemoveImg = containerSocialNetworkViewElem.querySelector('#btn-remove-img');
  const containerMorePercentage = containerSocialNetworkViewElem.querySelector('.container-more-percentage');
  const loadPercentage = containerSocialNetworkViewElem.querySelector('.load-percentage');
  const photoCurrentUser = containerSocialNetworkViewElem.querySelector('#photo-current-user');
  const nameCurrentUser = containerSocialNetworkViewElem.querySelector('#name-current-user');
  const mailCurrentUser = containerSocialNetworkViewElem.querySelector('#mail-current-user');
  const contentToPost = containerSocialNetworkViewElem.querySelector('#content-to-post');
  const btnCreatePost = containerSocialNetworkViewElem.querySelector('#btn-create-post');
  const containerPosts = containerSocialNetworkViewElem.querySelector('#container-posts');
  const btnPrivacy = containerSocialNetworkViewElem.querySelector('#btn-privacy');
  const btnPublic = containerSocialNetworkViewElem.querySelector('#btn-public');
  const btnPrivate = containerSocialNetworkViewElem.querySelector('#btn-private');
  const textPrivacy = containerSocialNetworkViewElem.querySelector('#text-privacy');
  const close = containerSocialNetworkViewElem.querySelector('#close');
  let menuStatusPrivacy = 0;
  let menuStatus = 0;

  const templateMenuList = `<button class="btn-icon icon-menu-puntos"></button>
  <nav class="list-menu none">
      <ul>
        <li class="icon-text btn-update-post"><span class="btn-icon icon-edit"></span>Editar</li>
        <span class="line-horizontal"></span>
        <li class="icon-text btn-delete-post"><span class="btn-icon icon-delete"></span>Eliminar</li>
      </ul>      
    </nav>`;


  if (userObj) {
    photoCurrentUser.setAttribute('src', userObj.photoURL === null ? 'img/photo-default.png' : userObj.photoURL);
    nameCurrentUser.textContent = userObj.displayName;
    mailCurrentUser.textContent = userObj.email;
  } else {
    window.location.hash = '#';
  }

  const showPosts = (data) => {
    const user = firebase.auth().currentUser;
    containerPosts.innerHTML = '';
    data.forEach((post) => {
      const privacy = post.typePrivacy === '0' ? 'icon-public' : 'icon-private';
      const menuList = post.uidUser === user.uid ? templateMenuList : '';
      const opcionesFecha = {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      };
      const soloFecha = post.publicationDate.toDate().toLocaleDateString('es-ES', opcionesFecha);
      const soloHora = { hour: 'numeric', minute: '2-digit' };
      soloHora.hourCycle = 'h12';
      soloHora.timeStyle = 'short';
      const dia = soloFecha === new Date().toLocaleDateString('es-ES', opcionesFecha) ? 'Hoy' : post.publicationDate.toDate().toLocaleDateString('es-ES', opcionesFecha);
      const hora = post.publicationDate.toDate().toLocaleDateString('es-ES', soloHora);
      const date = `${dia}, ${hora}`;

      if (post.typePrivacy === '1' && post.uidUser === user.uid) {
        containerPosts.innerHTML += templatePost(
          post.idPost,
          post.imgUrlUser,
          post.nameUser,
          post.content,
          post.imgUrlPost,
          date,
          post.totalLike,
          privacy,
          menuList,
        );
      }
      if (post.typePrivacy === '0') {
        containerPosts.innerHTML += templatePost(
          post.idPost,
          post.imgUrlUser,
          post.nameUser,
          post.content,
          post.imgUrlPost,
          date,
          post.totalLike,
          privacy,
          menuList,
        );
      }
    });
    const iconMenuPuntos = containerPosts.querySelectorAll('.icon-menu-puntos');
    iconMenuPuntos.forEach((elemento) => {
      elemento.addEventListener('click', (e) => {
        if (menuStatus === 0) {
          e.target.nextElementSibling.classList.toggle('none');
          menuStatus = 1;
        } else {
          e.target.nextElementSibling.classList.toggle('none');
          menuStatus = 0;
        }
      });
    });
    const btnDeletePost = containerPosts.querySelectorAll('.btn-delete-post');
    let idPost = '';
    btnDeletePost.forEach((elemento) => {
      elemento.addEventListener('click', (e) => {
        idPost = e.target.parentElement.parentElement.parentElement.parentElement.id;
        if (idPost !== '') {
          deletePost(idPost)
            .then(() => {
              e.target.parentElement.parentElement.classList.toggle('none');
              menuStatus = 0;
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log('Error al eliminar: ', error);
            });
        }
      });
    });
    const btnUpdatePost = containerPosts.querySelectorAll('.btn-update-post');
    btnUpdatePost.forEach((elemento) => {
      elemento.addEventListener('click', (e) => {
        idPost = e.target.parentElement.parentElement.parentElement.parentElement.id;
        firebase.firestore().collection('posts').doc(idPost).get()
          .then((post) => {
            const formUpdate = document.createElement('form');
            formUpdate.setAttribute('id', idPost);
            formUpdate.setAttribute('class', 'display-flex box-form-user');
            formUpdate.innerHTML = templateFormUpdatePost(`<textarea class="input-form-user" id="content-to-post-update" placeholder="¿Tienes algo que contarnos?">${post.data().content}</textarea>`,
              post.data().imgUrlPost);
            const elementPost = e.target.parentElement.parentElement.parentElement.parentElement;
            containerPosts.replaceChild(formUpdate, elementPost);

            const btnPrivacyUpdate = formUpdate.querySelector('.btn-privacy-update');
            btnPrivacyUpdate.addEventListener('click', (a) => {
              a.preventDefault();
              if (menuStatusPrivacy === 0) {
                btnPrivacyUpdate.nextElementSibling.classList.toggle('none');
                menuStatusPrivacy = 1;
              } else {
                btnPrivacyUpdate.nextElementSibling.classList.toggle('none');
                menuStatusPrivacy = 0;
              }
            });
            const btnPublicUpdate = formUpdate.querySelector('.btn-public-update');
            btnPublicUpdate.addEventListener('click', () => {
              btnPrivacyUpdate.children[0].classList.replace('icon-private', 'icon-public');
              btnPrivacyUpdate.setAttribute('data-privacy', 0);
              btnPrivacyUpdate.children[1].textContent = 'Publico';
              btnPrivacyUpdate.nextElementSibling.classList.toggle('none');
              menuStatusPrivacy = 0;
            });
            const btnPrivateUpdate = formUpdate.querySelector('.btn-private-update');
            btnPrivateUpdate.addEventListener('click', () => {
              btnPrivacyUpdate.children[0].classList.replace('icon-public', 'icon-private');
              btnPrivacyUpdate.setAttribute('data-privacy', 1);
              btnPrivacyUpdate.children[1].textContent = 'Solo yo';
              btnPrivacyUpdate.nextElementSibling.classList.toggle('none');
              menuStatusPrivacy = 0;
            });
            const contentToPostUpdate = formUpdate.querySelector('#content-to-post-update');
            const btnUpdatePostYa = formUpdate.querySelector('#btn-update-post');
            btnUpdatePostYa.addEventListener('click', (a) => {
              a.preventDefault();
              const postd = firebase.firestore().collection('posts').doc(idPost);
              if (idPost !== '') {
                updatePost(postd, contentToPostUpdate.value, btnPrivacyUpdate.getAttribute('data-privacy'));
                // checkPublications();
              }
            });
          });
      });
    });
  };
  const mostrarCargaImg = (info) => {
    loadPercentage.textContent = info;
  };
  const checkPublications = () => {
    checkAllPost(showPosts);
  };
  const clearFormPost = () => {
    contentToPost.value = '';
    imgToPost.setAttribute('src', '');
    btnRemoveImg.classList.add('none');
    containerMorePercentage.classList.remove('none');
    loadPercentage.textContent = 'Agrega una imagen';
    btnUploadImg.value = '';
  };
  const stateChanged = () => {
    
  }
  // Eventos
  btnCreatePost.addEventListener('click', (e) => {
    e.preventDefault();
    const user = firebase.auth().currentUser;
    const privacy = btnPrivacy.getAttribute('data-privacy');
    const imgUrlUser = user.photoURL === null ? 'img/photo-default.png' : user.photoURL;
    if (user) {
      createPost(user.uid, user.displayName, imgUrlUser, contentToPost.value, imgToPost.getAttribute('src'), privacy, new Date())
        .then(() => {
          // console.log(refDof.id);
          clearFormPost();
        })
        // eslint-disable-next-line no-console
        .catch(error => console.log(error));
    }
  });
  btnUploadImg.addEventListener('change', (e) => {
    const imgFile = e.target.files[0];
    const user = firebase.auth().currentUser;
    uploadImgPost(imgFile, user.uid, imgToPost, mostrarCargaImg,
      btnRemoveImg, containerMorePercentage);
  });
  btnRemoveImg.addEventListener('click', () => {
    sessionStorage.clear();
    imgToPost.setAttribute('src', '');
    btnRemoveImg.classList.toggle('none');
    containerMorePercentage.classList.toggle('none');
  });
  close.addEventListener('click', (e) => {
    e.preventDefault();

    firebase.auth().signOut()
      .then(() => {
        window.location.hash = '#';
      });
  });
  btnPrivacy.addEventListener('click', (e) => {
    e.preventDefault();
    if (menuStatusPrivacy === 0) {
      btnPrivacy.nextElementSibling.classList.toggle('none');
      menuStatusPrivacy = 1;
    } else {
      btnPrivacy.nextElementSibling.classList.toggle('none');
      menuStatusPrivacy = 0;
    }
  });
  btnPublic.addEventListener('click', () => {
    btnPrivacy.children[0].classList.replace('icon-private', 'icon-public');
    btnPrivacy.setAttribute('data-privacy', 0);
    textPrivacy.textContent = 'Publico';
    btnPrivacy.nextElementSibling.classList.toggle('none');
    menuStatusPrivacy = 0;
  });
  btnPrivate.addEventListener('click', () => {
    btnPrivacy.children[0].classList.replace('icon-public', 'icon-private');
    btnPrivacy.setAttribute('data-privacy', 1);
    textPrivacy.textContent = 'Solo yo';
    btnPrivacy.nextElementSibling.classList.toggle('none');
    menuStatusPrivacy = 0;
  });
  checkPublications();
  // removeAttribute().
  return containerSocialNetworkViewElem;
};
