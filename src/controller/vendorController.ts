import { Request, Response } from 'express';
import prisma from '../../prismaClient';

const getAllVendorController = async (req: Request, res: Response) => {
  try {
    const vendor = await prisma.vendor.findMany();
    res.status(200).json(vendor);
  } catch (error: any) {
    res.status(404);
    console.log(error.message);
  }
};

const getVendorIdController = async (req: Request, res: Response) => {
  let { id } = req.params;

  try {
    const vendor = await prisma.vendor.findUnique({
      where: { id: id },
    });
    res.status(200).json(vendor);
  } catch (error: any) {
    res.status(404);
    console.log(error.message);
  }
};

const createVendorController = async (req: Request, res: Response) => {
  const { nama, email, jl, kelurahan, kecamatan, kota, propinsi, noTelp } = req.body;
  try {
    await prisma.vendor.create({
      data: {
        nama: nama,
        email: email,
        jl: jl,
        kelurahan: kelurahan,
        kecamatan: kecamatan,
        kota: kota,
        propinsi: propinsi,
        noTelp: noTelp,
      },
    });
    res.status(201).json({ msg: 'vendor has been created' });
  } catch (error: any) {
    res.status(404);
    console.log(error.message);
  }
};

const updateVendorController = async (req: Request, res: Response) => {};

const deleteVendorController = async (req: Request, res: Response) => {};

export default { getAllVendorController, getVendorIdController, createVendorController, updateVendorController, deleteVendorController };
