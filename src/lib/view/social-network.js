/* eslint-disable no-tabs */
import {
  createPost, uploadImgPost, checkAllPost, deletePost, updatePost,
} from '../post.js';
import { templatePost } from './template.js';

export default () => {
  const socialNetworkView = `
  <div class="user-card display-flex">
    <img id="photo-current-user" class="photo-current-user" src="">
    <div class="user-card-info">
        <h2 id="name-current-user"></h2>
        <span id="uid-current-user"></span>
        <p id="mail-current-user" class="mail-user"></p>
    </div>
  </div>
  <div class="container-post-form">
	<form class="display-flex box-form-user">
        <textarea class="input-form-user"  id="content-to-post" placeholder="¿Tienes algo que contarnos?"></textarea>
         <img class="img-to-post" id="img-to-post" src="">
         <input id="btn-upload-img" type="file" name="img-post-new" accept="image/png, image/jpeg" class="btn btn-curve btn-icon icon-img">
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
  const photoCurrentUser = containerSocialNetworkViewElem.querySelector('#photo-current-user');
  const nameCurrentUser = containerSocialNetworkViewElem.querySelector('#name-current-user');
  const uidCurrentUser = containerSocialNetworkViewElem.querySelector('#uid-current-user');
  const mailCurrentUser = containerSocialNetworkViewElem.querySelector('#mail-current-user');
  const contentToPost = containerSocialNetworkViewElem.querySelector('#content-to-post');
  const btnCreatePost = containerSocialNetworkViewElem.querySelector('#btn-create-post');
  const containerPosts = containerSocialNetworkViewElem.querySelector('#container-posts');
  const btnPrivacy = containerSocialNetworkViewElem.querySelector('#btn-privacy');
  const btnPublic = containerSocialNetworkViewElem.querySelector('#btn-public');
  const btnPrivate = containerSocialNetworkViewElem.querySelector('#btn-private');
  const textPrivacy = containerSocialNetworkViewElem.querySelector('#text-privacy');
  const containerPostForm = containerSocialNetworkViewElem.querySelector('.container-post-form');
  
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
  const templateUpdatePost = `<form class="display-flex box-form-user">
  <textarea class="input-form-user"  id="content-to-post" placeholder="¿Tienes algo que contarnos?"></textarea>
   <img class="img-to-post" id="img-to-post" src="">
   <input id="btn-upload-img" type="file" name="img-post-new" accept="image/png, image/jpeg" class="btn btn-curve btn-icon icon-img">
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
</form>`;

  const userActive = () => {
    const user = firebase.auth().currentUser;
    if (user != null) {
      photoCurrentUser.setAttribute('src', user.photoURL === null ? 'img/photo-default.png' : user.photoURL);
      nameCurrentUser.textContent = user.displayName;
      uidCurrentUser.textContent = user.uid;
      mailCurrentUser.textContent = user.email;
    }
  };
  const showPosts = (data) => {
    const user = firebase.auth().currentUser;
    containerPosts.innerHTML = '';
    // eslint-disable-next-line consistent-return
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
      } else if (post.typePrivacy === '0') {
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
      } else {
        return false;
      }
    });
    const iconMenuPuntos = containerPosts.querySelectorAll('.icon-menu-puntos');
    let idPost = '';
    iconMenuPuntos.forEach((elemento) => {
      elemento.addEventListener('click', (e) => {
        idPost = '';
        idPost = e.target.parentElement.id;
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
    btnDeletePost.forEach((elemento) => {
      elemento.addEventListener('click', (e) => {
        if (idPost !== '') {
          deletePost(idPost)
            .then(() => {
              e.target.parentElement.parentElement.classList.toggle('none');
              // eslint-disable-next-line no-use-before-define
              actualizarPost();
              menuStatus = 0;
            })
            .catch((error) => {
              console.log('Error al eliminar: ', error);
            });
        }
      });
    });
    const btnUpdatePost = containerPosts.querySelectorAll('.btn-update-post');
    btnUpdatePost.forEach((elemento) => {
      elemento.addEventListener('click', (e) => {
        console.log(e.target.parentElement.parentElement.parentElement.parentElement);
        const eleL = e.target.parentElement.parentElement.parentElement.parentElement;
        containerPostForm.replaceChild(templateUpdatePost, eleL);
        
        if (idPost !== '') {
          const post = firebase.firestore().collection('posts').doc(idPost);
          updatePost(post)
            .then(() => {
              e.target.parentElement.parentElement.classList.toggle('none');
              // eslint-disable-next-line no-use-before-define
              actualizarPost();
              menuStatus = 0;
            })
            .catch((error) => {
              console.log('Error al eliminar: ', error);
            });
        }
      });
    });
  };
  const actualizarPost = () => {
    checkAllPost()
      .then((querySnapshot) => {
        const arr = [];
        userActive();
        querySnapshot.forEach((post) => {
          const obj = {
            idPost: post.id,
            nameUser: post.data().nameUser,
            uidUser: post.data().uidUser,
            imgUrlUser: post.data().imgUrlUser === null ? 'img/photo-default.png' : post.data().imgUrlUser,
            typePrivacy: post.data().typePrivacy,
            content: post.data().content,
            totalLike: post.data().totalLike,
            imgUrlPost: post.data().imgUrlPost === null ? '' : post.data().imgUrlPost,
            publicationDate: post.data().publicationDate,

          };
          arr.push(obj);
        });
        return arr;
      })
      .then((data) => {
        showPosts(data);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  };
  // const actualizarPost = () => {
  //   const arr = [];
  //   userActive();
  //   const yQuePromesa = checkAllPost();
  //   yQuePromesa.forEach((post) => {
  //     const obj = {
  //       idPost: post.id,
  //       nameUser: post.data().nameUser,
  //       uidUser: post.data().uidUser,
  //       imgUrlUser: post.data().imgUrlUser === null ? 'img/photo-default.png' : post.data().imgUrlUser,
  //       typePrivacy: post.data().typePrivacy,
  //       content: post.data().content,
  //       totalLike: post.data().totalLike,
  //       imgUrlPost: post.data().imgUrlPost === null ? '' : post.data().imgUrlPost,
  //       publicationDate: post.data().publicationDate,

  //     };
  //     arr.push(obj);
  //   });
  //   return arr;
  // };
  const clearFormPost = () => {
    contentToPost.value = '';
    imgToPost.setAttribute('src', '');
  };
  // Eventos
  btnCreatePost.addEventListener('click', (e) => {
    e.preventDefault();
    const user = firebase.auth().currentUser;
    const privacy = btnPrivacy.getAttribute('data-privacy');

    if (user) {
      createPost(user.uid, user.displayName, user.photoURL, contentToPost.value, privacy)
        .then(() => {
          // console.log(refDof.id);
          actualizarPost();
          clearFormPost();
          sessionStorage.clear();
        })
        // eslint-disable-next-line no-console
        .catch(error => console.log(error));
    }
  });
  btnUploadImg.addEventListener('change', (e) => {
    const imgFile = e.target.files[0];
    const user = firebase.auth().currentUser;
    uploadImgPost(imgFile, user.uid, imgToPost);
  });
  btnPrivacy.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log('e.target.parentElement.id', e.target.parentElement.id);
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
  //
  // removeAttribute().
  sessionStorage.clear();
  actualizarPost();

  // Real Time
  firebase.firestore().collection('posts')
    .onSnapshot((doc) => {
      doc.forEach((post) => {
        // eslint-disable-next-line no-console
        console.log(post.data().content);
      });
    });

  // firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     photoCurrentUser.setAttribute('src', user.photoURL === null ? 'img/photo-default.png' : user.photoURL);
  //     nameCurrentUser.textContent = user.displayName;
  //     uidCurrentUser.textContent = user.uid;
  //     mailCurrentUser.textContent = user.email;
  //   } else {
  //     window.location.hash = '#';
  //   }
  // });

  return containerSocialNetworkViewElem;
};
