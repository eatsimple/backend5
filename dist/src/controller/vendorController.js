"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prismaClient"));
const getAllVendorController = async (req, res) => {
    try {
        const vendor = await prismaClient_1.default.vendor.findMany();
        res.status(200).json(vendor);
    }
    catch (error) {
        res.status(404);
        console.log(error.message);
    }
};
const getVendorIdController = async (req, res) => {
    let { id } = req.params;
    try {
        const vendor = await prismaClient_1.default.vendor.findUnique({
            where: { id: id },
        });
        res.status(200).json(vendor);
    }
    catch (error) {
        res.status(404);
        console.log(error.message);
    }
};
const createVendorController = async (req, res) => {
    const { nama, email, jl, kelurahan, kecamatan, kota, propinsi, noTelp } = req.body;
    try {
        await prismaClient_1.default.vendor.create({
            data: {
                nama: nama,
                email: email,
                jl: jl,
                kelurahan: kelurahan,
                kecamatan: kecamatan,
                kota: kota,
                propinsi: propinsi,
                noTelp: noTelp,
            },
        });
        res.status(201).json({ msg: 'vendor has been created' });
    }
    catch (error) {
        res.status(404);
        console.log(error.message);
    }
};
const updateVendorController = async (req, res) => { };
const deleteVendorController = async (req, res) => { };
exports.default = { getAllVendorController, getVendorIdController, createVendorController, updateVendorController, deleteVendorController };
