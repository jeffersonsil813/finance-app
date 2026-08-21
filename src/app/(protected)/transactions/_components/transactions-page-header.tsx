import CustomButton from "@/components/custom-button";
import { Plus } from "lucide-react";

const TransactionsPageHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-[20px] font-semibold">Transactions</h1>
      <CustomButton startIcon={Plus}>
        <span className="hidden sm:inline">Add</span>
      </CustomButton>
    </div>
  );
};

export default TransactionsPageHeader;
