'use client'
import { useState } from "react";
import { TextAlignLeft } from "phosphor-react";
import { routers } from "./routerLink";
import { SidebarItem } from "./SidebarItem";

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

  return (
    <div className={` ${open ? "w-96" : "w-28"} p-6  h-full `}>
      <div onClick={handleOpen}>
        <TextAlignLeft
          size={32}
          weight="regular"
          className="cursor-pointer hover:text-neutral-200 text-neutral-100 "
        />
      </div>

      <div className={`w-full mt-16 ${open ? "" : ""} `}>
        <div className="space-y-1">
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
  );
}
