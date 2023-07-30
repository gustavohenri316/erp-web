interface PermissionGateProps {
  children?: React.ReactNode;
  permission: string;
  onLoading?: (value: boolean) => void;
  isPage?: boolean;
}
