import type { LucideIcon } from "lucide-react";
import {
  Award,
  Book,
  BookOpen,
  Briefcase,
  Building,
  Building2,
  Bus,
  Car,
  Clapperboard,
  CreditCard,
  Droplet,
  Flame,
  Fuel,
  Gamepad2,
  Gift,
  GraduationCap,
  HeartPulse,
  House,
  KeyRound,
  Landmark,
  Laptop,
  MoreHorizontal,
  PawPrint,
  Percent,
  Phone,
  PiggyBank,
  Pill,
  Plane,
  Popcorn,
  RotateCcw,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Smile,
  Stethoscope,
  Tag,
  TrendingUp,
  Tv,
  User,
  Utensils,
  UtensilsCrossed,
  Wallet,
  Wifi,
  Wrench,
  Zap,
} from "lucide-react";
import {
  ExpenseCategory,
  IncomeCategory,
  Type,
} from "../../prisma/generated/enums";

export const BCRYPT_SALT_ROUNDS = 10;

export const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: House },
  { title: "Transactions", url: "/transactions", icon: CreditCard },
  { title: "Profile", url: "/profile", icon: User },
];

interface CategoryConfig<T> {
  value: T;
  label: string;
  representativeColor: string;
  icon: LucideIcon;
}

const EXPENSE_CATEGORY_CONFIG: Record<
  ExpenseCategory,
  CategoryConfig<ExpenseCategory>
> = {
  FOOD: {
    value: "FOOD",
    label: "Food",
    representativeColor: "#F59E0B",
    icon: Utensils,
  },
  RESTAURANT: {
    value: "RESTAURANT",
    label: "Restaurant",
    representativeColor: "#EF4444",
    icon: UtensilsCrossed,
  },
  SUPERMARKET: {
    value: "SUPERMARKET",
    label: "Supermarket",
    representativeColor: "#10B981",
    icon: ShoppingCart,
  },
  TRANSPORT: {
    value: "TRANSPORT",
    label: "Transport",
    representativeColor: "#3B82F6",
    icon: Car,
  },
  FUEL: {
    value: "FUEL",
    label: "Fuel",
    representativeColor: "#6366F1",
    icon: Fuel,
  },
  PUBLIC_TRANSPORT: {
    value: "PUBLIC_TRANSPORT",
    label: "Public Transport",
    representativeColor: "#0EA5E9",
    icon: Bus,
  },
  VEHICLE_MAINTENANCE: {
    value: "VEHICLE_MAINTENANCE",
    label: "Vehicle Maintenance",
    representativeColor: "#64748B",
    icon: Wrench,
  },
  HOUSING: {
    value: "HOUSING",
    label: "Housing",
    representativeColor: "#8B5CF6",
    icon: House,
  },
  RENT: {
    value: "RENT",
    label: "Rent",
    representativeColor: "#A855F7",
    icon: KeyRound,
  },
  CONDOMINIUM: {
    value: "CONDOMINIUM",
    label: "Condominium",
    representativeColor: "#D946EF",
    icon: Building2,
  },
  WATER: {
    value: "WATER",
    label: "Water",
    representativeColor: "#06B6D4",
    icon: Droplet,
  },
  ELECTRICITY: {
    value: "ELECTRICITY",
    label: "Electricity",
    representativeColor: "#EAB308",
    icon: Zap,
  },
  GAS: {
    value: "GAS",
    label: "Gas",
    representativeColor: "#F97316",
    icon: Flame,
  },
  INTERNET: {
    value: "INTERNET",
    label: "Internet",
    representativeColor: "#14B8A6",
    icon: Wifi,
  },
  PHONE: {
    value: "PHONE",
    label: "Phone",
    representativeColor: "#0284C7",
    icon: Phone,
  },
  HEALTH: {
    value: "HEALTH",
    label: "Health",
    representativeColor: "#EC4899",
    icon: HeartPulse,
  },
  PHARMACY: {
    value: "PHARMACY",
    label: "Pharmacy",
    representativeColor: "#F43F5E",
    icon: Pill,
  },
  MEDICAL: {
    value: "MEDICAL",
    label: "Medical",
    representativeColor: "#10B981",
    icon: Stethoscope,
  },
  DENTIST: {
    value: "DENTIST",
    label: "Dentist",
    representativeColor: "#059669",
    icon: Smile,
  },
  EDUCATION: {
    value: "EDUCATION",
    label: "Education",
    representativeColor: "#4F46E5",
    icon: GraduationCap,
  },
  COURSES: {
    value: "COURSES",
    label: "Courses",
    representativeColor: "#4338CA",
    icon: BookOpen,
  },
  BOOKS: {
    value: "BOOKS",
    label: "Books",
    representativeColor: "#7C3AED",
    icon: Book,
  },
  ENTERTAINMENT: {
    value: "ENTERTAINMENT",
    label: "Entertainment",
    representativeColor: "#818CF8",
    icon: Popcorn,
  },
  STREAMING: {
    value: "STREAMING",
    label: "Streaming",
    representativeColor: "#E11D48",
    icon: Tv,
  },
  GAMES: {
    value: "GAMES",
    label: "Games",
    representativeColor: "#9333EA",
    icon: Gamepad2,
  },
  MOVIES: {
    value: "MOVIES",
    label: "Movies",
    representativeColor: "#C084FC",
    icon: Clapperboard,
  },
  SHOPPING: {
    value: "SHOPPING",
    label: "Shopping",
    representativeColor: "#F472B6",
    icon: ShoppingBag,
  },
  CLOTHING: {
    value: "CLOTHING",
    label: "Clothing",
    representativeColor: "#FB7185",
    icon: Shirt,
  },
  ELECTRONICS: {
    value: "ELECTRONICS",
    label: "Electronics",
    representativeColor: "#38BDF8",
    icon: Laptop,
  },
  TRAVEL: {
    value: "TRAVEL",
    label: "Travel",
    representativeColor: "#2DD4BF",
    icon: Plane,
  },
  INSURANCE: {
    value: "INSURANCE",
    label: "Insurance",
    representativeColor: "#475569",
    icon: ShieldCheck,
  },
  TAXES: {
    value: "TAXES",
    label: "Taxes",
    representativeColor: "#DC2626",
    icon: Landmark,
  },
  PETS: {
    value: "PETS",
    label: "Pets",
    representativeColor: "#FB923C",
    icon: PawPrint,
  },
  OTHER: {
    value: "OTHER",
    label: "Other",
    representativeColor: "#94A3B8",
    icon: MoreHorizontal,
  },
};

const INCOME_CATEGORY_CONFIG: Record<
  IncomeCategory,
  CategoryConfig<IncomeCategory>
> = {
  SALARY: {
    value: "SALARY",
    label: "Salary",
    representativeColor: "#10B981",
    icon: Wallet,
  },
  BONUS: {
    value: "BONUS",
    label: "Bonus",
    representativeColor: "#059669",
    icon: Award,
  },
  FREELANCE: {
    value: "FREELANCE",
    label: "Freelance",
    representativeColor: "#3B82F6",
    icon: Briefcase,
  },
  COMMISSION: {
    value: "COMMISSION",
    label: "Commission",
    representativeColor: "#6366F1",
    icon: Percent,
  },
  INVESTMENT: {
    value: "INVESTMENT",
    label: "Investment",
    representativeColor: "#8B5CF6",
    icon: TrendingUp,
  },
  DIVIDENDS: {
    value: "DIVIDENDS",
    label: "Dividends",
    representativeColor: "#A855F7",
    icon: PiggyBank,
  },
  RENTAL: {
    value: "RENTAL",
    label: "Rental",
    representativeColor: "#0EA5E9",
    icon: Building,
  },
  REFUND: {
    value: "REFUND",
    label: "Refund",
    representativeColor: "#14B8A6",
    icon: RotateCcw,
  },
  GIFT: {
    value: "GIFT",
    label: "Gift",
    representativeColor: "#EC4899",
    icon: Gift,
  },
  SALE: {
    value: "SALE",
    label: "Sale",
    representativeColor: "#F59E0B",
    icon: Tag,
  },
  OTHER: {
    value: "OTHER",
    label: "Other",
    representativeColor: "#94A3B8",
    icon: MoreHorizontal,
  },
};

export const EXPENSE_CATEGORY_OPTIONS = Object.values(EXPENSE_CATEGORY_CONFIG);
export const INCOME_CATEGORY_OPTIONS = Object.values(INCOME_CATEGORY_CONFIG);

interface TransactionType<T> {
  value: T;
  label: string;
}

const TRANSACTION_TYPE_CONFIG: Record<Type, TransactionType<Type>> = {
  EXPENSE: {
    value: "EXPENSE",
    label: "Expense",
  },
  INCOME: {
    value: "INCOME",
    label: "Income",
  },
};

export const TRANSACTION_TYPE_OPTIONS = Object.values(TRANSACTION_TYPE_CONFIG);

const now = new Date();
export const currentMonth = now.getUTCMonth() + 1;
export const currentYear = now.getUTCFullYear();
