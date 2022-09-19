/*
  Warnings:

  - You are about to drop the column `author` on the `tb_sayings` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `tb_sayings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_sayings" DROP COLUMN "author",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tb_sayings" ADD CONSTRAINT "tb_sayings_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
