/*
  Warnings:

  - Added the required column `cep` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "cep" TEXT NOT NULL;
