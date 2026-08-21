import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const searchSchema = z.object({
  search: z.string(),
});

interface SearchFormProps {
  onSearch: (value: string) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema: toFormikValidationSchema(searchSchema),
    onSubmit: (values) => {
      onSearch(values.search.trim());
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      formik.handleSubmit();
    }, 500);

    return () => clearTimeout(timer);
  }, [formik.values.search]);

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <div className="relative flex items-center w-full h-10">
        <Search className="absolute left-4 h-4 w-4 text-gray-400 pointer-events-none" />
        <Input
          name="search"
          id="search"
          type="text"
          placeholder="Search transactions..."
          className="h-10 rounded-full pl-11 pr-4 py-2 bg-white placeholder:text-gray-400 text-black focus-visible:border-light-green focus-visible:ring-light-green/20 focus-visible:ring-2"
          value={formik.values.search}
          onChange={formik.handleChange}
        />
      </div>
    </form>
  );
};

export default SearchForm;
