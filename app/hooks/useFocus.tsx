import { useEffect } from 'react';

export function useFocus(ref: React.RefObject<HTMLInputElement>) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (ref?.current && window.scrollY < 200) {
        ref?.current?.focus();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [ref]);
}
