import { changeView } from './lib/controler/change-view.js';

const init = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyCw3AYjSbsAeJ0dZsEAe_tocFzZk1rrr_o',
    authDomain: 'prueba-51039.firebaseapp.com',
    databaseURL: 'https://prueba-51039.firebaseio.com',
    projectId: 'prueba-51039',
    storageBucket: 'prueba-51039.appspot.com',
    messagingSenderId: '552919889245',
    appId: '1:552919889245:web:df9179f3406b85ac',
  };
  firebase.initializeApp(firebaseConfig);
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => {
    changeView(window.location.hash);
  });
};

window.addEventListener('load', init);
