import { useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/**
 * Fades + lifts children into view once, the first time they cross the viewport.
 * Uses IntersectionObserver so nothing animates off-screen.
 */
export function Reveal({ children, delay = 0, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect reduced-motion by showing immediately.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? 'is-in' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
