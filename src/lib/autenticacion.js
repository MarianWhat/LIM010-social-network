export const autEmailPass = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((resultXD) => {
      console.log('Accedio');
      console.log(resultXD.user.displayName);
    })
    .catch((error) => { // Para ver si devuelve un error
      console.log(error);
      if (error.code === 'auth/user-not-found') {
        console.log('No hay usuario registrado ccon ese correo.');
      }
      if (error.code === 'auth/wrong-password') {
        console.log('La contraseña no es válida');
      }
    });
};
export const crearCuentaEmailPass = (email, password, nombres) => {
  firebase
    .auth() // método createUserWithEmailAndPassword
    .createUserWithEmailAndPassword(email, password)
    .then((resultXD) => {
      resultXD.user.updateProfile({ // Para actualizar
        displayName: nombres, // No podemos guardatos, solo podemos guardar una URL Img, nombre
        // photoURL
      });
    })
    .then(() => {
      console.log('Registrada');
      return firebase.auth().currentUser;
      // console.log(firebase.auth().currentUser);
    })
    .then((user) => {
      setTimeout(() => {
        console.log(user.displayName);
      }, 200);
    })
    .catch((error) => { // Para ver si devuelve un error
      console.log(error);
      if (error.code === 'auth/invalid-email') {
        console.log('Formato de correo incorrecto');
      } else {
        console.log('Es otra cosa.');
      }
    });
  // firebase.auth().signOut() Es para cerrar la secion del usuario
};
export const authCuentaGoogle = () => {
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((respuestaXD) => {
      const infoUser = respuestaXD.user;
      console.log(infoUser.displayName, infoUser.email, infoUser.photoURL, infoUser.uid);
    })
    .catch((error) => { // Para ver si devuelve un error
      console.log(error);
    });
}