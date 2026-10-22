// Small SVG building blocks shared by the journey scene and the logo mark.

export function leafPath(len: number) {
  return `M0 0 C${len * 0.25} ${-len * 0.34} ${len * 0.7} ${-len * 0.38} ${len} 0 C${len * 0.7} ${len * 0.38} ${len * 0.25} ${len * 0.34} 0 0 Z`;
}

type LeafProps = { x: number; y: number; a: number; len: number; tag: string; color?: string };

/** A leaf whose base sits at (x, y), pointing along angle `a` (degrees, 0 = right). */
export function Leaf({ x, y, a, len, tag, color = "var(--leaf)" }: LeafProps) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a})`}>
      <g data-j={tag}>
        <path d={leafPath(len)} fill={color} />
        <path d={`M${len * 0.12} 0 L${len * 0.78} 0`} stroke="#fff" strokeOpacity={0.55} strokeWidth={2} strokeLinecap="round" />
      </g>
    </g>
  );
}

/** The two-tone puzzle leaf from the Seeds of Change logo, along the x axis. */
export function PuzzleLeaf({ x, y, a, len, tag }: Omit<LeafProps, "color">) {
  const r = len * 0.1;
  const seam = `M0 0 L${len * 0.3} 0 A${r} ${r} 0 1 1 ${len * 0.5} 0 L${len * 0.56} 0 A${r} ${r} 0 1 0 ${len * 0.76} 0 L${len * 1.1} 0`;
  const id = `pl-${tag}`;
  return (
    <g transform={`translate(${x} ${y}) rotate(${a})`}>
      <defs>
        <clipPath id={id}>
          <path d={`M0 0 C${len * 0.2} ${-len * 0.48} ${len * 0.75} ${-len * 0.5} ${len} 0 C${len * 0.75} ${len * 0.5} ${len * 0.2} ${len * 0.48} 0 0 Z`} />
        </clipPath>
      </defs>
      <g data-j={tag}>
        <g clipPath={`url(#${id})`}>
          <rect x={0} y={-len} width={len * 1.1} height={len * 2} fill="var(--sky)" />
          <path d={`${seam} L${len * 1.1} ${len} L0 ${len} Z`} fill="var(--navy)" />
        </g>
        <path d={seam} fill="none" stroke="#fff" strokeWidth={2.5} />
      </g>
    </g>
  );
}

/** Head-and-shoulders person icon, centred on (x, y) at the shoulders. */
export function Bust({ x, y, s = 1, tag }: { x: number; y: number; s?: number; tag: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g data-j={tag}>
        <circle cx={0} cy={-14} r={11} fill="var(--navy)" />
        <path d="M-17 18 C-17 4 -9 -1 0 -1 C9 -1 17 4 17 18 Z" fill="var(--navy)" />
      </g>
    </g>
  );
}

/** Standing person with arms raised; (x, y) is where the feet touch the ground. */
export function Person({ x, y, s = 1, tag, color = "var(--navy)" }: { x: number; y: number; s?: number; tag: string; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g data-j={tag}>
        <circle cx={0} cy={-74} r={10} fill={color} />
        <path
          d="M-9 -58 L-24 -86 L-18 -89 L-4 -64 L4 -64 L18 -89 L24 -86 L9 -58 L8 -30 L6 0 L1 0 L0 -26 L-1 0 L-6 0 L-8 -30 Z"
          fill={color}
          strokeLinejoin="round"
        />
      </g>
    </g>
  );
}

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <PuzzleLeaf x={12} y={88} a={-45} len={106} tag="logo" />
    </svg>
  );
}
