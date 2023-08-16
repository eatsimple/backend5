import supertest from 'supertest';
import app from '..'; // Ubah dengan path yang sesuai ke file entry point Anda

// ## describe untuk GET ALL USERS
describe('Testing endpoints for transaksi', () => {
  describe('should get all transaksi', () => {
    it('responds with json', async () => {
      const response = await supertest(app).get('/transaksi').set('Accept', 'application/json');
      expect(response.status).toBe(200);
    });
  });

  // ## describe untuk GET USERS BY ID
  describe('GET /transaksi/:id', () => {
    it('should get user by ID', async () => {
      const Id = '9e12a242-ba5b-4f0d-80e0-c9f668af5b06'; // ID pengguna yang ingin Anda uji

      const response = await supertest(app).get(`/transaksi/${Id}`);
      expect(response.status).toBe(200);
      // expect(response.body.id).toBe(userId)
      // ... tambahkan asserstion lainnya sesuai kebutuhan
    });

    it('should return 404 if user is not found', async () => {
      const nonExistingUserId = 'fjakj8324242'; // ID pengguna yang tidak ada

      const response = await supertest(app).get(`/transaksi/${nonExistingUserId}`);

      expect(response.status).toBe(404);
      // expect(response.body.message).toBe('pengguna tidak ditemukan');
      // ... tambahkan asserstion lainnya sesuai kebutuhan
    });
  });

  // ## describe untuk CREATE USER
  //   describe('POST /transaksi', () => {
  //     it('should create a new transaksi', async () => {
  //       //
  //       //
  //       const newPembeli = {
  //         nama: 'John Doe',
  //         email: 'johndoe@example.com',
  //         password: 'password',
  //         confirm: 'password',
  //         role: 'user',
  //       };

  //       const response = await supertest(app).post('/transaksi').send(newPembeli);
  //       expect(response.status).toBe(201);
  //       expect(response.body.msg).toBe('produk has been created');
  //     });
  //   });

  //   // describe untuk UPDATE USER
  //   describe('PUT /sales/:id', () => {
  //     it('should update an existing transaksi', async () => {
  //       const Id = '3101ac92-5160-4cce-9039-7f31076225ee';
  //       const updatedPembeli = {
  //         nama: 'John Doe',
  //         email: 'johndoe@example.com',
  //         password: 'newpassword',
  //         role: 'admin',
  //       };

  //       const response = await supertest(app).patch(`/transaksi/${Id}`).send(updatedPembeli);

  //       expect(response.status).toBe(200);
  //       expect(response.body.msg).toBe('transaksi has been updated');

  //       // ... tambahkan asserstion lainnya sesuai kebutuhan
  //     });

  //     it('should return 404 if user is not found', async () => {
  //       const nonExistingPembeliId = 'non-existing-id';
  //       const updatedPembeli = {
  //         name: 'Updated Name',
  //         email: 'updatedemail@example.com',
  //       };

  //       const response = await supertest(app).put(`/transaksi/${nonExistingPembeliId}`).send(updatedPembeli);

  //       expect(response.status).toBe(404);
  //       // ... tambahkan asserstion lainnya sesuai kebutuhan
  //     });
  //   });

  // ## describe untuk DELETE USER
  // describe('DELETE /sales/:id', () => {
  //   it('should delete an existing transaksi', async () => {
  //     const Id = '66bb2d3e-d39e-4edb-b485-74f5ef5a8c85';
  //     const response = await supertest(app).delete(`/transaksi/${Id}`);

  //     expect(response.status).toBe(200);
  //     expect(response.body.msg).toBe('purchasing has been deleted');
  //     // ... tambahkan asserstion lainnya sesuai kebutuhan
  //   });

  //   it('should return 404 if transaksi is not found', async () => {
  //     const nonExistingPembeliId = 'jfaijd88284299u8f';

  //     const response = await supertest(app).delete(`/transaksi/${nonExistingPembeliId}`);

  //     expect(response.status).toBe(200);
  //     // ... tambahkan asserstion lainnya sesuai kebutuhan
  //   });
  // });
});
