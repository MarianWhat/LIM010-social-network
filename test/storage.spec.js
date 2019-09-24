import { uploadImgPost } from '../src/lib/post';

global.firebase = {
  storage() {
    return {
      ref(ruta) {
        return {
          put(filename) {
            return `${ruta} - ${filename.name}`;
          },
        };
      },
    };
  },
};

describe('storage', () => {
  it('put imagen', (done) => {
    uploadImgPost({ name: 'imagen.jpg' }, 'user', (result) => {
      expect(result).toBe('imagenes-posts/user/imagen.jpg - imagen.jpg');
      done();
    });
  });
});
