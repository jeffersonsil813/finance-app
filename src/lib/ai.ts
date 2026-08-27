import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { Transaction } from "../../prisma/generated/client";

export async function generateFinancialAnalysis(transactions: Transaction[]) {
  const anonymizedData = transactions.map((t) => ({
    type: t.type,
    category: t.expenseCategory ?? t.incomeCategory,
    amount: t.amount,
    date: t.date,
    description: t.description,
  }));

  const prompt = `
Act as a personal financial consultant.
Analyze the following financial data for the user's current month:
${JSON.stringify(anonymizedData)}

All monetary values are in Brazilian Reais (BRL). Always format currency values using the "R$" symbol and Brazilian number format (e.g., "R$ 2.400,00", using "." as thousands separator and "," as decimal separator). Never use "$" or USD formatting.

Return a response in Markdown divided into:
1. Summary of the month's financial behavior.
2. Category with the highest alert/excessive spending.
3. 3 practical, personalized tips for saving next month.

Formatting rules:
- Use "###" for section headings, short (2-4 words).
- Use short paragraphs (2-3 sentences max) instead of long bullet chains.
- Bold only the most important numbers or category names, not every phrase.
- Avoid nested lists — keep formatting flat and easy to scan in a narrow card.
`;

  const { text } = await generateText({
    model: google("gemini-3.6-flash"),
    prompt,
  });

  return text;
}
