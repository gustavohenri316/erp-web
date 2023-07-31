import { useEffect, useState } from "react";

import { MagnifyingGlass } from "phosphor-react";

export function Search({ handleSearch, placeholder }: SearchProps) {
  const [value, setValue] = useState("");
  useEffect(() => {
    handleSearch && handleSearch(value);
  }, [value]);

  return (
    <div className="flex-1">
      <div className=" border border-1  rounded-sm w-full flex items-center ">
        <input
          className="w-full  bg-transparent py-2 outline-none px-2 text-base"
          value={value}
          placeholder={placeholder}
          onChange={(event) => setValue(event.target.value)}
        />
        <MagnifyingGlass size={22} className="mr-4 text-neutral-500" />
      </div>
    </div>
  );
}
