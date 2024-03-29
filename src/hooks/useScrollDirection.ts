"use client";
import { useEffect, useState, useTransition } from "react";

export default function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const { scrollY } = window;
      const direction = scrollY === 0 || scrollY > lastScrollY ? "down" : "up";

      if (
        !isPending &&
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 1 || scrollY - lastScrollY < -1)
      ) {
        startTransition(() => setScrollDirection(direction));
      }

      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);

    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [isPending, scrollDirection]);

  return scrollDirection;
}
