/*
  Warnings:

  - Added the required column `title` to the `documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "user_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
