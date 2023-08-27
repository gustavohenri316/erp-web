import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";

interface UserInfoProps {
  openMenu: boolean;
}
export default function UserInfo({ openMenu = true }: UserInfoProps) {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!open);
  }

  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="flex items-center justify-center flex-col text-white text-center"
      ref={userRef}
    >
      <img
        onClick={handleOpen}
        src={user?.photo}
        className="w-14 h-14 rounded-full object-cover cursor-pointer"
        alt="user"
      />

      {openMenu && <span className="mt-2">{user?.name}</span>}
    </div>
  );
}
