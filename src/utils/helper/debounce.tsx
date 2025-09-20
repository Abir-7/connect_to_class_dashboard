import { useState, useEffect } from "react";

/**
 * Debounce a value by a given delay
 * @param value - the value to debounce
 * @param delay - delay in ms (default 500ms)
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler); // cleanup if value changes before delay
  }, [value, delay]);

  return debouncedValue;
}
