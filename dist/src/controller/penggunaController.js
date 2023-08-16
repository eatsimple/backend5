"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prismaClient"));
const argon2_1 = __importDefault(require("argon2"));
// Mendapatkan daftar semua pengguna
const getAllPenggunaController = async (req, res) => {
    try {
        const pengguna = await prismaClient_1.default.pengguna.findMany();
        res.status(200).json(pengguna);
    }
    catch (error) {
        res.status(404).json(error.message);
    }
};
// Mendapatkan pengguna berdasarkan ID
const getPenggunaIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const pengguna = await prismaClient_1.default.pengguna.findUnique({ where: { id: id } });
        if (!pengguna)
            res.status(404).json({ msg: 'Pengguna tidak ditemukan' });
        res.status(200).json(pengguna);
    }
    catch (error) {
        res.status(404).end(error.message);
        console.log(error.message);
    }
};
// Membuat pengguna baru
const createPenggunaController = async (req, res) => {
    const { nama, email, password, confirm, role } = req.body;
    if (password !== confirm)
        return res.status(400).json({ msg: 'password tidak sama' });
    const hash = await argon2_1.default.hash(password);
    try {
        await prismaClient_1.default.pengguna.create({
            data: {
                nama: nama,
                email: email,
                password: hash,
                role: role,
            },
        });
        res.status(201).json({ msg: 'pengguna has been created' });
    }
    catch (error) {
        res.status(404);
        console.log(error.message);
    }
};
// Memperbarui pengguna berdasarkan ID
const updatePenggunaController = async (req, res) => {
    const { id } = req.params;
    const { nama, email, password, role } = req.body;
    try {
        await prismaClient_1.default.pengguna.update({ where: { id: id }, data: { nama, email, password, role } });
        res.status(200).json({ msg: 'pengguna has been updated' });
    }
    catch (error) {
        res.status(404);
        console.log(error.message);
    }
};
// Menghapus pengguna berdasarkan ID
const deletePenggunaController = async (req, res) => {
    const { id } = req.params;
    try {
        await prismaClient_1.default.pengguna.delete({ where: { id: id } });
        res.status(200).json({ message: 'Pengguna berhasil dihapus' });
    }
    catch (error) {
        res.status(404);
        console.log(error.message);
    }
};
exports.default = { getAllPenggunaController, getPenggunaIdController, createPenggunaController, updatePenggunaController, deletePenggunaController };
