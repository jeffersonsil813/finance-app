import CustomButton from "@/components/custom-button";
import { getAIAnalysis } from "@/services/ai-analyze";
import { useQuery } from "@tanstack/react-query";
import { LucideSparkles } from "lucide-react";

interface AIAnalysisProps {
  year: number;
  month: number;
}

const AIAnalysis = ({ month, year }: AIAnalysisProps) => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["AI Analysis", year, month],
    queryFn: async () => {
      const params = { year, month };
      return await getAIAnalysis(params);
    },
    enabled: false,
  });

  return (
    <div className="col-span-12 lg:col-span-4 h-full bg-linear-to-br from-[#F0FDF4] via-[#ECFDF5] to-[#DCFCE7] border border-[#BBF7D0] rounded-2xl p-5 flex flex-col shadow-sm">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 bg-[#16A34A] text-white rounded-xl flex items-center justify-center shadow-sm">
          <LucideSparkles className="w-3.75 h-3.75" />
        </div>

        <p className="text-sm font-semibold text-black">AI Analysis</p>
      </div>

      <p className="text-xs text-[#374151] leading-[1.6] mb-4 flex-1">
        {data?.analysis ??
          "Get AI-powered insights about your spending patterns, savings trends, and personalized recommendations based on this month's data."}
      </p>

      <CustomButton
        startIcon={LucideSparkles}
        disabled={isFetching}
        onClick={() => refetch()}
      >
        {isFetching ? "Generating..." : "Generate Analysis"}
      </CustomButton>
    </div>
  );
};

export default AIAnalysis;
