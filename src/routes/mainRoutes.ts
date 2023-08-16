import express from 'express';
import penggunaController from '../controller/penggunaController';
import vendorController from '../controller/vendorController';
import produkController from '../controller/produkController';
import pembeliController from '../controller/pembeliController';
import salesController from '../controller/salesController';
import transaksiController from '../controller/transaksiController';
import transaksiDetailController from '../controller/transaksiDetailController';
import purchasingController from '../controller/purchasingController';
import { verifyPgn, adminOnly } from '../../middleware/authRouteProtect';

const router = express.Router();

// pengguna
router.get('/pengguna', penggunaController.getAllPenggunaController);
router.get('/pengguna/:id', penggunaController.getPenggunaIdController);
router.post('/pengguna', penggunaController.createPenggunaController);
router.patch('/pengguna/:id', penggunaController.updatePenggunaController);
router.delete('/pengguna/:id', penggunaController.deletePenggunaController);

// vendor
router.get('/vendor', vendorController.getAllVendorController);
router.get('/vendor/:id', vendorController.getVendorIdController);
router.post('/vendor', vendorController.createVendorController);
router.patch('/vendor/:id', vendorController.updateVendorController);
router.delete('/vendor/:id', vendorController.deleteVendorController);

// produk
router.get('/produk', produkController.getAllProdukController);
router.get('/produk/:id', produkController.getProdukIdController);
router.post('/produk', produkController.createProdukController);
router.patch('/produk/:id', produkController.updateProdukController);
router.delete('/produk/:id', produkController.deleteProdukController);

// pembeli
router.get('/pembeli', pembeliController.getAllPembeliController);
router.get('/pembeli/:id', pembeliController.getPembeliIdController);
router.post('/pembeli', pembeliController.createPembeliController);
router.patch('/pembeli/:id', pembeliController.updatePembeliController);
router.delete('/pembeli/:id', pembeliController.deletePembeliController);

// sales
router.get('/sales', salesController.getAllSalesController);
router.get('/sales/:id', salesController.getSalesIdController);
router.post('/sales', salesController.createSalesController);
router.patch('/sales/:id', salesController.updateSalesController);
router.delete('/sales/:id', salesController.deleteSalesController);

// transaksi
router.get('/transaksi', transaksiController.getAllTransaksiController);
router.get('/transaksi/:id', transaksiController.getTransaksiIdController);
router.post('/transaksi', transaksiController.createTransaksiController);
router.patch('/transaksi/:id', transaksiController.updateTransaksiController);
router.delete('/transaksi/:id', transaksiController.deleteTransaksiController);

// transaksi detail
router.get('/transaksi-detail', transaksiDetailController.getAllTransaksiDetailController);
router.get('/transaksi-detail/:id', transaksiDetailController.getTransaksiDetailIdController);
router.post('/transaksi-detail', transaksiDetailController.createTransaksiDetailController);
router.patch('/transaksi-detail/:id', transaksiDetailController.updateTransaksiDetailController);
router.delete('/transaksi-detail/:id', transaksiDetailController.deleteTransaksiDetailController);

// purchasing
router.get('/purchasing', purchasingController.getAllPurchasingController);
router.get('/purchasing/:id', purchasingController.getPurchasingIdController);
router.post('/purchasing', purchasingController.createPurchasingController);
router.patch('/purchasing/:id', purchasingController.updatePurchasingController);
router.delete('/purchasing/:id', purchasingController.deletePurchasingController);

export default router;
