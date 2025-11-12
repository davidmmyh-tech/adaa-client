import { useEffect, useRef, useState } from 'react';

export default function useScrollEffect() {
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY.current || currentScrollY < 100) setIsScrollingDown(false);
      else if (currentScrollY > lastScrollY.current && currentScrollY > 100) setIsScrollingDown(true);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isScrollingDown };
}
