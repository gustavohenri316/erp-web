import { destroyCookie } from "nookies";
import { SignOut } from "phosphor-react";
import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

export default function UserInfo() {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const router = useNavigate();

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

  function sigOut() {
    destroyCookie(null, "Dashboard.UserToken");
    destroyCookie(null, "Dashboard.UserToken-permissions");
    window.location.href = "/";
  }

  return (
    <div className="relative " ref={userRef}>
      <img
        onClick={handleOpen}
        src={user?.photo}
        className="w-10 h-10 rounded-full object-cover cursor-pointer"
        alt="user"
      />
      {open && (
        <div className="flex flex-col bg-neutral-100 mt-4 border-neutral-800 border rounded-sm absolute right-0  z-50 min-w-[200px] min-h-[40px]">
          <span
            onClick={sigOut}
            className="w-full p-2 text-neutral-900 cursor-pointer hover:bg-gray-200 rounded-sm flex items-center gap-4"
          >
            <SignOut size={32} weight="thin" />
            Sair
          </span>
        </div>
      )}
    </div>
  );
}
