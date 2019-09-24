export const autEmailPass = (email, password) => firebase.auth()
  .signInWithEmailAndPassword(email, password);

export const crearCuentaEmailPass = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password);

export const authCuentaGoogle = () => firebase.auth()
  .signInWithPopup(new firebase.auth.GoogleAuthProvider());

// Falta testear
export const checkUser = callback => firebase.auth()
  .onAuthStateChanged(user => (user ? callback(user) : callback(null)));


// firebase.auth().signOut()
