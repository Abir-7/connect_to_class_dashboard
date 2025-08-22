import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

const SearchCustom = () => {
  return (
    <div className="relative max-w-96 w-[100%]">
      <Input placeholder="Search..." className="pl-8" />
      <Search
        className="absolute text-[#359AB1] left-2 top-1/2 -translate-y-1/2"
        size={20}
      />
    </div>
  );
};

export default SearchCustom;
