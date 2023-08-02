import { useEffect, useState } from "react";
import { Sun, Moon, Desktop } from "phosphor-react";

interface SwitchThemeProps {
  fixed?: boolean;
}
export function SwitchTheme(props: SwitchThemeProps) {
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
    { icon: <Sun size={25} weight="fill" />, text: "light" },
    { icon: <Moon size={32} weight="fill" />, text: "dark" },
    { icon: <Desktop size={32} weight="fill" />, text: "system" },
  ];

  function onWindowMatch(_e: MediaQueryListEvent | null) {
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
          onWindowMatch(null);
          break;
      }
    }
  }, [theme, element]);

  useEffect(() => {
    if (darkQuery) {
      darkQuery.addEventListener("change", onWindowMatch);
    }
    return () => {
      if (darkQuery) {
        darkQuery.removeEventListener("change", onWindowMatch);
      }
    };
  }, [darkQuery]);

  return (
    <div>
      <div
        className={`
          ${props.fixed ? "fixed top-5 right-10" : ""}
          duration-100 ${
            theme === "dark"
              ? "dark:bg-slate-800 dark:text-gray-100"
              : "bg-gray-100"
          } rounded`}
      >
        {options?.map((option, index) => {
          return (
            <button
              onClick={() => setTheme(option.text)}
              key={index}
              className={`w-8 h-8 leading-9 text-xl rounded-full m-1 ${
                theme === option.text ? "text-sky-600" : ""
              }`}
            >
              {option.icon}
            </button>
          );
        })}
      </div>
    </div>
  );
}
