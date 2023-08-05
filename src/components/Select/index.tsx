import { useState } from "react";
import { Skeleton } from "../Skeleton";

export function Select({
  required = false,
  children,
  loading,
  ...rest
}: SelectProps) {
  const [isTouchedAndEmpty] = useState<boolean>(false);

  let SelectClasses =
    "flex-1 p-2 border rounded-md dark:text-neutral-100 text-neutral-800 shadow outline-none placeholder:text-lg w-full dark:bg-neutral-700 dark:border-neutral-800 ";

  if (required && isTouchedAndEmpty) {
    SelectClasses += "focus:ring-2 ring-red-500";
  }

  return (
    <div className="flex-1">
      <Skeleton loading={loading as boolean}>
        <select {...rest} className={SelectClasses} onChange={rest.onChange}>
          {children}
        </select>
      </Skeleton>
    </div>
  );
}
