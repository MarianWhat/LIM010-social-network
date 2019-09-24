export const createPost = (uidUser, nameUser,
  imgUrlUser, content, imgUrlPost, typePrivacy, publicationDate) => firebase.firestore()
  .collection('posts')
  .add({
    uidUser,
    nameUser,
    imgUrlUser,
    typePrivacy,
    content,
    like: [],
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
        imgUrlUser: post.data().imgUrlUser,
        typePrivacy: post.data().typePrivacy,
        content: post.data().content,
        like: post.data().like,
        imgUrlPost: post.data().imgUrlPost,
        publicationDate: post.data().publicationDate,
      };
      arr.push(obj);
    });
    callback(arr);
  });
export const updatePostLike = (idPost, like) => firebase.firestore().collection('posts').doc(idPost)
  .update({
    like,
  });

export const updatePost = (idPost, contentToPostUpdate, imgToPostUpdate, PrivacyUpdate) => firebase.firestore().collection('posts').doc(idPost)
  .update({
    typePrivacy: PrivacyUpdate,
    content: contentToPostUpdate,
    imgUrlPost: imgToPostUpdate,
    // imgUrlPost: s === null ? post.data().imgUrlUser : ,
  });

export const uploadImgPost = (imgFile, uidUser, callback, btn) => {
  if (imgFile) {
    const upload = firebase.storage().ref(`imagenes-posts/${uidUser}/${imgFile.name}`)
      .put(imgFile);
    callback(upload, btn);
  }
};

export const deletePost = post => firebase.firestore().collection('posts').doc(post).delete();
