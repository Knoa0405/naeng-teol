/*
  Warnings:

  - You are about to drop the column `is_deleted` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "is_deleted",
ADD COLUMN     "deleted_at" TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "is_deleted",
ADD COLUMN     "deleted_at" TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "is_deleted",
ADD COLUMN     "deleted_at" TIMESTAMPTZ(6);
