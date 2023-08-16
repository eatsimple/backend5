import { Request, Response } from 'express';
import prisma from '../../prismaClient';

// Mendapatkan daftar semua pengguna
const getAllPembeliController = async (req: Request, res: Response) => {
  try {
    const pembeli = await prisma.pembeli.findMany();
    res.status(200).json(pembeli);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

// Mendapatkan pengguna berdasarkan ID
const getPembeliIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pembeli = await prisma.pembeli.findUnique({ where: { id: id } });
    if (!pembeli) res.status(404).json({ error: 'Pembeli tidak ditemukan' });

    res.status(200).json(pembeli);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

// Membuat pengguna baru
const createPembeliController = async (req: Request, res: Response) => {
  const { nama, email, noTelp, alamat } = req.body;
  try {
    await prisma.pembeli.create({
      data: {
        nama: nama,
        email: email,
        noTelp: noTelp,
        alamat: alamat,
      },
    });
    res.status(201).json({ msg: 'pengguna has been created' });
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

// Memperbarui pengguna berdasarkan ID
const updatePembeliController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nama, email, noTelp, alamat } = req.body;
  try {
    await prisma.pembeli.update({ where: { id: id }, data: { nama, email, noTelp, alamat } });
    res.status(200).json({ msg: 'pengguna has been updated' });
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

// Menghapus pengguna berdasarkan ID
const deletePembeliController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.pembeli.delete({ where: { id: id } });
    res.status(200).json({ message: 'Pengguna berhasil dihapus' });
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export default { getAllPembeliController, getPembeliIdController, createPembeliController, updatePembeliController, deletePembeliController };
