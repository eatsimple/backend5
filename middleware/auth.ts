import { Request, Response } from 'express';
import prisma from '../prismaClient';
import argon2 from 'argon2';

//? mau disini bisa untuk req.session
// interface CustomSessionData {
//   userId: string; // Sesuaikan tipe data dengan tipe data ID yang digunakan dalam aplikasi Anda
// }

// declare module 'express-session' {
//   interface SessionData extends Partial<CustomSessionData> {}
// }

const Login = async (req: Request<{ email: string }>, res: Response) => {
  try {
    const pgn = await prisma.pengguna.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (!pgn) return res.status(400).json({ msg: 'pengguna tidak ditemukan' });
    const hashedPassword = pgn.password;
    const match = await argon2.verify(hashedPassword, req.body.password);
    if (!match) return res.status(400).json({ msg: 'password yang anda masukkan salah' });
    req.session.userId = pgn.id;
    const id = pgn.id;
    const nama = pgn.nama;
    const email = pgn.email;
    const role = pgn.role;
    const sesi = req.session.userId;
    res.status(200).json({ id, nama, email, role, sesi, msg: `you are success for login` });
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};

const getMe = async (req: Request, res: Response) => {
  if (!req.session.userId) return res.status(400).json({ msg: 'you are not logged in' });
  const pgn = await prisma.pengguna.findFirst({
    where: {
      id: req.session.userId,
    },
    select: {
      nama: true,
      email: true,
    },
  });
  if (!pgn) return res.status(400).json({ msg: 'pengguna tidak ditemukan' });
  res.status(200).json(pgn);
};

const Logout = async (req: Request, res: Response) => {
  req.session.destroy((error: any) => {
    if (error) {
      console.log(error.message);
      return res.status(400);
    }
    res.status(200).json({ msg: 'you has been logout' });
  });
};

export default { Login, Logout, getMe };
