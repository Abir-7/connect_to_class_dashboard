import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface SearchCustomProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchCustom: React.FC<SearchCustomProps> = ({ value, onChange }) => {
  return (
    <div className="relative max-w-96 w-full">
      <Input
        placeholder="Search..."
        className="pl-8"
        value={value}
        onChange={onChange}
      />
      <Search
        className="absolute text-[#359AB1] left-2 top-1/2 -translate-y-1/2"
        size={20}
      />
    </div>
  );
};

export default SearchCustom;
