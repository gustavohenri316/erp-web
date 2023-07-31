type ButtonIconSize = "sm" | "md" | "lg";
type ButtonIconVariant = "primary" | "secondary" | "success" | "danger";

interface ButtonIconProps {
  size: ButtonIconSize;
  variant: ButtonIconVariant;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
