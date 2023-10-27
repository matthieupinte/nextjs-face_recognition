-- CreateTable
CREATE TABLE "descriptors" (
    "id" SERIAL NOT NULL,
    "descriptors" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "descriptors_pkey" PRIMARY KEY ("id")
);
