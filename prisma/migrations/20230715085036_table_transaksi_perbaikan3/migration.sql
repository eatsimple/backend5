/*
  Warnings:

  - You are about to alter the column `hargaSatuan` on the `transaksidetail` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `subtotal` on the `transaksidetail` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `transaksidetail` MODIFY `hargaSatuan` INTEGER NOT NULL,
    MODIFY `subtotal` INTEGER NOT NULL;
