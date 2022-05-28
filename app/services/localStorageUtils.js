import { useEffect, useRef, useState } from "react";

export const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(defaultValue);

  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      setState(() => {
        if (typeof window === "undefined") return defaultValue;
        const storedItem = window?.localStorage.getItem(key);
        if (!storedItem) return defaultValue;
        if (typeof defaultValue === "string") return JSON.parse(storedItem);
        if (typeof defaultValue === "number") return Number(JSON.parse(storedItem));
        return JSON.parse(JSON.parse(storedItem));
      });
    } else {
      window.localStorage.setItem(key, JSON.stringify(state));
    }
  }, [defaultValue, key, state]);

  return [state, setState];
};
