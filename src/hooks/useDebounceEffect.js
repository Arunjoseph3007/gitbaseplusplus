import { useEffect, useCallback } from "react";

export default function useDebounceEffect(effect, deps, delay = 500) {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}
