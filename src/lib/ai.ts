import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { Transaction } from "../../prisma/generated/client";

export async function generateFinancialAnalysis(transactions: Transaction[]) {
  const anonymizedData = transactions.map((t) => ({
    type: t.type,
    category: t.expenseCategory ?? t.incomeCategory,
    amount: t.amount,
    date: t.date,
  }));

  const prompt = `
Act as a personal financial consultant.
Analyze the following financial data for the user's current month:
${JSON.stringify(anonymizedData)}

Return a response in Markdown divided into:
1. Summary of the month's financial behavior.
2. Category with the highest alert/excessive spending.
3. 3 practical, personalized tips for saving next month.
`;

  const { text } = await generateText({
    model: google("gemini-3.6-flash"),
    prompt,
  });

  return text;
}
