"use client";

import SearchForm from "@/app/(protected)/transactions/_components/search-form";
import TransactionsPageHeader from "@/app/(protected)/transactions/_components/transactions-page-header";
import { getTransactions } from "@/services/transaction";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Type } from "../../../../prisma/generated/enums";

const Transactions = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"ALL" | Type>("ALL");

  const { data: transactionList } = useQuery({
    queryKey: ["transactions", search, filter],
    queryFn: async () => {
      const params = { search, filter };
      return await getTransactions(params);
    },
  });

  return (
    <main className="w-full max-w-5xl flex flex-col space-y-4">
      <TransactionsPageHeader />
      <SearchForm onSearch={(value) => setSearch(value)} />
    </main>
  );
};

export default Transactions;
