export const autEmailPass = (email, password, msInfoAlerta, iconPassword, iconMail) => {
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((resultXD) => {
      const usuarioAct = resultXD.user.displayName;
      alert(`Bienvenid@ ${usuarioAct}, has ingresado con exito.`);
    })
    .catch((error) => { // Para ver si devuelve un error
      switch (error.code) {
        case 'auth/invalid-email':
            password.classList.remove('info-alert');
            iconPassword.classList.remove('icon-alert');

          email.classList.add('info-alert');
          iconMail.classList.add('icon-alert');

          msInfoAlerta.innerHTML = '**El formato del correo ingresado no es valido, verifica e intente de nuevo.';
          break;
        case 'auth/user-not-found':
            password.classList.remove('info-alert');
          iconPassword.classList.remove('icon-alert');

          email.classList.add('info-alert');
          iconMail.classList.add('icon-alert');

          msInfoAlerta.innerHTML = '**No hay usuario registrado con ese correo., verifica e intente de nuevo.';
          break;
        case 'auth/wrong-password':
          email.classList.remove('info-alert');
          iconMail.classList.remove('icon-alert');

          password.classList.add('info-alert');
          iconPassword.classList.add('icon-alert');

          msInfoAlerta.innerHTML = '**La contraseña no es válida, verifica e intente de nuevo.';
          break;
        default:
          console.log(error);
          break;
      }
    });
};

export const crearCuentaEmailPass = (email, password, nombres, msInfoAlerta, iconPassword, iconMail) => {
  console.log(password);
  firebase
    .auth() // método createUserWithEmailAndPassword
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((resultXD) => {
      resultXD.user.updateProfile({ // Para actualizar
        displayName: nombres.value, // No podemos guardatos, solo podemos guardar una URL Img, nombre
        // photoURL
      });
    })
    .then(() => {
      const user = firebase.auth().currentUser;
      if (user != null) {
        setTimeout(() => {
          alert(`Bienvenid@ ${user.displayName}, tu registro fue exitoso.`);
          // console.log(`Sign-in provider: ${user.providerId}`);
          // console.log(`  Provider-specific UID: ${user.uid}`);
          // console.log(`  Name: ${user.displayName}`);
          // console.log(`  Email: ${user.email}`);
          // console.log(`  Photo URL: ${user.photoURL}`);
        }, 400);
      }
    })
    .catch((error) => { // Para ver si devuelve un error
      switch (error.code) {
        case 'auth/invalid-email':
          password.classList.remove('info-alert');
          iconPassword.classList.remove('icon-alert');

          email.classList.add('info-alert');
          iconMail.classList.add('icon-alert');

          msInfoAlerta.innerHTML = '**El formato del correo ingresado no es valido, verifica e intente de nuevo.';
          break;
        case 'auth/email-already-in-use':
          password.classList.remove('info-alert');
          iconPassword.classList.remove('icon-alert');
          email.classList.add('info-alert');
          iconMail.classList.add('icon-alert');
          msInfoAlerta.innerHTML = '**El correo electrónico proporcionado esta siendo utilizado por otro miembro., verifica e intente de nuevo.';
          break;
        case 'auth/email-already-exists':
          password.classList.remove('info-alert');
          iconPassword.classList.remove('icon-alert');
          email.classList.add('info-alert');
          iconMail.classList.add('icon-alert');
          msInfoAlerta.innerHTML = '**El correo electrónico proporcionado esta siendo utilizado por otro miembro., verifica e intente de nuevo.';
          break;
        case 'auth/weak-password':
          email.classList.remove('info-alert');
          iconMail.classList.remove('icon-alert');
          password.classList.add('info-alert');
          iconPassword.classList.add('icon-alert');
          msInfoAlerta.innerHTML = '**La contraseña debe tener al menos 6 caracteres.';
          break;
        default:
          console.log(error);
          break;
      }
    });
  // firebase.auth().signOut() Es para cerrar la secion del usuario
};
export const authCuentaGoogle = () => {
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((respuestaXD) => {
      const infoUser = respuestaXD.user;
      alert(`Bienvenid@ ${infoUser.displayName}, has ingresado con exito.`);
      // console.log(infoUser.displayName, infoUser.email, infoUser.photoURL, infoUser.uid);
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

// Falta:
// - Pasar codigo repetitivo a funcion
// - Limpiar input al pisarlo
