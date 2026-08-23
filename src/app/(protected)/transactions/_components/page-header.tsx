import CustomButton from "@/components/custom-button";
import TransactionModal from "@/components/transaction-modal/transaction-modal";
import { Plus } from "lucide-react";
import { useState } from "react";

const PageHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenTransactionModal = () => setModalOpen(true);

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-[20px] font-semibold">Transactions</h1>
      <CustomButton startIcon={Plus} onClick={handleOpenTransactionModal}>
        <span className="hidden sm:inline">Add</span>
      </CustomButton>

      <TransactionModal onOpenChange={setModalOpen} open={modalOpen} />
    </div>
  );
};

export default PageHeader;
