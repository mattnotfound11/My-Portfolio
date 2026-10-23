import world from '../assets/world-dots.json';

/**
 * Dotted world map with a pulsing pin on Iloilo City. The dots were
 * generated once from Natural Earth outlines (via the dotted-map package)
 * and ship as static data, so nothing is computed in the browser.
 */
export function WorldMap({ caption }: { caption: string }) {
  const { w, h, pin, dots } = world as { w: number; h: number; pin: { x: number; y: number }; dots: [number, number][] };
  return (
    <figure className="world">
      <svg viewBox={`-1 -1 ${w + 2} ${h + 2}`} className="world-svg" role="img" aria-label="World map with a pin on Iloilo City, Philippines">
        {dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={0.34} />
        ))}
        <circle className="world-pulse" cx={pin.x} cy={pin.y} r={0.9} />
        <circle className="world-pin" cx={pin.x} cy={pin.y} r={0.75} />
      </svg>
      <figcaption className="world-caption">{caption}</figcaption>
    </figure>
  );
}
