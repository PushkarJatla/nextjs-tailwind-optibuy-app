-- AlterTable
ALTER TABLE "products" ADD COLUMN     "likedBy" TEXT[] DEFAULT ARRAY[]::TEXT[];
