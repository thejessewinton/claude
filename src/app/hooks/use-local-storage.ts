import { useState } from "react";

export const useLocalStorage = (
  key: string,
  defaultValue: string,
): [string, (value: string) => void] => {
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as string) : defaultValue;
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  });

  const setValue = (value: string) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
