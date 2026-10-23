import { useEffect, useRef, useState } from 'react';
import { CAT, HEART, Pixels } from './Pixel';

const PETS_KEY = 'mt-byte-pets';
const SAYS = ['mrrp!', 'meow', 'purr…', '=^.^=', 'more pets', 'nya~'];

function readPets() {
  try {
    return Number(localStorage.getItem(PETS_KEY)) || 0;
  } catch {
    return 0;
  }
}

type Props = {
  /** CSS pixels per sprite pixel. */
  scale?: number;
  /** Walking pace in CSS pixels per second. */
  speed?: number;
  onPet?: (total: number) => void;
  className?: string;
};

/**
 * Byte, the site cat. Wanders along the bottom of its container, stops to
 * sit and blink, and reacts when clicked. Holds still for reduced motion.
 */
export function Cat({ scale = 3, speed = 34, onPet, className = '' }: Props) {
  const floor = useRef<HTMLDivElement>(null);
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

  // Movement, turning, and the occasional sit-down.
  useEffect(() => {
    const el = body.current;
    const box = floor.current;
    if (!el || !box) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMode('sit');
      el.style.transform = `translateX(${Math.max(0, box.clientWidth * 0.7 - w)}px)`;
      return;
    }

    let x = Math.random() * Math.max(0, box.clientWidth - w);
    let dir = Math.random() > 0.5 ? 1 : -1;
    let last = performance.now();
    let nextRest = last + 3500 + Math.random() * 4000;
    let restUntil = 0;
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const max = Math.max(0, box.clientWidth - w);

      if (modeRef.current === 'walk') {
        if (now > nextRest) {
          restUntil = now + 1800 + Math.random() * 2600;
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
        nextRest = now + 4000 + Math.random() * 5000;
        if (Math.random() > 0.5) dir *= -1;
        setMode('walk');
      }

      el.style.transform = `translateX(${x}px)`;
      if (flip.current) flip.current.style.transform = `scaleX(${dir})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed, w]);

  // Leg swap while walking, a blink now and then while sitting.
  useEffect(() => {
    if (mode === 'walk') {
      const id = setInterval(() => setFrame((f) => 1 - f), 180);
      return () => clearInterval(id);
    }
    const id = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 160);
    }, 1600);
    return () => clearInterval(id);
  }, [mode]);

  const pet = () => {
    const total = readPets() + 1;
    try {
      localStorage.setItem(PETS_KEY, String(total));
    } catch {
      /* the pet still counts, just not across visits */
    }
    onPet?.(total);
    setBubble(SAYS[Math.floor(Math.random() * SAYS.length)]!);
    setHop((h) => h + 1);
    const id = Date.now();
    setHearts((hs) => [...hs.slice(-4), id]);
    setTimeout(() => setHearts((hs) => hs.filter((h) => h !== id)), 1200);
    setTimeout(() => setBubble(null), 1400);
  };

  const sprite = mode === 'walk' ? (frame ? CAT.walkB : CAT.walkA) : blink ? CAT.blink : CAT.sit;

  return (
    <div ref={floor} className={`cat-floor ${className}`.trim()} style={{ height: 12 * scale + 34 }}>
      <button ref={body} type="button" className="cat" onClick={pet} aria-label="Pet Byte the cat" style={{ width: w }}>
        <span className="cat-fx" aria-hidden="true">
          {bubble && <span className="cat-bubble">{bubble}</span>}
          {hearts.map((h, i) => (
            <span key={h} className="cat-heart" style={{ left: `${30 + i * 8}%` }}>
              <Pixels map={HEART} scale={2} />
            </span>
          ))}
        </span>
        <span ref={flip} className="cat-flip">
          <span key={hop} className={hop ? 'cat-sprite is-hop' : 'cat-sprite'}>
            <Pixels map={sprite} scale={scale} />
          </span>
        </span>
      </button>
    </div>
  );
}
