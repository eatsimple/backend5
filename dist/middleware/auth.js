"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../prismaClient"));
const argon2_1 = __importDefault(require("argon2"));
//? mau disini bisa untuk req.session
// interface CustomSessionData {
//   userId: string; // Sesuaikan tipe data dengan tipe data ID yang digunakan dalam aplikasi Anda
// }
// declare module 'express-session' {
//   interface SessionData extends Partial<CustomSessionData> {}
// }
const Login = async (req, res) => {
    try {
        const pgn = await prismaClient_1.default.pengguna.findFirst({
            where: {
                email: req.body.email,
            },
        });
        if (!pgn)
            return res.status(400).json({ msg: 'pengguna tidak ditemukan' });
        const hashedPassword = pgn.password;
        const match = await argon2_1.default.verify(hashedPassword, req.body.password);
        if (!match)
            return res.status(400).json({ msg: 'password yang anda masukkan salah' });
        req.session.userId = pgn.id;
        const id = pgn.id;
        const nama = pgn.nama;
        const email = pgn.email;
        const role = pgn.role;
        const sesi = req.session.userId;
        res.status(200).json({ id, nama, email, role, sesi, msg: `you are success for login` });
    }
    catch (error) {
        res.status(400).json(error.message);
    }
};
const getMe = async (req, res) => {
    if (!req.session.userId)
        return res.status(400).json({ msg: 'you are not logged in' });
    const pgn = await prismaClient_1.default.pengguna.findFirst({
        where: {
            id: req.session.userId,
        },
        select: {
            nama: true,
            email: true,
        },
    });
    if (!pgn)
        return res.status(400).json({ msg: 'pengguna tidak ditemukan' });
    res.status(200).json(pgn);
};
const Logout = async (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log(error.message);
            return res.status(400);
        }
        res.status(200).json({ msg: 'you has been logout' });
    });
};
exports.default = { Login, Logout, getMe };
