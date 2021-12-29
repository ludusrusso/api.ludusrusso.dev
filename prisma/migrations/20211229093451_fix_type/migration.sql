/*
  Warnings:

  - You are about to drop the column `resouces` on the `Episode` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Episode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "body" TEXT NOT NULL DEFAULT '',
    "resources" TEXT,
    "image" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "scheduledTime" DATETIME NOT NULL,
    CONSTRAINT "Episode_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Participant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Episode" ("body", "createdAt", "description", "hostId", "id", "image", "scheduledTime", "title", "updatedAt") SELECT "body", "createdAt", "description", "hostId", "id", "image", "scheduledTime", "title", "updatedAt" FROM "Episode";
DROP TABLE "Episode";
ALTER TABLE "new_Episode" RENAME TO "Episode";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
