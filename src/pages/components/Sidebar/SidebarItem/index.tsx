import { CaretDown, CaretUp } from "phosphor-react";

import PermissionGate from "../../../../components/PermissionGate";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";

export function SidebarItem({ item, open, openItems, onToggleOpen }: any) {
  const router = useNavigate();
  const { countNotifications } = useAuth();
  const pathname = window.location.pathname;
  console.log(pathname);

  const handleClick = () => {
    if (item.isOpen) {
      onToggleOpen();
    } else {
      router(item.path);
    }
  };

  return (
    <PermissionGate permission={item.permission}>
      <button
        title={item.name}
        onClick={handleClick}
        className={`w-full flex mt-1  gap-4 rounded-sm p-2 text-neutral-100 invisible-hover hover:bg-green-500 transition
       
       ${pathname === item.path ? "bg-green-500" : ""}
        ${
          !open
            ? " justify-center text-center"
            : "justify-between items-center text-start"
        }
        `}
      >
        <div
          className={`flex items-center ${
            open ? "justify-between" : "justify-center"
          } w-full`}
        >
          <div className="flex items-center gap-2">
            {item.icon}
            {open && <span>{item.name}</span>}
          </div>

          <div>
            {countNotifications &&
              Number(countNotifications) > 0 &&
              item.name === "Notificações" && (
                <span className="text-sm text-end rounded-full bg-green-800 w-6 h-6 justify-center flex items-center text-neutral-100">
                  {countNotifications}
                </span>
              )}
          </div>
        </div>
        {item.isOpen && open && (
          <div className="text-end flex justify-end items-end w-full">
            {!openItems ? (
              <CaretDown size={16} weight="bold" />
            ) : (
              <CaretUp size={16} weight="bold" />
            )}
          </div>
        )}
      </button>
      {item.isOpen && openItems && (
        <div className="p-1 bg-green-600 rounded-sm mt-1 text-neutral-100">
          {item.open.map((subItem: any) => (
            <button
              key={subItem.name}
              title={subItem.name}
              onClick={() => router(subItem.path)}
              className={`w-full flex mt-1 text-start gap-4 rounded-sm p-2 text-neutral-100 hover:bg-green-500 transition
                ${!open ? " justify-center" : "justify-between items-center"}
                ${pathname === subItem.path ? "bg-green-500" : ""}
                `}
            >
              <div className="flex items-center gap-4">
                {subItem.icon}
                {open && <span>{subItem.name}</span>}
              </div>
            </button>
          ))}
        </div>
      )}
    </PermissionGate>
  );
}
