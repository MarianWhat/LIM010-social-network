export const createPost = (uidUser, nameUser,
  imgUrlUser, content, typePrivacy) => firebase.firestore()
  .collection('posts')
  .add({
    uidUser,
    nameUser,
    imgUrlUser: imgUrlUser === null ? 'img/photo-default.png' : imgUrlUser,
    typePrivacy,
    content,
    totalLike: 0,
    imgUrlPost: sessionStorage.getItem('urlImgToPost') === null ? '' : sessionStorage.getItem('urlImgToPost'),
    publicationDate: new Date(),
  });
  // publicationDate: firebase.firestore.FieldValue.serverTimestamp()

export const checkAllPost = () => firebase.firestore().collection('posts')
  .orderBy('publicationDate', 'desc')
  .get();

export const updatePost = post => post.update({
  typePrivacy: '1',
  content: 'Actualizado Hey',
  // imgUrlPost: sessionStorage.getItem('urlImgToPost') === null ? post.data().imgUrlUser : sessionStorage.getItem('urlImgToPost'),
});

// export const checkAllPost = () => firebase.firestore().collection('posts').onSnapshot(doc => doc);
export const checkPrivatePost = userActiveUid => firebase.firestore().collection('posts')
  .where('typePrivacy', '==', '1')
  .where('uidUser', '==', userActiveUid)
  .orderBy('publicationDate', 'desc')
  .get();
// Falta acomodar
export const uploadImgPost = (imgFile, uidUser, imgToPost) => {
  if (imgFile) {
    const upload = firebase.storage().ref(`imagenes-posts/${uidUser}/${imgFile.name}`) // Se crea la referencia del archivo, si no existen las carpetas las creara XD
      .put(imgFile); // Lo sube
    upload.on('state_changed',
      (infoUpload) => {
        console.log(infoUpload);
        const porc = infoUpload.bytesTransferred / infoUpload.totalBytes * 100;
        console.log(infoUpload, porc);

        // e3e0nten.setAttribute('style', `alto: ${porc}%`);
      },
      error => console.log('Error subiendo la img:', error),
      () => {
        upload.snapshot.ref.getDownloadURL()
          .then((url) => {
            console.log(url);
            sessionStorage.setItem('urlImgToPost', url); //  Url a usar XD
            imgToPost.setAttribute('src', url);
            // return url;
          })
          .catch(error => console.log(error));
      });
  }
};
export const deletePost = post => firebase.firestore().collection('posts').doc(post).delete();
// .then(() => {
//   console.log("Document successfully deleted!");
// })
// .catch((error) => {
//   console.error("Error removing document: ", error);
// });
