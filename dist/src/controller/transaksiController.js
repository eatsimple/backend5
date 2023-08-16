"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prismaClient"));
const getAllTransaksiController = async (req, res) => {
    try {
        const ts = await prismaClient_1.default.transaksi.findMany({
            include: {
                produk: {
                    select: {
                        nama: true,
                        harga: true,
                    },
                },
                pembeli: {
                    select: {
                        nama: true,
                        noTelp: true,
                    },
                },
                sales: {
                    select: {
                        nama: true,
                        noTelp: true,
                    },
                },
            },
        });
        res.status(200).json(ts);
    }
    catch (error) {
        res.status(404);
        console.log(error.message);
    }
};
const getTransaksiIdController = async (req, res) => {
    try {
        const ts = await prismaClient_1.default.transaksi.findUnique({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(ts);
    }
    catch (error) {
        res.status(404);
        console.log(error.message);
    }
};
const createTransaksiController = async (req, res) => {
    const { tanggal, totalBayar, status, metodePembayaran, keterangan, namaProduk, namaPembeli, namaSales } = req.body;
    const produk = await prismaClient_1.default.produk.findFirst({ where: { nama: namaProduk } });
    const pembeli = await prismaClient_1.default.pembeli.findFirst({ where: { nama: namaPembeli } });
    const sales = await prismaClient_1.default.sales.findFirst({ where: { nama: namaSales } });
    if (!produk || !pembeli || !sales)
        return res.status(400).json({ msg: '3 data tidak ditemukan' });
    try {
        await prismaClient_1.default.transaksi.create({
            data: {
                totalBayar: Number(totalBayar),
                status: status,
                metodePembayaran: metodePembayaran,
                keterangan: keterangan,
                produk: {
                    connect: { id: produk === null || produk === void 0 ? void 0 : produk.id }, // Menghubungkan transaksi dengan produk berdasarkan produkId yang dikirimkan dalam body request
                },
                pembeli: {
                    connect: { id: pembeli === null || pembeli === void 0 ? void 0 : pembeli.id }, // Menghubungkan transaksi dengan pembeli berdasarkan pembeliId yang dikirimkan dalam body request
                },
                sales: {
                    connect: { id: sales === null || sales === void 0 ? void 0 : sales.id }, // Menghubungkan transaksi dengan sales berdasarkan salesId yang dikirimkan dalam body request
                },
            },
        });
        res.status(200).json({ msg: 'Transaksi telah berhasil dibuat' });
    }
    catch (error) {
        res.status(404);
        console.log(error.message);
    }
};
const updateTransaksiController = async (req, res) => { };
const deleteTransaksiController = async (req, res) => { };
exports.default = { getAllTransaksiController, getTransaksiIdController, createTransaksiController, updateTransaksiController, deleteTransaksiController };
