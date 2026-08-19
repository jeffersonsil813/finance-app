-- CreateEnum
CREATE TYPE "Type" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('FOOD', 'RESTAURANT', 'SUPERMARKET', 'TRANSPORT', 'FUEL', 'PUBLIC_TRANSPORT', 'VEHICLE_MAINTENANCE', 'HOUSING', 'RENT', 'CONDOMINIUM', 'WATER', 'ELECTRICITY', 'GAS', 'INTERNET', 'PHONE', 'HEALTH', 'PHARMACY', 'MEDICAL', 'DENTIST', 'EDUCATION', 'COURSES', 'BOOKS', 'ENTERTAINMENT', 'STREAMING', 'GAMES', 'MOVIES', 'SHOPPING', 'CLOTHING', 'ELECTRONICS', 'TRAVEL', 'INSURANCE', 'TAXES', 'PETS', 'OTHER');

-- CreateEnum
CREATE TYPE "IncomeCategory" AS ENUM ('SALARY', 'BONUS', 'FREELANCE', 'COMMISSION', 'INVESTMENT', 'DIVIDENDS', 'RENTAL', 'REFUND', 'GIFT', 'SALE', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "Type" NOT NULL,
    "expenseCategory" "ExpenseCategory",
    "incomeCategory" "IncomeCategory",
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
