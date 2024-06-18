/*
  Warnings:

  - Added the required column `dateOfCompletion` to the `Visits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctorsNotes` to the `Visits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Visits` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VisitStatus" AS ENUM ('ONGOING', 'NO_VITALS', 'COMPLETED');

-- AlterTable
ALTER TABLE "Visits" ADD COLUMN     "dateOfCompletion" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "doctorsNotes" TEXT NOT NULL,
ADD COLUMN     "status" "VisitStatus" NOT NULL;
