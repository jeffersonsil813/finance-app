import { Badge } from "@/components/ui/badge";
import { Type } from "../../../../../prisma/generated/enums";

const options = [
  { label: "All", value: "ALL", styleWhenActive: "bg-black text-white" },
  {
    label: "Income",
    value: Type.INCOME,
    styleWhenActive:
      "bg-[color-mix(in_srgb,var(--color-green-600)_15%,white)] text-green-600",
  },
  {
    label: "Expenses",
    value: Type.EXPENSE,
    styleWhenActive:
      "bg-[color-mix(in_srgb,var(--color-red-600)_15%,white)] text-red-600",
  },
];

interface PageFiltersProps {
  currentFilter: "ALL" | Type;
  onFilterChange: (filter: "ALL" | Type) => void;
}

const PageFilters = ({ currentFilter, onFilterChange }: PageFiltersProps) => {
  return (
    <div className="flex items-center gap-2">
      {options.map((option) => {
        const isActive = currentFilter === option.value;

        return (
          <Badge
            key={option.value}
            variant={isActive ? "default" : "outline"}
            onClick={() => onFilterChange(option.value as "ALL" | Type)}
            className={`rounded-full p-3 text-xs cursor-default transition-colors ${
              isActive
                ? option.styleWhenActive
                : "bg-white text-gray-400 border-transparent hover:border-gray-300"
            }`}
          >
            {option.label}
          </Badge>
        );
      })}
    </div>
  );
};

export default PageFilters;
