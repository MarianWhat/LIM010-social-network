export const autEmailPass = (email, password) => firebase.auth()
  .signInWithEmailAndPassword(email, password);

export const crearCuentaEmailPass = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password);

// firebase.auth().signOut() Es para cerrar la secion del usuario
export const authCuentaGoogle = () => firebase.auth()
  .signInWithPopup(new firebase.auth.GoogleAuthProvider());
