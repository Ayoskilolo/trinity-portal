-- CreateEnum
CREATE TYPE "Hall" AS ENUM ('Deborah', 'Esther', 'Mary', 'Joseph', 'Daniel');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "hall" "Hall" NOT NULL DEFAULT 'Deborah';
