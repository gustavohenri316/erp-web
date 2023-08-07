import { LockKey } from "phosphor-react";
import useGetUserPermissions from "../../hooks/useGetUserPermissions";

const PermissionGate = ({
  children,
  permission,
  isPage = false,
  onLoading,
}: PermissionGateProps) => {
  const userPermissions = useGetUserPermissions();

  if (userPermissions?.includes(permission as string)) {
    onLoading && onLoading(true);
    return children;
  }

  if (isPage) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col text-neutral-600">
        <LockKey size={200} weight="thin" className="text-neutral-300" />
        <span className="text-lg">
          Você não tem permissão para acessar esta página.
        </span>
      </div>
    );
  }

  return null;
};

export default PermissionGate;
