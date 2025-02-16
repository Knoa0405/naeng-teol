/*
  Warnings:

  - Made the column `raw_content` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "raw_content" SET NOT NULL;
