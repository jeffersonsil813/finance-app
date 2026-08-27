import { api } from "@/lib/api-client";

interface AnalysisParams {
  year: number;
  month: number;
}

export async function getAIAnalysis(analysisParams: AnalysisParams) {
  return api<{ analysis: string }>("/api/ai/analyze", {
    method: "POST",
    body: analysisParams,
  });
}
