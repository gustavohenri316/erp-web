import { CaretDown, CaretUp } from "phosphor-react";

import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import PermissionGate from "../../../../components/PermissionGate";
import { useNavigate } from "react-router-dom";

export function SidebarItem({ item, open, openItems, onToggleOpen }: any) {
  const router = useNavigate();
  const { "Dashboard.UserToken-notifications-unread-count": Count } =
    parseCookies();
  const [countNotifications, setCountNotifications] = useState(0);

  const handleClick = () => {
    if (item.isOpen) {
      onToggleOpen();
    } else {
      router(item.path);
    }
  };

  useEffect(() => {
    if (Count) {
      setCountNotifications(Number(Count));
    }
  }, [Count]);

  return (
    <PermissionGate permission={item.permission}>
      <button
        title={item.name}
        onClick={handleClick}
        className={`w-full flex mt-1 text-start gap-4 rounded-md p-2 text-neutral-100 invisible-hover hover:bg-gray-600 transition
        ${!open ? " justify-center" : "justify-between items-center"}
        `}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {item.icon}
            {open && <span>{item.name}</span>}
          </div>
          <div>
            {countNotifications > 0 && item.name === "Notificações" && (
              <span className="text-sm text-end rounded-full bg-green-300 w-6 h-6 justify-center flex items-center text-neutral-800">
                {Count}
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
        <div className="p-1 bg-gray-600 rounded-md mt-1 text-neutral-100">
          {item.open.map((subItem: any) => (
            <button
              key={subItem.name}
              title={subItem.name}
              onClick={() => router(subItem.path)}
              className={`w-full flex mt-1 text-start gap-4 rounded-md p-2 text-neutral-100 hover:bg-gray-500 transition
                ${!open ? " justify-center" : "justify-between items-center"}
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
