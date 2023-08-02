import { useEffect, useState } from "react";

export function updateStorage() {
  function useLocalStorageObserver(
    key: string,
    callback: (newValue: string | null) => void
  ) {
    const [currentValue, setCurrentValue] = useState<string | null>(
      typeof window !== "undefined" ? localStorage.getItem(key) : null
    );

    useEffect(() => {
      const interval = setInterval(() => {
        const newValue = localStorage.getItem(key);
        if (newValue !== currentValue) {
          setCurrentValue(newValue);
          callback(newValue);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }, [key, callback, currentValue]);
  }
  const handleThemeChange = (newValue: string | null) => {
    console.log("Novo valor da chave 'theme':", newValue);
  };

  useLocalStorageObserver("theme", handleThemeChange);
}
