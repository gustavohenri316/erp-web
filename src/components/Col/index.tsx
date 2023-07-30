export function Col({ children, ...rest }: ColProps) {
  return (
    <div
      {...rest}
      className={`${rest.className as string} flex flex-col w-full gap-1`}
    >
      {children}
    </div>
  );
}
