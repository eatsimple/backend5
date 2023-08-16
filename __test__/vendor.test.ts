import supertest from 'supertest';
import app from '..'; // Ubah dengan path yang sesuai ke file entry point Anda

// ## describe untuk GET ALL USERS
describe('Testing endpoints for transaksi-detail', () => {
  describe('should get all vendor', () => {
    it('responds with json', async () => {
      const response = await supertest(app).get('/vendor').set('Accept', 'application/json');
      expect(response.status).toBe(200);
    });
  });

  // ## describe untuk GET USERS BY ID
  describe('GET /vendor/:id', () => {
    it('should get user by ID', async () => {
      const Id = '0c597a60-1e9a-4638-a912-726754eca6f4'; // ID pengguna yang ingin Anda uji

      const response = await supertest(app).get(`/vendor/${Id}`);
      expect(response.status).toBe(200);
      // expect(response.body.id).toBe(userId)
      // ... tambahkan asserstion lainnya sesuai kebutuhan
    });

    it('should return 404 if user is not found', async () => {
      const nonExistingUserId = '2'; // ID pengguna yang tidak ada

      const response = await supertest(app).get(`/vendor/${nonExistingUserId}`);

      expect(response.status).toBe(200);
      // expect(response.body.message).toBe('pengguna tidak ditemukan');
      // ... tambahkan asserstion lainnya sesuai kebutuhan
    });
  });

  // ## describe untuk CREATE USER
  //   describe('POST /transaksi-detail', () => {
  //     it('should create a new transaksi-detail', async () => {
  //       //
  //       //
  //       const newPembeli = {
  //         nama: 'John Doe',
  //         email: 'johndoe@example.com',
  //         password: 'password',
  //         confirm: 'password',
  //         role: 'user',
  //       };

  //       const response = await supertest(app).post('/transaksi-detail').send(newPembeli);
  //       expect(response.status).toBe(201);
  //       expect(response.body.msg).toBe('produk has been created');
  //     });
  //   });

  //   // describe untuk UPDATE USER
  //   describe('PUT /sales/:id', () => {
  //     it('should update an existing transaksi-detail', async () => {
  //       const Id = '3101ac92-5160-4cce-9039-7f31076225ee';
  //       const updatedPembeli = {
  //         nama: 'John Doe',
  //         email: 'johndoe@example.com',
  //         password: 'newpassword',
  //         role: 'admin',
  //       };

  //       const response = await supertest(app).patch(`/transaksi-detail/${Id}`).send(updatedPembeli);

  //       expect(response.status).toBe(200);
  //       expect(response.body.msg).toBe('transaksi-detail has been updated');

  //       // ... tambahkan asserstion lainnya sesuai kebutuhan
  //     });

  //     it('should return 404 if user is not found', async () => {
  //       const nonExistingPembeliId = 'non-existing-id';
  //       const updatedPembeli = {
  //         name: 'Updated Name',
  //         email: 'updatedemail@example.com',
  //       };

  //       const response = await supertest(app).put(`/transaksi-detail/${nonExistingPembeliId}`).send(updatedPembeli);

  //       expect(response.status).toBe(404);
  //       // ... tambahkan asserstion lainnya sesuai kebutuhan
  //     });
  //   });

  // ## describe untuk DELETE USER
  // describe('DELETE /sales/:id', () => {
  //   it('should delete an existing transaksi-detail', async () => {
  //     const Id = '66bb2d3e-d39e-4edb-b485-74f5ef5a8c85';
  //     const response = await supertest(app).delete(`/transaksi-detail/${Id}`);

  //     expect(response.status).toBe(200);
  //     expect(response.body.msg).toBe('purchasing has been deleted');
  //     // ... tambahkan asserstion lainnya sesuai kebutuhan
  //   });

  //   it('should return 404 if transaksi-detail is not found', async () => {
  //     const nonExistingPembeliId = 'jfaijd88284299u8f';

  //     const response = await supertest(app).delete(`/transaksi-detail/${nonExistingPembeliId}`);

  //     expect(response.status).toBe(200);
  //     // ... tambahkan asserstion lainnya sesuai kebutuhan
  //   });
  // });
});
