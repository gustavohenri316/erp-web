"use client";
import { useState } from "react";
import { SignOut, TextAlignLeft } from "phosphor-react";
import { routers } from "./routerLink";
import { SidebarItem } from "./SidebarItem";
import UserInfo from "../UserInfo";
import { destroyCookie } from "nookies";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [openItems, setOpenItems] = useState(
    new Array(routers.length).fill(false)
  );

  const handleToggleOpenItem = (index: number) => {
    const newOpenItems = [...openItems];
    newOpenItems[index] = !newOpenItems[index];
    setOpenItems(newOpenItems);
  };

  function handleOpen() {
    setOpen(!open);
  }

  function sigOut() {
    destroyCookie(null, "Dashboard.UserToken");
    destroyCookie(null, "Dashboard.UserToken-permissions");
    window.location.href = "/";
  }

  return (
    <div
      className={` ${
        open
          ? "w-72  max-sm:bg-green-600  max-sm:w-screen max-sm:h-screen "
          : "w-24 max-sm:h-8 max-sm:w-10 max-sm:flex max-sm:items-center max-sm:justify-center"
      } p-4 m-4 rounded-2xl max-sm:z-50 max-sm:bg-green-600 dark:max-sm:bg-green-950 bg-green-600 dark:bg-green-950`}
    >
      <div className="flex flex-col h-full justify-between">
        <div onClick={handleOpen}>
          <TextAlignLeft
            size={32}
            weight="regular"
            className="cursor-pointer hover:text-neutral-200 text-neutral-100 "
          />
        </div>
        <div className="w-full items-center justify-center flex py-4">
          <UserInfo openMenu={open} />
        </div>
        <div
          className={`${
            open
              ? "max-sm:bg-green-600 dark:max-sm:bg-green-950 max-sm:z-50 max-sm:w-full max-sm:h-full"
              : "max-sm:hidden"
          } flex-1`}
        >
          <div className={`w-full mt-4 max-sm:mt-0 ${open ? "" : ""} `}>
            <div className="space-y-1  max-sm:bg-green-600 dark:max-sm:bg-green-950 ">
              {routers.map((item, index) => (
                <SidebarItem
                  key={item.path}
                  item={item}
                  open={open}
                  openItems={openItems[index]}
                  onToggleOpen={() => handleToggleOpenItem(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={sigOut}
          className={`w-full flex mt-1 text-start gap-4 rounded-md p-2  text-neutral-100 hover:bg-green-500 dark:hover:bg-green-950 transition
          ${!open && "text-center flex items-center justify-center"}
          `}
        >
          <div className="flex items-center gap-4">
            <SignOut size={32} />
            {open && "Sair"}
          </div>
        </button>
      </div>
    </div>
  );
}
