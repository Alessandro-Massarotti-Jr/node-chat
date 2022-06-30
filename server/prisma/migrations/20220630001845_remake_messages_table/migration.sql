/*
  Warnings:

  - You are about to drop the column `messages` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `user_one_id` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `user_two_id` on the `messages` table. All the data in the column will be lost.
  - Added the required column `message` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiver` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `messages` DROP COLUMN `messages`,
    DROP COLUMN `user_one_id`,
    DROP COLUMN `user_two_id`,
    ADD COLUMN `message` VARCHAR(191) NOT NULL,
    ADD COLUMN `receiver` VARCHAR(191) NOT NULL,
    ADD COLUMN `sender` VARCHAR(191) NOT NULL;
