/**
 * Motion values shared by the activity heatmap. The easing curves match the
 * --ease-enter / --ease-standard tokens in activity-heatmap.module.css, and
 * the durations match --duration-fast / --duration-spring.
 */
export const motionTokens = {
  ease: {
    /** Fast out, long settle: things arriving. */
    enter: [0.16, 1, 0.3, 1],
    /** General movement between two resting states. */
    standard: [0.22, 1, 0.36, 1],
  },
  blur: {
    /** Barely-there softening for text on its way out. */
    subtle: 2,
    /** Enough blur to read as motion on text coming in. */
    soft: 4,
  },
  duration: {
    fast: 0.16,
    spring: 0.58,
  },
  spring: {
    /** The tooltip gliding from cell to cell: quick, no wobble. */
    snappy: { type: 'spring', stiffness: 560, damping: 44, mass: 0.8 },
    /** Widths reshaping around new text. */
    morph: { type: 'spring', stiffness: 380, damping: 38, mass: 1 },
  },
} as const;
