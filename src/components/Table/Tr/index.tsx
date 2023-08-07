interface TrProps {
  children: React.ReactNode;
  isHeader?: boolean;
}

export function Tr({ children, isHeader }: TrProps) {
  return (
    <tr
      className={`${
        !isHeader &&
        "border-b border-neutral-300 hover:bg-neutral-400 dark:hover:bg-neutral-900 dark:border-neutral-900 dark:text-neutral-100"
      }`}
    >
      {children}
    </tr>
  );
}
