export function Button({
  children,
  variant,
  loading,
  type = "button",
  ...rest
}: ButtonProps) {
  let buttonClasses =
    "p-2 px-4 border rounded-md hover:brightness-90 max-sm:w-full disabled:cursor-not-allowed disabled:brightness-80 flex items-center justify-center gap-4 ";

  if (variant) {
    const validVariants: ButtonProps["variant"][] = [
      "primary",
      "success",
      "secondary",
      "danger",
      "warning",
      "outline-primary",
      "outline-success",
      "outline-secondary",
      "outline-danger",
      "outline-warning",
    ];

    if (!validVariants.includes(variant)) {
      console.warn(
        `Button component received an invalid 'variant' prop: ${variant}`
      );
      variant = undefined;
    }
  } else {
    variant = "primary";
  }

  switch (variant) {
    case "primary":
      buttonClasses += "bg-blue-600 text-neutral-100";
      break;
    case "success":
      buttonClasses +=
        "bg-green-600 dark:bg-green-950 text-neutral-100 dark:border-green-950";
      break;
    case "secondary":
      buttonClasses +=
        "bg-gray-600 dark:bg-gray-950 text-neutral-100 dark:border-gray-950 dark:border-gray-950";
      break;
    case "danger":
      buttonClasses +=
        "bg-red-600 text-neutral-100 dark:bg-red-950 text-neutral-100 dark:border-red-950";
      break;
    case "warning":
      buttonClasses +=
        "bg-yellow-600 text-neutral-100 dark:bg-yellow-950 text-neutral-100 dark:border-yellow-950";
      break;
    case "outline-primary":
      buttonClasses += "border-blue-600 text-blue-600 ";
      break;
    case "outline-success":
      buttonClasses +=
        "border-green-600 text-gray-800 dark:border-green-800 dark:border-green-800 dark:text-green-800";
      break;
    case "outline-secondary":
      buttonClasses +=
        "border-neutral-800 text-neutral-800 dark:border-neutral-200 dark:text-neutral-200";
      break;
    case "outline-danger":
      buttonClasses += "border-red-600 text-red-600";
      break;
    case "outline-warning":
      buttonClasses += "border-yellow-600 text-yellow-600";
      break;
    default:
      buttonClasses += "bg-blue-600";
  }

  return (
    <div>
      <button {...rest} className={rest.className ?? buttonClasses} type={type}>
        {children}
      </button>
    </div>
  );
}
