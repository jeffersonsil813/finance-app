import TransactionForm from "@/components/transaction-modal/transaction-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Transaction } from "../../../prisma/generated/browser";

interface TransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction?: Transaction | null;
}

const TransactionModal = ({
  open,
  onOpenChange,
  transaction,
}: TransactionModalProps) => {
  const isEditing = !!transaction;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-black">
            {isEditing ? "Edit Transaction" : "New Transaction"}
          </DialogTitle>
        </DialogHeader>

        <TransactionForm
          defaultValues={transaction ?? undefined}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TransactionModal;
