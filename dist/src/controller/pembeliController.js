"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prismaClient"));
// Mendapatkan daftar semua pengguna
const getAllPembeliController = async (req, res) => {
    try {
        const pembeli = await prismaClient_1.default.pembeli.findMany();
        res.status(200).json(pembeli);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
};
// Mendapatkan pengguna berdasarkan ID
const getPembeliIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const pembeli = await prismaClient_1.default.pembeli.findUnique({ where: { id: id } });
        if (!pembeli)
            res.status(404).json({ error: 'Pembeli tidak ditemukan' });
        res.status(200).json(pembeli);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
};
// Membuat pengguna baru
const createPembeliController = async (req, res) => {
    const { nama, email, noTelp, alamat } = req.body;
    try {
        await prismaClient_1.default.pembeli.create({
            data: {
                nama: nama,
                email: email,
                noTelp: noTelp,
                alamat: alamat,
            },
        });
        res.status(201).json({ msg: 'pengguna has been created' });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
};
// Memperbarui pengguna berdasarkan ID
const updatePembeliController = async (req, res) => {
    const { id } = req.params;
    const { nama, email, noTelp, alamat } = req.body;
    try {
        await prismaClient_1.default.pembeli.update({ where: { id: id }, data: { nama, email, noTelp, alamat } });
        res.status(200).json({ msg: 'pengguna has been updated' });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
};
// Menghapus pengguna berdasarkan ID
const deletePembeliController = async (req, res) => {
    const { id } = req.params;
    try {
        await prismaClient_1.default.pembeli.delete({ where: { id: id } });
        res.status(200).json({ message: 'Pengguna berhasil dihapus' });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
};
exports.default = { getAllPembeliController, getPembeliIdController, createPembeliController, updatePembeliController, deletePembeliController };
