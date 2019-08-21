import { createPost, uploadImgPost, checkAllPost } from '../post.js';
import { templatePost } from './template.js';

export default () => {
  const socialNetworkView = `
  <div class="user-card">
  <img id="photo-current-user" class="photo-current-user" src="">
  <h2 id="name-current-user"></h2>
  <span id="uid-current-user"></span>
  <p id="mail-current-user" class="mail-user"></p>
</div>
<div class="container-post-form">
  <form class="display-flex box-form-user active-publicar">
      <textarea class="input-form-user"  id="content-to-post" placeholder="¿Tienes algo que contarnos?"></textarea>
       <img class="img-to-post" id="img-to-post" src="">
       <input id="btn-upload-img" type="file" name="img-post-new" accept="image/png, image/jpeg" class="btn btn-curve btn-icon icon-img">
          <button class="btn btn-form-user icon-text">
          <span class="btn-icon icon-privacidad"></span>Publico
          <span class="icon-arrow icon-arrow-bottom" id="arrow-bajo"></span>
          </button>
          <button class="btn btn-form-user btn-publicar" id="btn-create-post">Publicar</button>
  </form>  
  <div class="container-posts" id="container-posts"></div>
</div>`;
  const containerSocialNetworkViewElem = document.createElement('section');
  containerSocialNetworkViewElem.setAttribute('id', 'container-net');
  containerSocialNetworkViewElem.setAttribute('class', 'container-net display-flex');
  containerSocialNetworkViewElem.innerHTML += socialNetworkView;

  setTimeout(() => {
    const btnUploadImg = document.getElementById('btn-upload-img');
    const imgToPost = document.getElementById('img-to-post');
    const photoCurrentUser = document.getElementById('photo-current-user');
    const nameCurrentUser = document.getElementById('name-current-user');
    const uidCurrentUser = document.getElementById('uid-current-user');
    const mailCurrentUser = document.getElementById('mail-current-user');
    const contentToPost = document.getElementById('content-to-post');
    const btnCreatePost = document.getElementById('btn-create-post');
    const containerPosts = document.getElementById('container-posts');
    // const menuPuntos = containerSocialNetworkViewElem.querySelector('.icon-menu-puntos');
    // console.log(menuPuntos);


    const showPosts = (data) => {
      containerPosts.innerHTML = '';
      data.forEach((post) => {
        console.log('Fecha', post.publicationDate);
        const currentDate = new Date(post.publicationDate);
        const date = currentDate.getDate();
        const month = currentDate.getMonth(); // Be careful! January is 0 not 1
        const year = currentDate.getFullYear();
        const dateString = `${date}-${month + 1}-${year}`;
        containerPosts.innerHTML += templatePost(
          post.imgUrlUser,
          post.nameUser,
          post.content,
          post.imgUrlPost,
          dateString,
          post.totalLike,
        );
      });
    };

    const actualizarPost = () => {
      checkAllPost()
        .then((querySnapshot) => {
          const arr = [];
          querySnapshot.forEach((post) => {
            const obj = {
              nameUser: post.data().nameUser,
              uidUser: post.data().uidUser,
              imgUrlUser: post.data().imgUrlUser === null ? 'img/photo-default.png' : post.data().imgUrlUser,
              typePrivacy: post.data().typePrivacy,
              content: post.data().content,
              totalLike: post.data().totalLike,
              imgUrlPost: post.data().imgUrlPost === null ? '' : post.data().imgUrlPost,
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
    const clearFormPost = () => {
      contentToPost.value = '';
      imgToPost.setAttribute('src', '');
    };

    btnCreatePost.addEventListener('click', (e) => {
      e.preventDefault();
      const user = firebase.auth().currentUser;
      if (user) {
        createPost(user.uid, user.displayName, user.photoURL, contentToPost.value, 0)
          .then(() => {
            // console.log(refDof.id);
            actualizarPost();
            clearFormPost();
            sessionStorage.clear();
          })
          .catch(error => console.log(error));
      }
    });

    btnUploadImg.addEventListener('change', (e) => {
      const imgFile = e.target.files[0];
      const user = firebase.auth().currentUser;
      uploadImgPost(imgFile, user.uid, imgToPost);
    });
    // Limpiar Form


    // firebase.auth().onAuthStateChanged(user => console.log(user));
    const user = firebase.auth().currentUser;
     if (user) {
        photoCurrentUser.setAttribute('src', user.photoURL === null ? 'img/photo-default.png' : user.photoURL);
        nameCurrentUser.textContent = user.displayName;
        uidCurrentUser.textContent = user.uid;
        mailCurrentUser.textContent = user.email;
     }
  

    actualizarPost();
  }, 700);
  return containerSocialNetworkViewElem;
};
