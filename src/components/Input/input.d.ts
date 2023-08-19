interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  ref?: ForwardedRef<HTMLInputElement>;
  loading?: boolean;
  error?: string;
}
