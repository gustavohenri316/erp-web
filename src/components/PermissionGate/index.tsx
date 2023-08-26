import { LockKey } from "phosphor-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const PermissionGate = ({
  children,
  permission,
  isPage = false,
  onLoading,
}: PermissionGateProps) => {
  const { user } = useContext(AuthContext);

  if (user?.permissions?.includes(permission as string)) {
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
