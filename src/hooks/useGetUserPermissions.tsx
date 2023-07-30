import { parseCookies } from "nookies";

const useGetUserPermissions = () => {
  const { "Dashboard.UserToken-permissions": Permissions } = parseCookies();
  return Permissions;
};

export default useGetUserPermissions;
