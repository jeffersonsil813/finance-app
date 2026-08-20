import { CreditCard, House, User } from "lucide-react";

export const BCRYPT_SALT_ROUNDS = 10;

export const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: House },
  { title: "Transactions", url: "/transactions", icon: CreditCard },
  { title: "Profile", url: "/profile", icon: User },
];
