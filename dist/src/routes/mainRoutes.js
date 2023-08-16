"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const penggunaController_1 = __importDefault(require("../controller/penggunaController"));
const vendorController_1 = __importDefault(require("../controller/vendorController"));
const produkController_1 = __importDefault(require("../controller/produkController"));
const pembeliController_1 = __importDefault(require("../controller/pembeliController"));
const salesController_1 = __importDefault(require("../controller/salesController"));
const transaksiController_1 = __importDefault(require("../controller/transaksiController"));
const transaksiDetailController_1 = __importDefault(require("../controller/transaksiDetailController"));
const purchasingController_1 = __importDefault(require("../controller/purchasingController"));
const router = express_1.default.Router();
// pengguna
router.get('/pengguna', penggunaController_1.default.getAllPenggunaController);
router.get('/pengguna/:id', penggunaController_1.default.getPenggunaIdController);
router.post('/pengguna', penggunaController_1.default.createPenggunaController);
router.patch('/pengguna/:id', penggunaController_1.default.updatePenggunaController);
router.delete('/pengguna/:id', penggunaController_1.default.deletePenggunaController);
// vendor
router.get('/vendor', vendorController_1.default.getAllVendorController);
router.get('/vendor/:id', vendorController_1.default.getVendorIdController);
router.post('/vendor', vendorController_1.default.createVendorController);
router.patch('/vendor/:id', vendorController_1.default.updateVendorController);
router.delete('/vendor/:id', vendorController_1.default.deleteVendorController);
// produk
router.get('/produk', produkController_1.default.getAllProdukController);
router.get('/produk/:id', produkController_1.default.getProdukIdController);
router.post('/produk', produkController_1.default.createProdukController);
router.patch('/produk/:id', produkController_1.default.updateProdukController);
router.delete('/produk/:id', produkController_1.default.deleteProdukController);
// pembeli
router.get('/pembeli', pembeliController_1.default.getAllPembeliController);
router.get('/pembeli/:id', pembeliController_1.default.getPembeliIdController);
router.post('/pembeli', pembeliController_1.default.createPembeliController);
router.patch('/pembeli/:id', pembeliController_1.default.updatePembeliController);
router.delete('/pembeli/:id', pembeliController_1.default.deletePembeliController);
// sales
router.get('/sales', salesController_1.default.getAllSalesController);
router.get('/sales/:id', salesController_1.default.getSalesIdController);
router.post('/sales', salesController_1.default.createSalesController);
router.patch('/sales/:id', salesController_1.default.updateSalesController);
router.delete('/sales/:id', salesController_1.default.deleteSalesController);
// transaksi
router.get('/transaksi', transaksiController_1.default.getAllTransaksiController);
router.get('/transaksi/:id', transaksiController_1.default.getTransaksiIdController);
router.post('/transaksi', transaksiController_1.default.createTransaksiController);
router.patch('/transaksi/:id', transaksiController_1.default.updateTransaksiController);
router.delete('/transaksi/:id', transaksiController_1.default.deleteTransaksiController);
// transaksi detail
router.get('/transaksi-detail', transaksiDetailController_1.default.getAllTransaksiDetailController);
router.get('/transaksi-detail/:id', transaksiDetailController_1.default.getTransaksiDetailIdController);
router.post('/transaksi-detail', transaksiDetailController_1.default.createTransaksiDetailController);
router.patch('/transaksi-detail/:id', transaksiDetailController_1.default.updateTransaksiDetailController);
router.delete('/transaksi-detail/:id', transaksiDetailController_1.default.deleteTransaksiDetailController);
// purchasing
router.get('/purchasing', purchasingController_1.default.getAllPurchasingController);
router.get('/purchasing/:id', purchasingController_1.default.getPurchasingIdController);
router.post('/purchasing', purchasingController_1.default.createPurchasingController);
router.patch('/purchasing/:id', purchasingController_1.default.updatePurchasingController);
router.delete('/purchasing/:id', purchasingController_1.default.deletePurchasingController);
exports.default = router;
