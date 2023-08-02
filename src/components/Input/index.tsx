import { forwardRef, useState } from "react";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function InputComponent({ required = false, loading, ...rest }, ref) {
    const [isTouchedAndEmpty] = useState<boolean>(false);

    let inputClasses =
      "flex-1 p-2 border dark:border-neutral-800 rounded-md  outline-none placeholder:text-lg w-full disabled:bg-gray-100 disabled:text-gray-500 dark:bg-neutral-700 ";

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
