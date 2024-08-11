-- CreateTable
CREATE TABLE "User" (
    "auth0Id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "addressLine1" TEXT,
    "city" TEXT,
    "country" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
