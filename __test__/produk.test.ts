import supertest from 'supertest';
import app from '..'; // Ubah dengan path yang sesuai ke file entry point Anda

// ## describe untuk GET ALL USERS
describe('Testing endpoints for produk', () => {
  describe('should get all produk', () => {
    it('responds with json', async () => {
      const response = await supertest(app).get('/produk').set('Accept', 'application/json');
      expect(response.status).toBe(200);
    });
  });

  // ## describe untuk GET USERS BY ID
  describe('GET /produk/:id', () => {
    it('should get user by ID', async () => {
      const Id = 'a1721a6a-934d-465f-a04b-a60fe83155a3'; // ID pengguna yang ingin Anda uji

      const response = await supertest(app).get(`/produk/${Id}`);
      expect(response.status).toBe(200);
      // expect(response.body.id).toBe(userId)
      // ... tambahkan asserstion lainnya sesuai kebutuhan
    });

    it('should return 404 if user is not found', async () => {
      const nonExistingUserId = 'fjakj8324242'; // ID pengguna yang tidak ada

      const response = await supertest(app).get(`/produk/${nonExistingUserId}`);

      expect(response.status).toBe(404);
      // expect(response.body.message).toBe('pengguna tidak ditemukan');
      // ... tambahkan asserstion lainnya sesuai kebutuhan
    });
  });

  // ## describe untuk CREATE USER
  //   describe('POST /produk', () => {
  //     it('should create a new produk', async () => {
  //       //
  //       //
  //       const newPembeli = {
  //         nama: 'John Doe',
  //         email: 'johndoe@example.com',
  //         password: 'password',
  //         confirm: 'password',
  //         role: 'user',
  //       };

  //       const response = await supertest(app).post('/produk').send(newPembeli);
  //       expect(response.status).toBe(201);
  //       expect(response.body.msg).toBe('produk has been created');
  //     });
  //   });

  //   // describe untuk UPDATE USER
  //   describe('PUT /produk/:id', () => {
  //     it('should update an existing produk', async () => {
  //       const Id = '3101ac92-5160-4cce-9039-7f31076225ee';
  //       const updatedPembeli = {
  //         nama: 'John Doe',
  //         email: 'johndoe@example.com',
  //         password: 'newpassword',
  //         role: 'admin',
  //       };

  //       const response = await supertest(app).patch(`/produk/${Id}`).send(updatedPembeli);

  //       expect(response.status).toBe(200);
  //       expect(response.body.msg).toBe('produk has been updated');

  //       // ... tambahkan asserstion lainnya sesuai kebutuhan
  //     });

  //     it('should return 404 if user is not found', async () => {
  //       const nonExistingPembeliId = 'non-existing-id';
  //       const updatedPembeli = {
  //         name: 'Updated Name',
  //         email: 'updatedemail@example.com',
  //       };

  //       const response = await supertest(app).put(`/produk/${nonExistingPembeliId}`).send(updatedPembeli);

  //       expect(response.status).toBe(404);
  //       // ... tambahkan asserstion lainnya sesuai kebutuhan
  //     });
  //   });

  // ## describe untuk DELETE USER
  // describe('DELETE /produk/:id', () => {
  //   it('should delete an existing produk', async () => {
  //     const Id = '66bb2d3e-d39e-4edb-b485-74f5ef5a8c85';
  //     const response = await supertest(app).delete(`/produk/${Id}`);

  //     expect(response.status).toBe(200);
  //     expect(response.body.msg).toBe('produk has been deleted');
  //     // ... tambahkan asserstion lainnya sesuai kebutuhan
  //   });

  //   it('should return 404 if produk is not found', async () => {
  //     const nonExistingPembeliId = 'jfaijd88284299u8f';

  //     const response = await supertest(app).delete(`/produk/${nonExistingPembeliId}`);

  //     expect(response.status).toBe(200);
  //     // ... tambahkan asserstion lainnya sesuai kebutuhan
  //   });
  // });
});
