import { forwardRef, useState } from "react";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function InputComponent({ required = false, loading, ...rest }, ref) {
    const [isTouchedAndEmpty] = useState<boolean>(false);

    let inputClasses =
      "flex-1 p-2 border dark:border-neutral-800 dark:text-neutral-100  text-neutral-800 rounded-md bg-white shadow  text-neutral-100 dark:placeholder:text-neutral-100 bg-neutral-100 max-sm:w-full outline-none placeholder:text-lg w-full disabled:bg-gray-100 disabled:text-gray-500 dark:bg-neutral-700 ";

    if (required && isTouchedAndEmpty) {
      inputClasses += "focus:ring-2 ring-red-500";
    }

    return (
      <div className="flex-1">
        <input {...rest} ref={ref} className={inputClasses} />
      </div>
    );
  }
);

Input.displayName = "Input";
