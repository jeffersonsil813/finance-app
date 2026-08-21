"use client";

import ListSection from "@/app/(protected)/transactions/_components/list-section";
import PageFilters from "@/app/(protected)/transactions/_components/page-filters";
import PageHeader from "@/app/(protected)/transactions/_components/page-header";
import SearchForm from "@/app/(protected)/transactions/_components/search-form";
import TotalsSection from "@/app/(protected)/transactions/_components/totals-section";
import { getTransactions } from "@/services/transaction";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Type } from "../../../../prisma/generated/enums";

const Transactions = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"ALL" | Type>("ALL");

  const { data: transactionData } = useQuery({
    queryKey: ["transactions", search, filter],
    queryFn: async () => {
      const params = { search, filter };
      return await getTransactions(params);
    },
  });

  return (
    <main className="w-full max-w-5xl flex flex-col space-y-4">
      <PageHeader />
      <SearchForm onSearch={(value) => setSearch(value)} />

      <div className="flex items-center justify-between">
        <PageFilters
          currentFilter={filter}
          onFilterChange={(value) => setFilter(value)}
        />
        <span className="text-xs text-gray-400">{`${transactionData?.transactions?.length} items`}</span>
      </div>

      <TotalsSection
        totalIn={transactionData?.summary?.totalIn || 0}
        totalOut={transactionData?.summary?.totalOut || 0}
        filter={filter}
      />

      <ListSection transactions={transactionData?.transactions || []} />
    </main>
  );
};

export default Transactions;
