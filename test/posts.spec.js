import MockFirebase from 'mock-cloud-firestore';
import {
  createPost, checkAllPost, deletePost, updatePost,
} from '../src/lib/post.js';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        wRVc7tQMgagDSGDclX: {
          uidUser: 'ARjE2LM9CwQfyWG08UkoTmj50fG2',
          nameUser: 'Marian Zapata',
          imgUrlUser: 'https://www.img.com/img.jpg',
          typePrivacy: '0',
          content: 'Package Software into Standardized Units for Development, Shipment and Deployment',
          totalLike: 0,
          imgUrlPost: 'https://www.img.com/img.jpg',
          publicationDate: '3 de septiembre de 2019, 12:13:48 UTC-5',
        },
        pRVc7tQMgagDSGDcly: {
          uidUser: 'uLM9CwQfyWG08UkoTmj50fG2',
          nameUser: 'Ana Zapata',
          imgUrlUser: 'https://www.img.com/img.jpg',
          typePrivacy: '0',
          content: 'Package Software into Standardized Units for Development, Shipment and Deployment',
          totalLike: 0,
          imgUrlPost: 'https://www.img.com/img.jpg',
          publicationDate: '4 de septiembre de 2019, 12:13:48 UTC-5',
        },
      },
    },
  },
};
global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('createPost', () => {
  it('Debería agregar un post', done => createPost('ETYLM9CwQfyWG08UkoTmj50fG2', 'Jose Zapata',
    'https://www.img.com/img.jpg', '0',
    'Package Software into Standardized Units for Development, Shipment and Deployment',
    0, 'https://www.img.com/img.jpg', '3 de septiembre de 2019, 12:13:48 UTC-5')
    .then(() => checkAllPost(
      (data) => {
        const result = data.find(post => post.nameUser === 'Jose Zapata');
        expect(result.nameUser).toBe('Jose Zapata');
        done();
      },
    )));
});
it('Debería poder eliminar el post', done => deletePost('pRVc7tQMgagDSGDcly')
  .then(() => checkAllPost(
    (data) => {
      const result = data.find(post => post.id === 'pRVc7tQMgagDSGDcly');
      expect(result).toBe(undefined);
      done();
    },
  )));
it('Debería poder actualizar el post', done => updatePost('wRVc7tQMgagDSGDclX',
  'Texto modificado', '', '1')
  .then(() => checkAllPost(
    (data) => {
      const result = data.find(post => post.idPost === 'wRVc7tQMgagDSGDclX');
      expect(result.content).toBe('Texto modificado');
      done();
    },
  )));
