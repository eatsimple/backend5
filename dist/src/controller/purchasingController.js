"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prismaClient"));
// Mendapatkan daftar semua pengguna
const getAllPurchasingController = async (req, res) => {
    try {
        const purchasing = await prismaClient_1.default.purchasing.findMany({
            include: {
                vendor: {
                    select: {
                        nama: true,
                        noTelp: true,
                    },
                },
                produk: {
                    select: {
                        nama: true,
                        harga: true,
                    },
                },
            },
        });
        res.status(200).json(purchasing);
    }
    catch (error) {
        res.status(404);
        console.log(error.message);
    }
};
// Mendapatkan pengguna berdasarkan ID
const getPurchasingIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const purchasing = await prismaClient_1.default.purchasing.findUnique({ where: { id: id } });
        if (!purchasing)
            res.status(404).json({ error: 'Pembeli tidak ditemukan' });
        res.status(200).json(purchasing);
    }
    catch (error) {
        res.status(404);
        console.log(error.message);
    }
};
// Membuat pengguna baru
const createPurchasingController = async (req, res) => {
    const { noPo, hargaSatuan, jumlahProduk, namaProduk, namaVendor } = req.body;
    const produk = await prismaClient_1.default.produk.findFirst({ where: { nama: namaProduk } });
    if (!produk)
        return res.status(400).json({ msg: 'Produk tidak ditemukan' });
    const vendor = await prismaClient_1.default.vendor.findFirst({ where: { nama: namaVendor } });
    if (!vendor)
        return res.status(400).json({ msg: 'vendor tidak ditemukan' });
    const total = parseInt(hargaSatuan) * parseInt(jumlahProduk);
    try {
        await prismaClient_1.default.purchasing.create({
            data: {
                noPo: parseInt(noPo),
                hargaSatuan: parseInt(hargaSatuan),
                jumlahProduk: parseInt(jumlahProduk),
                subtotal: total,
                produk: {
                    connect: { id: produk.id }, // Menghubungkan transaksi dengan produk berdasarkan produkId yang dikirimkan dalam body request
                },
                vendor: {
                    connect: { id: vendor.id }, // Menghubungkan transaksi dengan produk berdasarkan produkId yang dikirimkan dalam body request
                },
            },
        });
        res.status(201).json({ msg: 'purchasing has been created' });
    }
    catch (error) {
        res.status(404);
        console.log(error.message);
    }
};
// Memperbarui pengguna berdasarkan ID
const updatePurchasingController = async (req, res) => {
    const { id } = req.params;
    const { noPo, hargaSatuan, jumlahProduk, subtotal } = req.body;
    try {
        await prismaClient_1.default.purchasing.update({ where: { id: id }, data: { noPo, hargaSatuan, jumlahProduk, subtotal } });
        res.status(200).json({ msg: 'purchasing has been updated' });
    }
    catch (error) {
        res.status(404);
        console.log(error.message);
    }
};
// Menghapus pengguna berdasarkan ID
const deletePurchasingController = async (req, res) => {
    const { id } = req.params;
    try {
        await prismaClient_1.default.purchasing.delete({ where: { id: id } });
        res.status(200).json({ message: 'purchasing berhasil dihapus' });
    }
    catch (error) {
        res.status(404);
        console.log(error.message);
    }
};
exports.default = { getAllPurchasingController, getPurchasingIdController, createPurchasingController, updatePurchasingController, deletePurchasingController };
