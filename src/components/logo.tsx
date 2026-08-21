import { TrendingUp } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex flex-nowrap gap-2 items-center justify-center">
      <div className="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center">
        <TrendingUp className="text-white" width={18} height={18} />
      </div>
      <h1 className="font-semibold text-lg text-black">Finance</h1>
    </div>
  );
};

export default Logo;
