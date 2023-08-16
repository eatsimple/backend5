"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prismaClient"));
// Mendapatkan daftar semua pengguna
const getAllSalesController = async (req, res) => {
    try {
        const sales = await prismaClient_1.default.sales.findMany();
        res.status(200).json(sales);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
};
// Mendapatkan pengguna berdasarkan ID
const getSalesIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const sales = await prismaClient_1.default.sales.findUnique({ where: { id: id } });
        if (!sales)
            res.status(404).json({ error: 'sales tidak ditemukan' });
        res.status(200).json(sales);
    }
    catch (error) {
        res.status(404);
        console.log(error.message);
    }
};
// Membuat pengguna baru
const createSalesController = async (req, res) => {
    const { nama, email, noTelp, alamat } = req.body;
    try {
        await prismaClient_1.default.sales.create({
            data: {
                nama: nama,
                email: email,
                noTelp: noTelp,
                alamat: alamat,
            },
        });
        res.status(201).json({ msg: 'sales has been created' });
    }
    catch (error) {
        res.status(404);
        console.log(error.message);
    }
};
// Memperbarui pengguna berdasarkan ID
const updateSalesController = async (req, res) => {
    const { id } = req.params;
    const { nama, email, noTelp, alamat } = req.body;
    try {
        await prismaClient_1.default.sales.update({ where: { id: id }, data: { nama, email, noTelp, alamat } });
        res.status(200).json({ msg: 'sales has been updated' });
    }
    catch (error) {
        res.status(404);
        console.log(error.message);
    }
};
// Menghapus pengguna berdasarkan ID
const deleteSalesController = async (req, res) => {
    const { id } = req.params;
    try {
        await prismaClient_1.default.sales.delete({ where: { id: id } });
        res.status(200).json({ message: 'sales berhasil dihapus' });
    }
    catch (error) {
        res.status(404);
        console.log(error.message);
    }
};
exports.default = { getAllSalesController, getSalesIdController, createSalesController, updateSalesController, deleteSalesController };
