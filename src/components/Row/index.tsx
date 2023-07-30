export function Row({ children, ...rest }: RowProps) {
  return (
    <div {...rest} className={`${rest.className as string} flex-1 flex gap-4`}>
      {children}
    </div>
  );
}
