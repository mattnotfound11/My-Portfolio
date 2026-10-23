import { useEffect, useRef, useState } from 'react';
import { isDark } from '../theme';

type Props = {
  src: string;
  alt: string;
  /** Dot pitch in CSS pixels. Smaller reads as a finer print. */
  cell?: number;
  className?: string;
};

/**
 * Renders a photo as a monochrome halftone print on a canvas, then fades to
 * the untouched photo on hover. Redraws on resize and theme change so the
 * dots always use the current ink colour.
 */
export function Halftone({ src, alt, cell = 3, className = '' }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const i = new Image();
    i.decoding = 'async';
    i.onload = () => setImg(i);
    i.src = src;
  }, [src]);

  useEffect(() => {
    const c = canvas.current;
    const box = wrap.current;
    if (!img || !c || !box) return;

    const draw = () => {
      const w = box.clientWidth;
      const h = box.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      const ctx = c.getContext('2d');
      if (!ctx) return;

      // Sample the photo at one pixel per dot, cover-cropped to the frame.
      const cols = Math.ceil(w / cell);
      const rows = Math.ceil(h / cell);
      const s = document.createElement('canvas');
      s.width = cols;
      s.height = rows;
      const sx = s.getContext('2d', { willReadFrequently: true });
      if (!sx) return;
      const scale = Math.max(cols / img.width, rows / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      sx.drawImage(img, (cols - dw) / 2, (rows - dh) / 2, dw, dh);
      const px = sx.getImageData(0, 0, cols, rows).data;

      const dark = isDark();
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue('--fg')
        .trim();

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color || (dark ? '#ededed' : '#111');

      const max = (cell / 2) * 1.08;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const o = (y * cols + x) * 4;
          const l = (0.299 * px[o]! + 0.587 * px[o + 1]! + 0.114 * px[o + 2]!) / 255;
          // The studio backdrop is paper in either theme, never ink.
          if (l > 0.94) continue;
          // Light ink on a dark page has to follow brightness, not darkness.
          const ink = dark ? l : 1 - l;
          // Lift the mid-tones so skin keeps its shape instead of blowing out;
          // pure paper (the studio backdrop) still drops to nothing.
          const amount = ink < 0.035 ? 0 : Math.pow(ink, 0.55);
          const r = max * amount;
          if (r < 0.35) continue;
          ctx.beginPath();
          ctx.arc(x * cell + cell / 2, y * cell + cell / 2, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(box);
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', draw);
    window.addEventListener('mt-theme', draw);
    return () => {
      ro.disconnect();
      mq.removeEventListener('change', draw);
      window.removeEventListener('mt-theme', draw);
    };
  }, [img, cell]);

  return (
    <div ref={wrap} className={`halftone ${className}`.trim()}>
      <canvas ref={canvas} aria-hidden="true" />
      <img src={src} alt={alt} className="halftone-photo" draggable={false} />
    </div>
  );
}
