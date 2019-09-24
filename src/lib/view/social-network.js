import {
  createPost, uploadImgPost, checkAllPost, deletePost, updatePost, updatePostLike,
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
  const clearFormPost = () => {
    contentToPost.value = '';
    imgToPost.setAttribute('src', '');
    btnRemoveImg.classList.add('none');
    containerMorePercentage.classList.remove('none');
    loadPercentage.textContent = 'Agrega una imagen';
    btnUploadImg.value = '';
  };
  const stateChanged = (refe, btn) => {
    const loadPercentageGeneric = btn.target.nextElementSibling.nextElementSibling.children[2];
    const containerMorePercentageGeneric = btn.target.nextElementSibling.nextElementSibling;
    const imgToPostGeneric = btn.target.nextElementSibling;
    const btnRemoveImgGeneric = btn.target.previousElementSibling;
    refe.on('state_changed',
      (snapshot) => {
        const porc = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        loadPercentageGeneric.textContent = `Carga ${porc.toFixed(0)}%`;
      },
      // eslint-disable-next-line no-console
      error => console.log('Error subiendo la img:', error),
      () => {
        refe.snapshot.ref.getDownloadURL()
          .then((url) => {
            imgToPostGeneric.setAttribute('src', url);
            btnRemoveImgGeneric.classList.remove('none');
            containerMorePercentageGeneric.classList.add('none');
          })
          // eslint-disable-next-line no-console
          .catch();
      });
  };
  const UploadImg = (btn) => {
    const imgFile = btn.target.files[0];
    const user = firebase.auth().currentUser;
    uploadImgPost(imgFile, user.uid, stateChanged, btn);
  };
  const RemoveImg = (btn) => {
    const imgToPostGeneric = btn.target.nextElementSibling.nextElementSibling;
    const containerMorePercentageGeneric = imgToPostGeneric.nextElementSibling;
    imgToPostGeneric.setAttribute('src', '');
    btn.target.classList.toggle('none');
    containerMorePercentageGeneric.classList.toggle('none');
    containerMorePercentageGeneric.children[2].textContent = 'Agrega una imagen';
    // Falta Z-index
  };
  const Privacy = (btn) => {
    if (menuStatusPrivacy === 0) {
      btn.nextElementSibling.classList.toggle('none');
      menuStatusPrivacy = 1;
    } else {
      btn.nextElementSibling.classList.toggle('none');
      menuStatusPrivacy = 0;
    }
  };
  const Public = (btn) => {
    const txtBtnPublic = btn.parentElement.parentElement.previousElementSibling.children[1];
    const btnPrivacyGeneric = btn.parentElement.parentElement.previousElementSibling;
    btnPrivacyGeneric.children[0].classList.replace('icon-private', 'icon-public');
    btnPrivacyGeneric.setAttribute('data-privacy', 0);
    txtBtnPublic.textContent = 'Publico';
    btnPrivacyGeneric.nextElementSibling.classList.toggle('none');
    menuStatusPrivacy = 0;
  };
  const Private = (btn) => {
    const txtBtnPublic = btn.parentElement.parentElement.previousElementSibling.children[1];
    const btnPrivacyGeneric = btn.parentElement.parentElement.previousElementSibling;
    btnPrivacyGeneric.children[0].classList.replace('icon-public', 'icon-private');
    btnPrivacyGeneric.setAttribute('data-privacy', 1);
    txtBtnPublic.textContent = 'Solo yo';
    btnPrivacyGeneric.nextElementSibling.classList.toggle('none');
    menuStatusPrivacy = 0;
  };
  const showPosts = (data) => {
    const user = firebase.auth().currentUser;
    containerPosts.innerHTML = '';
    data.forEach((post) => {
      const privacy = post.typePrivacy === '0' ? 'icon-public' : 'icon-private';
      const menuList = post.uidUser === user.uid ? templateMenuList : '';
      const imgUrlUserN = post.imgUrlUser === null ? 'img/photo-default.png' : post.imgUrlUser;
      const imgUrlPostN = post.imgUrlPost === null ? '' : post.imgUrlPost;
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
      const sumLike = (post.like).length;
      let contLike = `<span class="icon-like btn-icon btn-like"></span>
      <span class="post-user-cant-like">${sumLike}</span>`;

      if ((post.like).includes(user.uid)) {
        contLike = `<span class="icon-like btn-icon btn-like active"></span>
      <span class="post-user-cant-like">${sumLike}</span>`;
      }

      if (post.typePrivacy === '1' && post.uidUser === user.uid) {
        containerPosts.innerHTML += templatePost(
          post.idPost,
          imgUrlUserN,
          post.nameUser,
          post.content,
          imgUrlPostN,
          date,
          contLike,
          privacy,
          menuList,
        );
      }
      if (post.typePrivacy === '0') {
        containerPosts.innerHTML += templatePost(
          post.idPost,
          imgUrlUserN,
          post.nameUser,
          post.content,
          imgUrlPostN,
          date,
          contLike,
          privacy,
          menuList,
        );
      }
      const btnLikePost = containerPosts.querySelectorAll('.btn-like');
      btnLikePost.forEach((element) => {
        element.addEventListener('click', (e) => {
          const idPostLike = e.target.parentElement.parentElement.parentElement.getAttribute('id');
          firebase.firestore().collection('posts').doc(idPostLike).get()
            .then((postLike) => {
              const arrayLike = postLike.data().like;
              if (!(arrayLike.includes(user.uid))) {
                arrayLike.push(user.uid);
                updatePostLike(idPostLike, arrayLike)
                  .then(() => e.target.classList.add('active'));
              } else {
                const i = arrayLike.indexOf(user.uid);
                arrayLike.splice(i, 1);
                updatePostLike(idPostLike, arrayLike)
                  .then(() => e.target.classList.remove('active'));
              }
            });
        });
      });
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
            console.log(post.data().imgUrlPost);
            formUpdate.innerHTML = templateFormUpdatePost(`<textarea class="input-form-user" id="content-to-post-update" placeholder="¿Tienes algo que contarnos?">${post.data().content}</textarea>`,
              post.data().imgUrlPost);
            const elementPost = e.target.parentElement.parentElement.parentElement.parentElement;
            containerPosts.replaceChild(formUpdate, elementPost);
            if (post.data().imgUrlPost !== '') {
              formUpdate.children[1].children[3].classList.toggle('none');
              formUpdate.children[1].children[0].classList.toggle('none');
            }
            const btnUploadImgUpdate = formUpdate.querySelector('#btn-upload-img-update');
            btnUploadImgUpdate.addEventListener('change', (a) => {
              UploadImg(a);
            });
            const btnRemoveImgUpdate = formUpdate.querySelector('#btn-remove-img-update');
            btnRemoveImgUpdate.addEventListener('click', (a) => {
              RemoveImg(a);
            });
            const btnPrivacyUpdate = formUpdate.querySelector('.btn-privacy-update');
            btnPrivacyUpdate.addEventListener('click', (a) => {
              a.preventDefault();
              Privacy(btnPrivacyUpdate);
            });
            const btnPublicUpdate = formUpdate.querySelector('.btn-public-update');
            btnPublicUpdate.addEventListener('click', () => {
              Public(btnPublicUpdate);
            });
            const btnPrivateUpdate = formUpdate.querySelector('.btn-private-update');
            btnPrivateUpdate.addEventListener('click', () => {
              Private(btnPrivateUpdate);
            });

            const contentToPostUpdate = formUpdate.querySelector('#content-to-post-update');
            const btnUpdatePostYa = formUpdate.querySelector('#btn-update-post');
            const imgToPostUpdate = formUpdate.querySelector('#img-to-post-update');
            btnUpdatePostYa.addEventListener('click', (a) => {
              a.preventDefault();
              if (idPost !== '') {
                updatePost(idPost, contentToPostUpdate.value, imgToPostUpdate.getAttribute('src'), btnPrivacyUpdate.getAttribute('data-privacy'));
              }
            });
          });
      });
    });
  };
  const checkPublications = () => {
    checkAllPost(showPosts);
  };
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
    UploadImg(e);
  });
  btnRemoveImg.addEventListener('click', (e) => {
    RemoveImg(e);
  });
  btnPrivacy.addEventListener('click', (e) => {
    e.preventDefault();
    Privacy(btnPrivacy);
  });
  btnPublic.addEventListener('click', () => {
    Public(btnPublic);
  });
  btnPrivate.addEventListener('click', () => {
    Private(btnPrivate);
  });
  checkPublications();
  // removeAttribute()
  close.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        window.location.hash = '#';
      });
  });
  return containerSocialNetworkViewElem;
};
