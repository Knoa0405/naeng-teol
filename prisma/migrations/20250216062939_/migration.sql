/*
  Warnings:

  - You are about to drop the column `rawContent` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "rawContent",
ADD COLUMN     "raw_content" TEXT;
