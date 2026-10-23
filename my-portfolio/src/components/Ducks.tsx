import { useEffect, useRef, useState, type RefObject } from 'react';
import { DUCK, HEART, Pixels } from './Pixel';

const SAYS = ['quack!', 'quack quack', 'qwak?', 'honk', '*waddle*'];

type DuckProps = {
  floor: RefObject<HTMLDivElement | null>;
  scale: number;
  speed: number;
  /** Where along the floor the duck starts, 0 to 1. */
  start: number;
  name: string;
};

/**
 * One duck. Waddles along its floor, turns at the edges, stops now and then
 * to rest and blink, and quacks when clicked. Holds still for reduced motion.
 */
function Duck({ floor, scale, speed, start, name }: DuckProps) {
  const body = useRef<HTMLButtonElement>(null);
  const flip = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState<'walk' | 'sit'>('walk');
  const [frame, setFrame] = useState(0);
  const [blink, setBlink] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const [hearts, setHearts] = useState<number[]>([]);
  const [hop, setHop] = useState(0);
  const modeRef = useRef(mode);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  const w = 16 * scale;

  useEffect(() => {
    const el = body.current;
    const box = floor.current;
    if (!el || !box) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMode('sit');
      el.style.transform = `translateX(${Math.max(0, (box.clientWidth - w) * start)}px)`;
      return;
    }

    let x = Math.max(0, (box.clientWidth - w) * start);
    let dir = start > 0.5 ? -1 : 1;
    let last = performance.now();
    let nextRest = last + 3000 + Math.random() * 5000;
    let restUntil = 0;
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const max = Math.max(0, box.clientWidth - w);

      if (modeRef.current === 'walk') {
        if (now > nextRest) {
          restUntil = now + 1600 + Math.random() * 2800;
          setMode('sit');
        } else {
          x += dir * speed * dt;
          if (x <= 0 || x >= max) {
            x = Math.min(max, Math.max(0, x));
            dir *= -1;
          }
        }
      } else if (restUntil && now > restUntil) {
        restUntil = 0;
        nextRest = now + 4000 + Math.random() * 6000;
        if (Math.random() > 0.5) dir *= -1;
        setMode('walk');
      }

      el.style.transform = `translateX(${x}px)`;
      if (flip.current) flip.current.style.transform = `scaleX(${dir})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [floor, speed, start, w]);

  // Waddle while walking, blink now and then while resting.
  useEffect(() => {
    if (mode === 'walk') {
      const id = setInterval(() => setFrame((f) => 1 - f), 200);
      return () => clearInterval(id);
    }
    const id = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 160);
    }, 1500);
    return () => clearInterval(id);
  }, [mode]);

  const quack = () => {
    setBubble(SAYS[Math.floor(Math.random() * SAYS.length)]!);
    setHop((h) => h + 1);
    const id = Date.now();
    setHearts((hs) => [...hs.slice(-4), id]);
    setTimeout(() => setHearts((hs) => hs.filter((h) => h !== id)), 1200);
    setTimeout(() => setBubble(null), 1400);
  };

  const sprite = mode === 'walk' ? (frame ? DUCK.walkB : DUCK.walkA) : blink ? DUCK.blink : DUCK.sit;

  return (
    <button ref={body} type="button" className="duck" onClick={quack} aria-label={`Say hi to ${name} the duck`} style={{ width: w }}>
      <span className="duck-fx" aria-hidden="true">
        {bubble && <span className="duck-bubble">{bubble}</span>}
        {hearts.map((h, i) => (
          <span key={h} className="duck-heart" style={{ left: `${30 + i * 8}%` }}>
            <Pixels map={HEART} scale={2} />
          </span>
        ))}
      </span>
      <span ref={flip} className="duck-flip">
        <span key={hop} className={hop ? 'duck-sprite is-hop' : 'duck-sprite'}>
          <Pixels map={sprite} scale={scale} />
        </span>
      </span>
    </button>
  );
}

/** Two ducks sharing a strip of ground at the bottom of the page. */
export function Ducks({ scale = 3, className = '' }: { scale?: number; className?: string }) {
  const floor = useRef<HTMLDivElement>(null);
  return (
    <div ref={floor} className={`duck-floor ${className}`.trim()} style={{ height: 14 * scale + 34 }}>
      <Duck floor={floor} scale={scale} speed={30} start={0.2} name="Pato" />
      <Duck floor={floor} scale={scale} speed={38} start={0.75} name="Bibo" />
    </div>
  );
}
