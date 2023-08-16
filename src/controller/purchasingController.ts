import { Request, Response } from 'express';
import prisma from '../../prismaClient';

// Mendapatkan daftar semua pengguna
const getAllPurchasingController = async (req: Request, res: Response) => {
  try {
    const purchasing = await prisma.purchasing.findMany({
      include: {
        vendor: {
          select: {
            nama: true,
            noTelp: true,
          },
        },
        produk: {
          select: {
            nama: true,
            harga: true,
          },
        },
      },
    });
    res.status(200).json(purchasing);
  } catch (error: any) {
    res.status(404);
    console.log(error.message);
  }
};

// Mendapatkan pengguna berdasarkan ID
const getPurchasingIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const purchasing = await prisma.purchasing.findUnique({ where: { id: id } });
    if (!purchasing) res.status(404).json({ error: 'Pembeli tidak ditemukan' });

    res.status(200).json(purchasing);
  } catch (error: any) {
    res.status(404);
    console.log(error.message);
  }
};

// Membuat pengguna baru
const createPurchasingController = async (req: Request<{ noPo: string; hargaSatuan: string; jumlahProduk: string; namaProduk: string; namaVendor: string }>, res: Response) => {
  const { noPo, hargaSatuan, jumlahProduk, namaProduk, namaVendor } = req.body;

  const produk = await prisma.produk.findFirst({ where: { nama: namaProduk } });
  if (!produk) return res.status(400).json({ msg: 'Produk tidak ditemukan' });

  const vendor = await prisma.vendor.findFirst({ where: { nama: namaVendor } });
  if (!vendor) return res.status(400).json({ msg: 'vendor tidak ditemukan' });

  const total = parseInt(hargaSatuan) * parseInt(jumlahProduk);

  try {
    await prisma.purchasing.create({
      data: {
        noPo: parseInt(noPo),
        hargaSatuan: parseInt(hargaSatuan),
        jumlahProduk: parseInt(jumlahProduk),
        subtotal: total,
        produk: {
          connect: { id: produk.id }, // Menghubungkan transaksi dengan produk berdasarkan produkId yang dikirimkan dalam body request
        },
        vendor: {
          connect: { id: vendor.id }, // Menghubungkan transaksi dengan produk berdasarkan produkId yang dikirimkan dalam body request
        },
      },
    });
    res.status(201).json({ msg: 'purchasing has been created' });
  } catch (error: any) {
    res.status(404);
    console.log(error.message);
  }
};

// Memperbarui pengguna berdasarkan ID
const updatePurchasingController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { noPo, hargaSatuan, jumlahProduk, subtotal } = req.body;
  try {
    await prisma.purchasing.update({ where: { id: id }, data: { noPo, hargaSatuan, jumlahProduk, subtotal } });
    res.status(200).json({ msg: 'purchasing has been updated' });
  } catch (error: any) {
    res.status(404);
    console.log(error.message);
  }
};

// Menghapus pengguna berdasarkan ID
const deletePurchasingController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.purchasing.delete({ where: { id: id } });
    res.status(200).json({ message: 'purchasing berhasil dihapus' });
  } catch (error: any) {
    res.status(404);
    console.log(error.message);
  }
};

export default { getAllPurchasingController, getPurchasingIdController, createPurchasingController, updatePurchasingController, deletePurchasingController };
