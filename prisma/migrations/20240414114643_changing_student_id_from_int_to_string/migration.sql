/*
  Warnings:

  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "NextOfKin" DROP CONSTRAINT "NextOfKin_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Surgeries" DROP CONSTRAINT "Surgeries_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Visits" DROP CONSTRAINT "Visits_studentId_fkey";

-- AlterTable
ALTER TABLE "NextOfKin" ALTER COLUMN "studentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
ALTER COLUMN "matricNumber" DROP DEFAULT,
ALTER COLUMN "matricNumber" SET DATA TYPE TEXT,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("matricNumber");
DROP SEQUENCE "Student_matricNumber_seq";

-- AlterTable
ALTER TABLE "Surgeries" ALTER COLUMN "studentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Visits" ALTER COLUMN "studentId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "NextOfKin" ADD CONSTRAINT "NextOfKin_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("matricNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Surgeries" ADD CONSTRAINT "Surgeries_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("matricNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visits" ADD CONSTRAINT "Visits_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("matricNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
