import { ArrowLeft } from "phosphor-react";
import PermissionGate from "../../../components/PermissionGate";
import UserInfo from "../UserInfo";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { SelectTheme } from "../../../components/SelectTheme";

export function Template(props: TemplateProps) {
  const { findNotifications, user } = useAuth();
  const router = useNavigate();
  const {
    children,
    documentTitle = "Dashboard",
    title = "Titulo da Pagina",
    permissionPage = "view-users",
    isBack,
  } = props;

  useEffect(() => {
    document.title = documentTitle;
  }, []);
  useEffect(() => {
    document.title = documentTitle;
    if (user) {
      findNotifications(user?.id);
    }
  }, [user]);

  return (
    <Fragment>
      <div className="w-full h-full flex flex-col text-neutral-800 dark:text-neutral-100">
        <div className="py-4 px-6 justify-between flex items-center border-b dark:border-neutral-900">
          <span className="text-xl  flex gap-2 items-center justify">
            {isBack && (
              <ArrowLeft
                size={26}
                className="cursor-pointer"
                onClick={() => router(-1)}
              />
            )}
            {title}
          </span>
          <div className="flex items-center gap-4 ">
            <SelectTheme />
          </div>
        </div>
        <div className="h-full flex-1 p-4 dark:bg-neutral-800  w-full overflow-auto ">
          <div className="bg-neutral-100 dark:bg-neutral-800 p-3 flex-1 w-full h-full rounded-md">
            <PermissionGate isPage permission={permissionPage}>
              {children}
            </PermissionGate>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
