/*
  Warnings:

  - A unique constraint covering the columns `[name_ar]` on the table `Specialization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name_ar` to the `Specialization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Specialization" ADD COLUMN     "name_ar" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Specialization_name_ar_key" ON "Specialization"("name_ar");
