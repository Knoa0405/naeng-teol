-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('POST', 'COMMENT');

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "hash" TEXT,
    "alt" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image_relations" (
    "id" SERIAL NOT NULL,
    "imageId" INTEGER NOT NULL,
    "entityType" "EntityType" NOT NULL,
    "entityId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "image_relations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "images_hash_key" ON "images"("hash");

-- CreateIndex
CREATE INDEX "image_relations_imageId_idx" ON "image_relations"("imageId");

-- CreateIndex
CREATE INDEX "image_relations_entityType_entityId_idx" ON "image_relations"("entityType", "entityId");

-- CreateIndex
CREATE UNIQUE INDEX "image_relations_entityType_entityId_order_key" ON "image_relations"("entityType", "entityId", "order");

-- AddForeignKey
ALTER TABLE "image_relations" ADD CONSTRAINT "image_relations_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_relations" ADD CONSTRAINT "image_relations_post_fkey" FOREIGN KEY ("entityId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_relations" ADD CONSTRAINT "image_relations_comment_fkey" FOREIGN KEY ("entityId") REFERENCES "comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
