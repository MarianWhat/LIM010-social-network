import { autEmailPass, crearCuentaEmailPass, checkUser } from '../src/lib/autenticacion.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  () => null,
  () => mockauth,
  () => mockfirestore,
);

describe('crearCuentaEmailPass', () => {
  it('Debería poder iniciar sesion', () => crearCuentaEmailPass('marian@zapata.com', '123456')
    .then((user) => {
      expect(user.email).toBe('marian@zapata.com');
    }));
});
describe('autEmailPass', () => {
  it('Debería poder iniciar sesion', () => autEmailPass('ana@zapata.com', '123456')
    .then((user) => {
      expect(user.email).toBe('ana@zapata.com');
    }));
});

describe('checkUser', () => {
  it('Debería poder iniciar sesion', (done) => {
    checkUser(
      (data) => {
        expect(data.email).toBe('ana@zapata.com');
        done();
      },
    );
    autEmailPass('ana@zapata.com', '123456');
  });
});
