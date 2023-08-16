-- CreateTable
CREATE TABLE `purchasing` (
    `id` VARCHAR(191) NOT NULL,
    `noPo` INTEGER NOT NULL,
    `tanggalPo` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `hargaSatuan` INTEGER NOT NULL,
    `jumlahProduk` INTEGER NOT NULL,
    `subtotal` INTEGER NOT NULL,
    `vendorId` VARCHAR(191) NOT NULL,
    `produkId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `purchasing` ADD CONSTRAINT `purchasing_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `vendor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchasing` ADD CONSTRAINT `purchasing_produkId_fkey` FOREIGN KEY (`produkId`) REFERENCES `produk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
