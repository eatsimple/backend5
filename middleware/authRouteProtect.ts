import prisma from '../prismaClient';
import { Request, Response, NextFunction } from 'express';

// sama seperti function getMe
export const verifyPgn = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) return res.status(401).json({ msg: 'Mohon login ke akun Anda!' });
  const pgn = await prisma.pengguna.findUnique({
    // ambil satu baris data
    where: {
      id: req.session.userId, // cari uuid yang sudah login
    },
  });
  if (!pgn) return res.status(404).json({ msg: 'pengguna tidak ditemukan' });
  req.userId = pgn.id; // ini id yang sudah login, simpan ke variable req. Ini data tunggal yang telah login
  req.role = pgn.role; // ini role yang sudah login, simpan ke variable req
  next();
};

// export const verifyPgn = async (req: Request, res: Response, next: NextFunction) => {
//   if (!req.session.userId) return res.status(401).json({ msg: 'anda belum login' });
//   next();
// };

// admin only, jika role bukan admin akses dilarang
export const adminOnly = async (req: Request, res: Response, next: NextFunction) => {
  const pgn = await prisma.pengguna.findFirst({
    // ambil satu baris data
    where: {
      id: req.session.userId, // cari uuid yang sudah login
    },
  });
  if (!pgn) return res.status(404).json({ msg: 'pengguna tidak ditemukan' });
  if (pgn.role !== 'admin') return res.status(403).json({ msg: 'access unauthorized' });
  next();
};
