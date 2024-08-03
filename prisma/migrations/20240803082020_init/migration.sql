-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");
