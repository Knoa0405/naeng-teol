/*
  Warnings:

  - You are about to drop the column `entityId` on the `image_relations` table. All the data in the column will be lost.
  - You are about to drop the column `entityType` on the `image_relations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[postId,order]` on the table `image_relations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[commentId,order]` on the table `image_relations` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "image_relations" DROP CONSTRAINT "image_relations_comment_fkey";

-- DropForeignKey
ALTER TABLE "image_relations" DROP CONSTRAINT "image_relations_post_fkey";

-- DropIndex
DROP INDEX "image_relations_entityType_entityId_idx";

-- DropIndex
DROP INDEX "image_relations_entityType_entityId_order_key";

-- AlterTable
ALTER TABLE "image_relations" DROP COLUMN "entityId",
DROP COLUMN "entityType",
ADD COLUMN     "commentId" INTEGER,
ADD COLUMN     "postId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "image_relations_postId_order_key" ON "image_relations"("postId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "image_relations_commentId_order_key" ON "image_relations"("commentId", "order");

-- AddForeignKey
ALTER TABLE "image_relations" ADD CONSTRAINT "image_relations_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_relations" ADD CONSTRAINT "image_relations_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
