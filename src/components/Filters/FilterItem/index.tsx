export function FilterItem(props: FilterItemProps) {
  return (
    <button
      {...props}
      className={`flex flex-col gap-4 rounded-sm cursor-pointer px-2 py-2 whitespace-nowrap hover:bg-neutral-100
      ${props.className}
      `}
    >
      <span>{props.children}</span>
    </button>
  );
}
