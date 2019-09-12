export const createPost = (uidUser, nameUser,
  imgUrlUser, content, imgUrlPost, typePrivacy, publicationDate) => firebase.firestore()
  .collection('posts')
  .add({
    uidUser,
    nameUser,
    imgUrlUser,
    typePrivacy,
    content,
    totalLike: 0,
    imgUrlPost,
    publicationDate,
  });

export const checkAllPost = callback => firebase.firestore().collection('posts')
  .orderBy('publicationDate', 'desc')
  .onSnapshot((query) => {
    const arr = [];
    query.forEach((post) => {
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
    callback(arr);
  });

export const updatePost = (post, contentToPostUpdate, PrivacyUpdate) => {
  post.update({
    typePrivacy: PrivacyUpdate,
    content: contentToPostUpdate,
  // eslint-disable-next-line max-len
  // imgUrlPost: s === null ? post.data().imgUrlUser : ,
  });
};

// Falta acomodar
export const uploadImgPost = (imgFile, uidUser, imgToPost, callaback,
  btnRemoveImg, containerMorePercentage) => {
  if (imgFile) {
    const upload = firebase.storage().ref(`imagenes-posts/${uidUser}/${imgFile.name}`) // Se crea la referencia del archivo, si no existen las carpetas las creara XD
      .put(imgFile);
    upload.on('state_changed',
      (snapshot) => {
        const porc = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        callaback(`Carga ${porc.toFixed(0)}%`);
      },
      // eslint-disable-next-line no-console
      error => console.log('Error subiendo la img:', error),
      () => {
        upload.snapshot.ref.getDownloadURL()
          .then((url) => {
            imgToPost.setAttribute('src', url);
            btnRemoveImg.classList.remove('none');
            containerMorePercentage.classList.add('none');
          })
          // eslint-disable-next-line no-console
          .catch();
      });
  }
};
export const deletePost = post => firebase.firestore().collection('posts').doc(post).delete();
