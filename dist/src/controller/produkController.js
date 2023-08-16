"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prismaClient"));
// Mendapatkan daftar semua pengguna
const getAllProdukController = async (req, res) => {
    try {
        const produk = await prismaClient_1.default.produk.findMany({
            include: {
                vendor: true,
            },
        });
        res.status(200).json(produk);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
};
// Mendapatkan pengguna berdasarkan ID
const getProdukIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const produk = await prismaClient_1.default.produk.findUnique({ where: { id: id } });
        if (!produk)
            res.status(404).json({ error: 'Produk tidak ditemukan' });
        res.status(200).json(produk);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
};
// Membuat pengguna baru
const createProdukController = async (req, res) => {
    const { nama, kemasan, deskripsi, harga, namaVendor } = req.body;
    const vdr = await prismaClient_1.default.vendor.findFirst({
        where: {
            nama: {
                contains: namaVendor, // Menggunakan contains untuk mencari kesesuaian substring
            },
        },
        select: {
            id: true,
        },
    });
    if (!vdr)
        return res.status(400).json({ msg: 'vendor tidak ditemukan' });
    try {
        await prismaClient_1.default.produk.create({
            data: {
                nama: nama,
                kemasan: kemasan,
                deskripsi: deskripsi,
                harga: parseInt(harga),
                vendor: {
                    connect: { id: vdr.id },
                },
                // vendorId: vdr.id,
            },
        });
        res.status(201).json({ msg: 'produk has been created' });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
};
// Memperbarui pengguna berdasarkan ID
const updateProdukController = async (req, res) => {
    const { id } = req.params;
    const { nama, kemasan, deskripsi, harga, namaVendor } = req.body;
    const vdr = await prismaClient_1.default.vendor.findFirst({
        where: {
            nama: {
                contains: namaVendor, // Menggunakan contains untuk mencari kesesuaian substring
            },
        },
        select: {
            id: true,
        },
    });
    if (!vdr)
        return res.status(400).json({ msg: 'vendor tidak ditemukan' });
    try {
        await prismaClient_1.default.produk.update({
            where: {
                id: id,
            },
            data: {
                nama: nama,
                kemasan: kemasan,
                deskripsi: deskripsi,
                harga: harga,
                vendorId: vdr.id,
            },
        });
        res.status(200).json({ msg: 'produk has been updated' });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
};
// Menghapus pengguna berdasarkan ID
const deleteProdukController = async (req, res) => {
    const { id } = req.params;
    try {
        await prismaClient_1.default.produk.delete({ where: { id: id } });
        res.status(200).json({ message: 'Produk berhasil dihapus' });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
};
exports.default = { getAllProdukController, getProdukIdController, createProdukController, updateProdukController, deleteProdukController };
