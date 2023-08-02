import { ArrowLeft } from "phosphor-react";
import PermissionGate from "../../../components/PermissionGate";
import UserInfo from "../UserInfo";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

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
      <div className="w-full h-full flex flex-col">
        <div className="py-4 px-6 justify-between flex items-center">
          <span className="text-xl text-neutral-100 flex gap-2 items-center justify-center">
            {isBack && (
              <ArrowLeft
                size={26}
                className="cursor-pointer"
                onClick={() => router(-1)}
              />
            )}
            {title}
          </span>
          <UserInfo />
        </div>
        <div className="h-full flex-1 bg-white rounded-tl-md p-6 w-full overflow-auto">
          <PermissionGate isPage permission={permissionPage}>
            {children}
          </PermissionGate>
        </div>
      </div>
    </Fragment>
  );
}
