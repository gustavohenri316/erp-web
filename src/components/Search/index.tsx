import { useState } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { MagnifyingGlass } from "phosphor-react";
export function Search({ handleSearch, loading, placeholder }: SearchProps) {
  const [value, setValue] = useState("");

  function handleClick() {
    handleSearch && handleSearch(value);
  }

  return (
    <div className="flex-1 flex gap-4">
      <Input
        value={value}
        placeholder={placeholder}
        onChange={(event) => setValue(event.target.value)}
        loading={loading}
      />

      <Button variant="outline-primary" onClick={handleClick} loading={loading}>
        <MagnifyingGlass size={22} />
      </Button>
    </div>
  );
}
