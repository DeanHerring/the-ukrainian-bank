-- CreateTable
CREATE TABLE `Transfers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sender` VARCHAR(191) NOT NULL,
    `receiver` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    `date` INTEGER NOT NULL,
    `currency` INTEGER NOT NULL,
    `fee_amount` DECIMAL(65, 30) NOT NULL,
    `status` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
