interface FilterProps {
  label?: string;
  listLabel?: string;
  value?: string | number;
  handleValue?: (value: string) => void;
  array?: Array<any>;
  isDefault?: boolean;
  defaultLabel?: string;
  isSelected?: boolean;
  selectedDefault?: string | number;
  isloading?: boolean;
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