import { useEffect, useState, useRef } from "react";
import { Sun, Moon, Desktop } from "phosphor-react";

export function SelectTheme() {
  const [theme, setTheme] = useState(
    typeof localStorage !== "undefined" && localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : "system"
  );
  const element = typeof document !== "undefined" && document.documentElement;
  const darkQuery =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)");

  const options = [
    { icon: <Sun size={32} weight="fill" />, text: "light" },
    { icon: <Moon size={32} weight="fill" />, text: "dark" },
    { icon: <Desktop size={32} weight="fill" />, text: "system" },
  ];

  function onWindowMatch() {
    if (element) {
      if (
        localStorage?.theme === "dark" ||
        (!("theme" in localStorage) && darkQuery && darkQuery.matches)
      ) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  }

  useEffect(() => {
    if (element) {
      switch (theme) {
        case "dark":
          element.classList.add("dark");
          localStorage?.setItem("theme", "dark");
          break;
        case "light":
          element.classList.remove("dark");
          localStorage?.setItem("theme", "light");
          break;
        default:
          localStorage?.removeItem("theme");
          onWindowMatch();
          break;
      }
    }
  }, [theme, element]);

  if (darkQuery) {
    darkQuery.addEventListener("change", (e) => {
      if (!("theme" in localStorage) && element) {
        if (e.matches) {
          element.classList.add("dark");
        } else {
          element.classList.remove("dark");
        }
      }
    });
  }

  const [openTheme, setOpenTheme] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function handleOpenTheme() {
    setOpenTheme(!openTheme);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenTheme(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        className="leading-9 text-xl rounded-full m-1 text-neutral-900 dark:text-neutral-100 hover:text-neutral-100 dark:hover:text-neutral-900"
        onClick={handleOpenTheme}
      >
        {theme === "light" ? (
          <Sun size={32} className="text-neutral-200" weight="fill" />
        ) : theme === "dark" ? (
          <Moon size={32} className="" weight="fill" />
        ) : (
          <Desktop size={32} weight="fill" />
        )}
      </button>
      {openTheme && (
        <div
          ref={ref}
          className="absolute z-50 top-full right-0 mt-2 bg-neutral-100 dark:bg-neutral-100 rounded-lg shadow-lg p-2 "
        >
          {options?.map((option, index) => {
            return (
              <button
                onClick={() => setTheme(option.text)}
                key={index}
                className={`w-8 h-8 leading-9 text-xl rounded-full m-1 flex items-center justify-center ${
                  theme === option.text && "text-neutral-600"
                }`}
              >
                {option.icon}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
