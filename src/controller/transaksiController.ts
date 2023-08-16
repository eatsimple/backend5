import { Request, Response } from 'express';
import prisma from '../../prismaClient';
import { Status } from '@prisma/client';

const getAllTransaksiController = async (req: Request, res: Response) => {
  try {
    const ts = await prisma.transaksi.findMany({
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
  } catch (error: any) {
    res.status(404);
    console.log(error.message);
  }
};

const getTransaksiIdController = async (req: Request, res: Response) => {
  try {
    const ts = await prisma.transaksi.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(ts);
  } catch (error: any) {
    res.status(404);
    console.log(error.message);
  }
};

const createTransaksiController = async (req: Request<{ totalBayar: number; status: Status; metodePembayaran: string; keterangan: string; namaProduk: string; namaPembeli: string; namaSales: string }>, res: Response) => {
  const { tanggal, totalBayar, status, metodePembayaran, keterangan, namaProduk, namaPembeli, namaSales } = req.body;

  const produk = await prisma.produk.findFirst({ where: { nama: namaProduk } });
  const pembeli = await prisma.pembeli.findFirst({ where: { nama: namaPembeli } });
  const sales = await prisma.sales.findFirst({ where: { nama: namaSales } });
  if (!produk || !pembeli || !sales) return res.status(400).json({ msg: '3 data tidak ditemukan' });

  try {
    await prisma.transaksi.create({
      data: {
        totalBayar: Number(totalBayar),
        status: status,
        metodePembayaran: metodePembayaran,
        keterangan: keterangan,
        produk: {
          connect: { id: produk?.id }, // Menghubungkan transaksi dengan produk berdasarkan produkId yang dikirimkan dalam body request
        },
        pembeli: {
          connect: { id: pembeli?.id }, // Menghubungkan transaksi dengan pembeli berdasarkan pembeliId yang dikirimkan dalam body request
        },
        sales: {
          connect: { id: sales?.id }, // Menghubungkan transaksi dengan sales berdasarkan salesId yang dikirimkan dalam body request
        },
      },
    });

    res.status(200).json({ msg: 'Transaksi telah berhasil dibuat' });
  } catch (error: any) {
    res.status(404);
    console.log(error.message);
  }
};

const updateTransaksiController = async (req: Request, res: Response) => {};

const deleteTransaksiController = async (req: Request, res: Response) => {};

export default { getAllTransaksiController, getTransaksiIdController, createTransaksiController, updateTransaksiController, deleteTransaksiController };
