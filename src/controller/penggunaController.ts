import { Request, Response } from 'express';
import prisma from '../../prismaClient';
import argon2 from 'argon2';

// Mendapatkan daftar semua pengguna
const getAllPenggunaController = async (req: Request, res: Response) => {
  try {
    const pengguna = await prisma.pengguna.findMany();
    res.status(200).json(pengguna);
  } catch (error: any) {
    res.status(404).json(error.message);
  }
};

// Mendapatkan pengguna berdasarkan ID
const getPenggunaIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pengguna = await prisma.pengguna.findUnique({ where: { id: id } });
    if (!pengguna) res.status(404).json({ msg: 'Pengguna tidak ditemukan' });

    res.status(200).json(pengguna);
  } catch (error: any) {
    res.status(404).end(error.message);
    console.log(error.message);
  }
};

// Membuat pengguna baru
const createPenggunaController = async (req: Request<{ nama: string; email: string; password: string; role: string }>, res: Response) => {
  const { nama, email, password, confirm, role } = req.body;
  if (password !== confirm) return res.status(400).json({ msg: 'password tidak sama' });
  const hash = await argon2.hash(password);
  try {
    await prisma.pengguna.create({
      data: {
        nama: nama,
        email: email,
        password: hash,
        role: role,
      },
    });
    res.status(201).json({ msg: 'pengguna has been created' });
  } catch (error: any) {
    res.status(404);
    console.log(error.message);
  }
};

// Memperbarui pengguna berdasarkan ID
const updatePenggunaController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nama, email, password, role } = req.body;
  try {
    await prisma.pengguna.update({ where: { id: id }, data: { nama, email, password, role } });
    res.status(200).json({ msg: 'pengguna has been updated' });
  } catch (error: any) {
    res.status(404);
    console.log(error.message);
  }
};

// Menghapus pengguna berdasarkan ID
const deletePenggunaController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.pengguna.delete({ where: { id: id } });
    res.status(200).json({ message: 'Pengguna berhasil dihapus' });
  } catch (error: any) {
    res.status(404);
    console.log(error.message);
  }
};

export default { getAllPenggunaController, getPenggunaIdController, createPenggunaController, updatePenggunaController, deletePenggunaController };
