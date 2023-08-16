"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const __1 = __importDefault(require("..")); // Ubah dengan path yang sesuai ke file entry point Anda
// ## describe untuk GET ALL USERS
describe('Testing endpoints for user', () => {
    describe('should get all users', () => {
        it('responds with json', async () => {
            const response = await (0, supertest_1.default)(__1.default).get('/pengguna').set('Accept', 'application/json');
            expect(response.status).toBe(200);
        });
    });
    // ## describe untuk GET USERS BY ID
    describe('GET /users/:id', () => {
        it('should get user by ID', async () => {
            const Id = '3101ac92-5160-4cce-9039-7f31076225ee'; // ID pengguna yang ingin Anda uji
            const response = await (0, supertest_1.default)(__1.default).get(`/pengguna/${Id}`);
            expect(response.status).toBe(200);
            // expect(response.body.id).toBe(userId)
            // ... tambahkan asserstion lainnya sesuai kebutuhan
        });
        it('should return 404 if user is not found', async () => {
            const nonExistingUserId = 'fjakj8324242'; // ID pengguna yang tidak ada
            const response = await (0, supertest_1.default)(__1.default).get(`/pengguna/${nonExistingUserId}`);
            expect(response.status).toBe(404);
            // expect(response.body.message).toBe('pengguna tidak ditemukan');
            // ... tambahkan asserstion lainnya sesuai kebutuhan
        });
    });
    // ## describe untuk CREATE USER
    describe('POST /users', () => {
        it('should create a new user', async () => {
            //
            //
            const newUser = {
                nama: 'John Doe',
                email: 'johndoe@example.com',
                password: 'password',
                confirm: 'password',
                role: 'user',
            };
            const response = await (0, supertest_1.default)(__1.default).post('/pengguna').send(newUser);
            expect(response.status).toBe(201);
            expect(response.body.msg).toBe('pengguna has been created');
        });
    });
    // describe untuk UPDATE USER
    describe('PUT /pengguna/:id', () => {
        it('should update an existing user', async () => {
            const Id = '3101ac92-5160-4cce-9039-7f31076225ee';
            const updatedUser = {
                nama: 'John Doe',
                email: 'johndoe@example.com',
                password: 'newpassword',
                role: 'admin',
            };
            const response = await (0, supertest_1.default)(__1.default).patch(`/pengguna/${Id}`).send(updatedUser);
            expect(response.status).toBe(200);
            expect(response.body.msg).toBe('pengguna has been updated');
            // ... tambahkan asserstion lainnya sesuai kebutuhan
        });
        it('should return 404 if user is not found', async () => {
            const nonExistingUserId = 'non-existing-id';
            const updatedUser = {
                name: 'Updated Name',
                email: 'updatedemail@example.com',
            };
            const response = await (0, supertest_1.default)(__1.default).put(`/pengguna/${nonExistingUserId}`).send(updatedUser);
            expect(response.status).toBe(404);
            // ... tambahkan asserstion lainnya sesuai kebutuhan
        });
    });
    // ## describe untuk DELETE USER
    // describe('DELETE /pengguna/:id', () => {
    //   it('should delete an existing user', async () => {
    //     const Id = '66bb2d3e-d39e-4edb-b485-74f5ef5a8c85';
    //     const response = await supertest(app).delete(`/pengguna/${Id}`);
    //     expect(response.status).toBe(200);
    //     expect(response.body.msg).toBe('pengguna has been deleted');
    //     // ... tambahkan asserstion lainnya sesuai kebutuhan
    //   });
    //   it('should return 404 if user is not found', async () => {
    //     const nonExistingUserId = 'jfaijd88284299u8f';
    //     const response = await supertest(app).delete(`/pengguna/${nonExistingUserId}`);
    //     expect(response.status).toBe(200);
    //     // ... tambahkan asserstion lainnya sesuai kebutuhan
    //   });
    // });
});
