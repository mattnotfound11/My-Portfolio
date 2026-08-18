import type { ElementType, ReactNode } from 'react';

export interface TextShimmerProps {
  children: ReactNode;
  as?: ElementType;
  /** Seconds for one sweep. Lower is faster. */
  duration?: number;
  className?: string;
}

/**
 * A light sweep travelling across text.
 *
 * Same technique as the shadcn/Tailwind version — a 200%-wide gradient
 * clipped to the glyphs, scrolled via background-position — but written
 * against this project's own tokens, since there is no Tailwind here.
 */
export function TextShimmer({
  children,
  as: Comp = 'span',
  duration = 2.5,
  className = '',
}: TextShimmerProps) {
  return (
    <Comp
      className={`shimmer ${className}`.trim()}
      style={{ animationDuration: `${duration}s` }}
    >
      {children}
    </Comp>
  );
}
