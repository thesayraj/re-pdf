import { useEffect, useRef, useState } from "react";

export const useInView = (options: IntersectionObserverInit) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  const cb = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;

    setVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(cb, options);
    const cr = containerRef.current;
    if (cr) observer.observe(cr);

    return () => {
      if (cr) observer.unobserve(cr);
    };
  });

  return {containerRef, isVisible};
};
