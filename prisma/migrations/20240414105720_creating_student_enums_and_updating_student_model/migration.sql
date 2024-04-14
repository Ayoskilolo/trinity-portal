/*
  Warnings:

  - Changed the type of `level` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `college` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sex` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Level" AS ENUM ('FRESHMAN', 'SOPHMORE', 'JUNIOR', 'SENIOR');

-- CreateEnum
CREATE TYPE "College" AS ENUM ('COE', 'CST', 'CMSS', 'CDSS');

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "level",
ADD COLUMN     "level" "Level" NOT NULL,
DROP COLUMN "college",
ADD COLUMN     "college" "College" NOT NULL,
DROP COLUMN "sex",
ADD COLUMN     "sex" "Sex" NOT NULL;
