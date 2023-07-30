import PermissionGate from "../../../components/PermissionGate";
import UserInfo from "../UserInfo";
import { Fragment, useEffect } from "react";

export function Template(props: TemplateProps) {
  const {
    children,
    documentTitle = "Dashboard",
    title = "Titulo da Pagina",
    permissionPage = "view-users",
  } = props;

  useEffect(() => {
    document.title = documentTitle;
  }, []);

  return (
    <Fragment>
      <div className="w-full h-full flex flex-col">
        <div className="py-2 px-6 justify-between flex items-center">
          <span className="text-lg text-neutral-100">{title}</span>
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
