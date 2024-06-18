/*
  Warnings:

  - The values [COE,CST,CMSS,CDSS] on the enum `College` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "College_new" AS ENUM ('FBMAS', 'FMASS');
ALTER TABLE "Student" ALTER COLUMN "college" TYPE "College_new" USING ("college"::text::"College_new");
ALTER TYPE "College" RENAME TO "College_old";
ALTER TYPE "College_new" RENAME TO "College";
DROP TYPE "College_old";
COMMIT;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "hall" DROP DEFAULT;
