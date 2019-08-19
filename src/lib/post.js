export const createPost = (uidUser, nameUser, imgUrlUser, content, typePrivacy) => {
  const newPost = firebase.firestore()
    .collection('posts')
    .add({
      uidUser,
      nameUser,
      imgUrlUser,
      typePrivacy,
      content,
      totalLike: 0,
      imgUrlPost: sessionStorage.getItem('urlImgToPost') === null ? 'img/photo-default.png' : sessionStorage.getItem('urlImgToPost'),
      publicationDate: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(refDof => console.log(refDof.id))
    .catch(error => console.log(error));
  return newPost;
};

export const uploadImg = (imgFile, uidUser, imgToPost) => {
  const refStorage = firebase.storage().ref(`imagenes-posts/${uidUser}/${imgFile.name}`); // Se crea la referencia del archivo, si no existen las carpetas las creara XD
  const upload = refStorage.put(imgFile); // Lo sube
  upload.on('state_changed', infoUpload => console.log(infoUpload),
    error => console.log(error),
    () => {
      upload.snapshot.ref.getDownloadURL()
        .then((url) => {
          sessionStorage.setItem('urlImgToPost', url);
          imgToPost.setAttribute('src', sessionStorage.getItem('urlImgToPost'));

          return url; //  Url a usar XD
        })
        .catch(error => console.log(error));
    });
};
export const checkAllPost = () => {
  const newArray = [];
  firebase.firestore().collection('posts')
    .where('typePrivacy', '==', 0).onSnapshot((querySnapshot) => { // .onSnapshot() este metodo nos informa cualquier cambio en la coleccion.
      querySnapshot.forEach((post) => {
        const obj = {
          nameUser: post.data().nameUser,
          uidUser: post.data().uidUser,
          imgUrlUser: post.data().imgUrlUser,
          typePrivacy: post.data().typePrivacy,
          content: post.data().content,
          totalLike: post.data().totalLike,
          imgUrlPost: post.data().imgUrlPost,
        };
        newArray.push(obj);
      });
    });
  return newArray;
};
export const checkUserPost = (currentUserAct) => {
  firebase.firestore().collection('posts')
    .where('uidUser', '==', currentUserAct).onSnapshot((querySnapshot) => { // .onSnapshot() este metodo nos informa cualquier cambio en la coleccion.
      const newArray = [];
      querySnapshot.forEach((post) => {
        const obj = {
          nameUser: post.data().nameUser,
          uidUser: post.data().uidUser,
          imgUrlUser: post.data().imgUrlUser,
          typePrivacy: post.data().typePrivacy,
          content: post.data().content,
          totalLike: post.data().totalLike,
          imgUrlPost: post.data().imgUrlPost,
        };
        newArray.push(obj);
      });
      // return newArray;
      console.log(newArray);
    });
};
