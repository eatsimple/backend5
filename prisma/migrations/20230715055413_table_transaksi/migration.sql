-- CreateTable
CREATE TABLE `transaksi` (
    `id` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `totalBayar` BIGINT NOT NULL,
    `status` ENUM('BELUM', 'SUDAH', 'SEBAGIAN') NOT NULL,
    `metodePembayaran` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NULL,
    `produkId` VARCHAR(191) NOT NULL,
    `pembeliId` VARCHAR(191) NOT NULL,
    `salesId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `transaksi_produkId_fkey` FOREIGN KEY (`produkId`) REFERENCES `produk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `transaksi_pembeliId_fkey` FOREIGN KEY (`pembeliId`) REFERENCES `pembeli`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaksi` ADD CONSTRAINT `transaksi_salesId_fkey` FOREIGN KEY (`salesId`) REFERENCES `sales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
