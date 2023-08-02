import { useEffect, useState } from "react";

import { MagnifyingGlass } from "phosphor-react";

export function Search({ handleSearch, placeholder }: SearchProps) {
  const [value, setValue] = useState("");
  useEffect(() => {
    handleSearch && handleSearch(value);
  }, [value]);

  return (
    <div className="flex-1">
      <div className=" border border-1 dark:border-neutral-900  rounded-md w-full flex items-center ">
        <input
          className="w-full  bg-transparent py-2 outline-none px-2 text-base dark:text-neutral-100 dark:placeholder:text-neutral-100"
          value={value}
          placeholder={placeholder}
          onChange={(event) => setValue(event.target.value)}
        />
        <MagnifyingGlass size={22} className="mr-4 text-neutral-500" />
      </div>
    </div>
  );
}
