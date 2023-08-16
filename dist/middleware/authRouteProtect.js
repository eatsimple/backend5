"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = exports.verifyPgn = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
// sama seperti function getMe
const verifyPgn = async (req, res, next) => {
    if (!req.session.userId)
        return res.status(401).json({ msg: 'Mohon login ke akun Anda!' });
    const pgn = await prismaClient_1.default.pengguna.findUnique({
        // ambil satu baris data
        where: {
            id: req.session.userId, // cari uuid yang sudah login
        },
    });
    if (!pgn)
        return res.status(404).json({ msg: 'pengguna tidak ditemukan' });
    req.userId = pgn.id; // ini id yang sudah login, simpan ke variable req. Ini data tunggal yang telah login
    req.role = pgn.role; // ini role yang sudah login, simpan ke variable req
    next();
};
exports.verifyPgn = verifyPgn;
// export const verifyPgn = async (req: Request, res: Response, next: NextFunction) => {
//   if (!req.session.userId) return res.status(401).json({ msg: 'anda belum login' });
//   next();
// };
// admin only, jika role bukan admin akses dilarang
const adminOnly = async (req, res, next) => {
    const pgn = await prismaClient_1.default.pengguna.findFirst({
        // ambil satu baris data
        where: {
            id: req.session.userId, // cari uuid yang sudah login
        },
    });
    if (!pgn)
        return res.status(404).json({ msg: 'pengguna tidak ditemukan' });
    if (pgn.role !== 'admin')
        return res.status(403).json({ msg: 'access unauthorized' });
    next();
};
exports.adminOnly = adminOnly;
