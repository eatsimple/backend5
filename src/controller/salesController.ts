import { Request, Response } from 'express';
import prisma from '../../prismaClient';

// Mendapatkan daftar semua pengguna
const getAllSalesController = async (req: Request, res: Response) => {
  try {
    const sales = await prisma.sales.findMany();
    res.status(200).json(sales);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

// Mendapatkan pengguna berdasarkan ID
const getSalesIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const sales = await prisma.sales.findUnique({ where: { id: id } });
    if (!sales) res.status(404).json({ error: 'sales tidak ditemukan' });

    res.status(200).json(sales);
  } catch (error: any) {
    res.status(404);
    console.log(error.message);
  }
};

// Membuat pengguna baru
const createSalesController = async (req: Request, res: Response) => {
  const { nama, email, noTelp, alamat } = req.body;
  try {
    await prisma.sales.create({
      data: {
        nama: nama,
        email: email,
        noTelp: noTelp,
        alamat: alamat,
      },
    });
    res.status(201).json({ msg: 'sales has been created' });
  } catch (error: any) {
    res.status(404);
    console.log(error.message);
  }
};

// Memperbarui pengguna berdasarkan ID
const updateSalesController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nama, email, noTelp, alamat } = req.body;
  try {
    await prisma.sales.update({ where: { id: id }, data: { nama, email, noTelp, alamat } });
    res.status(200).json({ msg: 'sales has been updated' });
  } catch (error: any) {
    res.status(404);
    console.log(error.message);
  }
};

// Menghapus pengguna berdasarkan ID
const deleteSalesController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.sales.delete({ where: { id: id } });
    res.status(200).json({ message: 'sales berhasil dihapus' });
  } catch (error: any) {
    res.status(404);
    console.log(error.message);
  }
};

export default { getAllSalesController, getSalesIdController, createSalesController, updateSalesController, deleteSalesController };
