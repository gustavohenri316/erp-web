interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  variant?:
    | "primary"
    | "success"
    | "secondary"
    | "danger"
    | "warning"
    | "outline-primary"
    | "outline-success"
    | "outline-secondary"
    | "outline-danger"
    | "outline-warning";
}
