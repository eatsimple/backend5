"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prismaClient"));
const getAllTransaksiDetailController = async (req, res) => {
    try {
        const ts = await prismaClient_1.default.transaksiDetail.findMany({
            include: {
                transaksi: {
                    select: {
                        tanggal: true,
                        status: true,
                        totalBayar: true,
                        produk: {
                            select: {
                                nama: true,
                            },
                        },
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
const getTransaksiDetailIdController = async (req, res) => {
    try {
        const ts = await prismaClient_1.default.transaksiDetail.findUnique({
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
const createTransaksiDetailController = async (req, res) => {
    const { jumlahProduk, namaProduk } = req.body;
    const produk = await prismaClient_1.default.produk.findFirst({ where: { nama: namaProduk } });
    if (!produk)
        return res.status(400).json({ msg: 'Produk tidak ditemukan' });
    const transaksi = await prismaClient_1.default.transaksi.findFirst({ where: { produkId: produk.id } });
    if (!transaksi)
        return res.status(400).json({ msg: 'Transaksi tidak ditemukan' });
    const hargaSatuan = produk.harga;
    const subtotal = hargaSatuan * parseInt(jumlahProduk);
    try {
        await prismaClient_1.default.transaksiDetail.create({
            data: {
                jumlahProduk: parseInt(jumlahProduk),
                hargaSatuan: hargaSatuan,
                subtotal: subtotal,
                transaksi: {
                    connect: { id: transaksi.id }, // Menghubungkan transaksi dengan produk berdasarkan produkId yang dikirimkan dalam body request
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
const updateTransaksiDetailController = async (req, res) => { };
const deleteTransaksiDetailController = async (req, res) => { };
exports.default = { getAllTransaksiDetailController, getTransaksiDetailIdController, createTransaksiDetailController, updateTransaksiDetailController, deleteTransaksiDetailController };
