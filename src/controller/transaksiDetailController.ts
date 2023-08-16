import { Request, Response } from 'express';
import prisma from '../../prismaClient';
import { Status } from '@prisma/client';

const getAllTransaksiDetailController = async (req: Request, res: Response) => {
  try {
    const ts = await prisma.transaksiDetail.findMany({
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
  } catch (error: any) {
    res.status(404);
    console.log(error.message);
  }
};

const getTransaksiDetailIdController = async (req: Request, res: Response) => {
  try {
    const ts = await prisma.transaksiDetail.findUnique({
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

const createTransaksiDetailController = async (req: Request<{ jumlahProduk: string; namaProduk: string }>, res: Response) => {
  const { jumlahProduk, namaProduk } = req.body;

  const produk = await prisma.produk.findFirst({ where: { nama: namaProduk } });
  if (!produk) return res.status(400).json({ msg: 'Produk tidak ditemukan' });

  const transaksi = await prisma.transaksi.findFirst({ where: { produkId: produk.id } });
  if (!transaksi) return res.status(400).json({ msg: 'Transaksi tidak ditemukan' });

  const hargaSatuan = produk.harga;
  const subtotal = hargaSatuan * parseInt(jumlahProduk);

  try {
    await prisma.transaksiDetail.create({
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
  } catch (error: any) {
    res.status(404);
    console.log(error.message);
  }
};

const updateTransaksiDetailController = async (req: Request, res: Response) => {};

const deleteTransaksiDetailController = async (req: Request, res: Response) => {};

export default { getAllTransaksiDetailController, getTransaksiDetailIdController, createTransaksiDetailController, updateTransaksiDetailController, deleteTransaksiDetailController };
