export const autEmailPass = (email, password, msInfoAlerta, iconPassword) => {
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((resultXD) => {
      const usuarioAct = resultXD.user.displayName;
      alert('Bienvenid@ ' + usuarioAct + ', has ingresado con exito.'); 
    })
    .catch((error) => { // Para ver si devuelve un error
      console.log(error);
      if (error.code === 'auth/user-not-found') {
        console.log('No hay usuario registrado ccon ese correo.');
      }
      if (error.code === 'auth/wrong-password') {
        // Por aqui voy, no esta como deberia, simplemente estaba probante que funcione.
        // Creo que hare una funcion para eso. Eso = Las alerta
        password.value = '';
        password.classList.add('info-alert');
        msInfoAlerta.innerHTML= '**La contraseña no es válida, verifica e intente de nuevo.';
        iconPassword.classList.add('icon-alert');
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
    })
    .then((user) => {
      if (user != null) {
        setTimeout(() => {
          console.log(`Sign-in provider: ${  user.providerId}`);
          console.log(`  Provider-specific UID: ${  user.uid}`);
          console.log(`  Name: ${  user.displayName}`);
          console.log(`  Email: ${  user.email}`);
          console.log(`  Photo URL: ${  user.photoURL}`);
        }, 400);
      }
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
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    console.log(user.displayName);
  } else {
    // No user is signed in.
  }
});
