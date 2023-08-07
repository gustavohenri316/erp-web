interface TheadProps {
  children: React.ReactNode;
}

export function Thead({ children }: TheadProps) {
  return (
    <thead className="border-b border-neutral-300 dark:border-neutral-900">
      {children}
    </thead>
  );
}
