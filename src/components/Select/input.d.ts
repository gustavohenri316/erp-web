interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  required?: boolean;
  ref?: ForwardedRef<HTMLSelectElement>;
  loading?: boolean
  children: ReactNode
  onChange?: (event: any) => void;
}