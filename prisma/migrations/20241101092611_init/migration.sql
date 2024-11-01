/*
  Warnings:

  - You are about to drop the column `isCompleted` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - Added the required column `link` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "isCompleted",
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email";
