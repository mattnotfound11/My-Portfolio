import type { CSSProperties } from 'react';

export type GlowMode =
  | 'rotate'
  | 'pulse'
  | 'breathe'
  | 'colorShift'
  | 'flowHorizontal'
  | 'static';

export type GlowBlur =
  | number
  | 'softest'
  | 'soft'
  | 'medium'
  | 'strong'
  | 'stronger'
  | 'strongest'
  | 'none';

export type GlowEffectProps = {
  className?: string;
  style?: CSSProperties;
  colors?: string[];
  mode?: GlowMode;
  blur?: GlowBlur;
  scale?: number;
  duration?: number;
};

/**
 * Tailwind's blur scale, resolved to pixels. The original mapped both
 * `stronger` and `strongest` to blur-xl, which made the top of the scale a
 * no-op; `strongest` continues to blur-2xl here so the ramp keeps climbing.
 */
const BLUR_PX: Record<Exclude<GlowBlur, number>, number> = {
  none: 0,
  softest: 4,
  soft: 8,
  medium: 12,
  strong: 16,
  stronger: 24,
  strongest: 40,
};

/**
 * Animated gradient wash, sized to its positioned parent.
 *
 * Ported to plain CSS rather than motion/react: the whole component is one
 * element whose only moving parts are a gradient and a transform, which
 * keyframes express directly. Pulling in an animation runtime to drive that
 * would outweigh the component itself.
 *
 * The parent needs `position: relative` and should carry the border radius —
 * this inherits it. Sits behind its siblings, so give them a z-index.
 */
export function GlowEffect({
  className = '',
  style,
  colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F'],
  mode = 'rotate',
  blur = 'medium',
  scale = 1,
  duration = 5,
}: GlowEffectProps) {
  const px = typeof blur === 'number' ? blur : BLUR_PX[blur];

  return (
    <span
      aria-hidden="true"
      className={`glow glow--${mode} ${className}`.trim()}
      style={
        {
          ...style,
          '--glow-colors': colors.join(', '),
          // Conic and horizontal sweeps have to land back on their first
          // colour, or the loop shows a hard seam where the ends meet.
          '--glow-loop': [...colors, colors[0]].join(', '),
          '--glow-blur': `${px}px`,
          '--glow-scale': scale,
          '--glow-duration': `${duration}s`,
        } as CSSProperties
      }
    />
  );
}
