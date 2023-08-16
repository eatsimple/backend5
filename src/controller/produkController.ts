import { Request, Response } from 'express';
import prisma from '../../prismaClient';

// Mendapatkan daftar semua pengguna
const getAllProdukController = async (req: Request, res: Response) => {
  try {
    const produk = await prisma.produk.findMany({
      include: {
        vendor: true,
      },
    });
    res.status(200).json(produk);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

// Mendapatkan pengguna berdasarkan ID
const getProdukIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const produk = await prisma.produk.findUnique({ where: { id: id } });
    if (!produk) res.status(404).json({ error: 'Produk tidak ditemukan' });

    res.status(200).json(produk);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

// Membuat pengguna baru
const createProdukController = async (req: Request, res: Response) => {
  const { nama, kemasan, deskripsi, harga, namaVendor } = req.body;

  const vdr = await prisma.vendor.findFirst({
    where: {
      nama: {
        contains: namaVendor, // Menggunakan contains untuk mencari kesesuaian substring
      },
    },
    select: {
      id: true,
    },
  });
  if (!vdr) return res.status(400).json({ msg: 'vendor tidak ditemukan' });

  try {
    await prisma.produk.create({
      data: {
        nama: nama,
        kemasan: kemasan,
        deskripsi: deskripsi,
        harga: parseInt(harga),
        vendor: {
          connect: { id: vdr.id },
        },
        // vendorId: vdr.id,
      },
    });
    res.status(201).json({ msg: 'produk has been created' });
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

// Memperbarui pengguna berdasarkan ID
const updateProdukController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nama, kemasan, deskripsi, harga, namaVendor } = req.body;

  const vdr = await prisma.vendor.findFirst({
    where: {
      nama: {
        contains: namaVendor, // Menggunakan contains untuk mencari kesesuaian substring
      },
    },
    select: {
      id: true,
    },
  });
  if (!vdr) return res.status(400).json({ msg: 'vendor tidak ditemukan' });

  try {
    await prisma.produk.update({
      where: {
        id: id,
      },
      data: {
        nama: nama,
        kemasan: kemasan,
        deskripsi: deskripsi,
        harga: harga,
        vendorId: vdr.id,
      },
    });
    res.status(200).json({ msg: 'produk has been updated' });
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

// Menghapus pengguna berdasarkan ID
const deleteProdukController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.produk.delete({ where: { id: id } });
    res.status(200).json({ message: 'Produk berhasil dihapus' });
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export default { getAllProdukController, getProdukIdController, createProdukController, updateProdukController, deleteProdukController };
