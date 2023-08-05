import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { Spinner } from "../Spinner";
import { LockKey } from "phosphor-react";
import useGetUserPermissions from "../../hooks/useGetUserPermissions";
import { getPermissionsUser } from "../../service/user.service";

const PermissionGate = ({
  children,
  permission,
  isPage = false,
  onLoading,
}: PermissionGateProps) => {
  const userPermissions = useGetUserPermissions();
  const { "Dashboard.UserToken": Token } = parseCookies();
  const [key, setKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchPermission() {
    try {
      const response: any = await getPermissionsUser({
        id: Token,
        name: permission,
      });
      setKey(response);
    } catch (error) {
      console.error("Error fetching permission:", error);
      setKey(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPermission();
  }, [Token, permission]);

  if (loading) {
    if (isPage) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner size={24} />
        </div>
      );
    }
  }

  if (userPermissions?.includes(key as string)) {
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
