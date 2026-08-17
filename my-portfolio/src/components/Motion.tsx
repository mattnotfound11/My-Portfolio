import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from 'react';

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Fires once when the element first enters the viewport. */
export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduced()) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ── Thin progress bar tracking page scroll ─────────────── */

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // scrollHeight forces layout, so measure it on resize instead of per frame.
    let limit = 0;
    const measure = () => {
      limit = document.documentElement.scrollHeight - window.innerHeight;
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener('resize', measure);

    // Drive from rAF rather than scroll events: Lenis eases scrollY every
    // frame, so listening to discrete scroll events lags behind the motion.
    let raf = 0;
    let last = -1;
    const tick = () => {
      const p = limit > 0 ? Math.min(Math.max(window.scrollY / limit, 0), 1) : 0;
      if (Math.abs(p - last) > 0.0004) {
        // scaleX composites on the GPU; animating width would relayout.
        el.style.transform = `scaleX(${p})`;
        last = p;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return <div className="scroll-progress" ref={ref} />;
}

/* ── Number that counts up when scrolled into view ──────── */

export function Counter({
  value,
  duration = 1400,
}: {
  value: string;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [shown, setShown] = useState(value);

  // Split "800+" into 800 and "+" so only the digits animate.
  const digits = parseFloat(value.replace(/[^\d.]/g, ''));
  const suffix = value.replace(/[\d.,]/g, '');
  const pad = /^0\d/.test(value);

  useEffect(() => {
    if (!inView || Number.isNaN(digits)) return;
    if (reduced()) {
      setShown(value);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      const n = Math.round(digits * eased);
      setShown((pad ? String(n).padStart(2, '0') : String(n)) + suffix);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, digits, suffix, duration, value, pad]);

  return <span ref={ref}>{Number.isNaN(digits) ? value : shown}</span>;
}

/* ── Headline that reveals word by word ─────────────────── */

export function SplitText({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.2);
  const words = text.split(' ');

  return (
    <span ref={ref} className={`split ${className}`}>
      {words.map((w, i) => (
        <span className="split-word" key={`${w}-${i}`}>
          <span
            className={`split-inner ${inView ? 'is-in' : ''}`}
            style={{ transitionDelay: `${delay + i * 0.045}s` }}
          >
            {w}
          </span>
        </span>
      ))}
    </span>
  );
}

/* ── Card that lights up under the cursor ───────────────── */

export function Spotlight({
  children,
  className = '',
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      className={`spotlight ${className}`}
      style={style}
      onMouseMove={onMove}
    >
      {children}
    </div>
  );
}
