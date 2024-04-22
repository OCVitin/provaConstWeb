/*
  Warnings:

  - You are about to alter the column `chatId` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chatId" BIGINT NOT NULL,
    "userName" TEXT,
    "email" TEXT NOT NULL
);
INSERT INTO "new_User" ("chatId", "email", "id", "userName") SELECT "chatId", "email", "id", "userName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;