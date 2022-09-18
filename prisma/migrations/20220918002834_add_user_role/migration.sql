-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "tb_users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
