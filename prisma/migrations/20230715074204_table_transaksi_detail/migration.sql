-- CreateTable
CREATE TABLE `transaksiDetail` (
    `id` VARCHAR(191) NOT NULL,
    `jumlahProduk` INTEGER NOT NULL,
    `hargaSatuan` BIGINT NOT NULL,
    `subtotal` BIGINT NOT NULL,
    `transaksiId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `transaksiDetail_transaksiId_key`(`transaksiId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transaksiDetail` ADD CONSTRAINT `transaksiDetail_transaksiId_fkey` FOREIGN KEY (`transaksiId`) REFERENCES `transaksi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
