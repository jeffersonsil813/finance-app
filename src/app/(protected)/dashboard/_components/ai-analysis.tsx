import CustomButton from "@/components/custom-button";
import { getAIAnalysis } from "@/services/ai-analyze";
import { useQuery } from "@tanstack/react-query";
import { LucideSparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

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
    staleTime: Infinity,
  });

  return (
    <div className="col-span-12 lg:col-span-4 h-full bg-linear-to-br from-[#F0FDF4] via-[#ECFDF5] to-[#DCFCE7] border border-[#BBF7D0] rounded-2xl p-5 flex flex-col shadow-sm">
      <div className={`flex items-center gap-2.5 ${data ? "mb-1" : "mb-3"}`}>
        <div className="w-8 h-8 bg-[#16A34A] text-white rounded-xl flex items-center justify-center shadow-sm">
          <LucideSparkles className="w-3.75 h-3.75" />
        </div>

        <p className="text-sm font-semibold text-black">AI Analysis</p>
      </div>

      <div className="text-xs text-[#374151] leading-[1.6] mb-4 flex-1 prose prose-sm prose-headings:text-sm prose-headings:font-semibold prose-headings:mt-3 prose-headings:mb-1 prose-p:my-1.5 prose-strong:text-[#166534] max-w-none">
        {data?.analysis ? (
          <ReactMarkdown
            components={{
              h3: ({ children }) => (
                <h3 className="text-xs font-bold text-[#166534] mt-3 mb-1">
                  {children}
                </h3>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-[#166534]">
                  {children}
                </strong>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-4 space-y-1">{children}</ul>
              ),
              p: ({ children }) => <p className="my-1.5">{children}</p>,
            }}
          >
            {data.analysis}
          </ReactMarkdown>
        ) : (
          "Get AI-powered insights about your spending patterns, savings trends, and personalized recommendations based on this month's data."
        )}
      </div>

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
