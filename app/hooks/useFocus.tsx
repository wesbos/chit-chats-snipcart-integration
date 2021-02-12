import { useEffect } from 'react';

export function useFocus(ref: React.RefObject<HTMLInputElement>) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (ref?.current) {
        ref?.current?.focus();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [ref]);
}
