import supertest from 'supertest';
import app from '..';

describe('test for auth login-logout', () => {
  // ## LOGIN test
  describe('for login test, POST to /login ', () => {
    it('should be login', async () => {
      const req = {
        email: 'zulham@gmail.com',
        password: '12345',
      };

      const response = await supertest(app).post('/login').send(req);
      expect(response.status).toBe(200);
    });

    // ## fail Login
    it('should be fail to login', async () => {
      const req = {
        email: 'failLogin@gmail.com',
        password: '12345',
      };

      const response = await supertest(app).post('/login').send(req);
      expect(response.status).toBe(400);
    });
  });

  // ## LOGOUT test
  describe('for logout test, DELETE to /logout ', () => {
    it('should be logout', async () => {
      const response = await supertest(app).delete(`/logout`);
      expect(response.status).toBe(200);
    });
  });

  // GET ME
  describe('Pengguna API', () => {
    it('should return the current user', async () => {
      // Simulasikan sesi pengguna dengan userId yang valid
      const agent = supertest.agent(app);
      await agent.post('/login').send({ email: 'zulham@gmail.com', password: '12345' });

      // Lakukan permintaan GET untuk mengambil data pengguna saat ini
      const response = await agent.get('/getMe');

      // Verifikasi respons
      expect(response.status).toBe(200);
      expect(response.body.email).toBe('zulham@gmail.com');
    });

    it('should return error if user is not logged in', async () => {
      // Lakukan permintaan GET saat tidak ada sesi pengguna
      const response = await supertest(app).get('/getMe');

      // Verifikasi respons
      expect(response.status).toBe(400);
      expect(response.body.msg).toBe('you are not logged in');
    });

    it('should return error if user is not found', async () => {
      // Simulasikan sesi pengguna dengan userId yang tidak valid
      const agent = supertest.agent(app);
      await agent.post('/login').send({ username: 'invalid', password: 'password' });

      // Lakukan permintaan GET untuk mengambil data pengguna saat ini
      const response = await agent.get('/getMe');

      // Verifikasi respons
      expect(response.status).toBe(400);
      expect(response.body.msg).toBe('you are not logged in');
    });
  });
});
