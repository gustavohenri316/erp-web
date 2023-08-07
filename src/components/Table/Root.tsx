interface TableProps {
  children: React.ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <div className="w-full flex-1 rounded-lg">
      <div className="relative overflow-x-auto rounded-lg w-full">
        <table className="w-full text-left bg-neutral-100 dark:text-neutral-100 dark:bg-neutral-800 rounded-lg shadow my-4">
          {children}
        </table>
      </div>
    </div>
  );
}
