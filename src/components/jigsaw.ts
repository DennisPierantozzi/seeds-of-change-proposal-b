// Builds a 2-column × 3-row jigsaw whose pieces tile exactly. The pieces are
// later clipped by the leaf outline so, assembled, they form the logo's drop.

type Pt = [number, number];
type Seg = [Pt, Pt, Pt]; // cubic: control 1, control 2, end

// One edge with a knob, in (along, across) units of the edge length.
const KNOB: Seg[] = [
  [[0.12, 0], [0.24, 0], [0.36, 0]],
  [[0.41, 0], [0.43, 0.04], [0.4, 0.1]],
  [[0.36, 0.18], [0.42, 0.26], [0.5, 0.26]],
  [[0.58, 0.26], [0.64, 0.18], [0.6, 0.1]],
  [[0.57, 0.04], [0.59, 0], [0.64, 0]],
  [[0.76, 0], [0.88, 0], [1, 0]],
];

function edge(a: Pt, b: Pt, sign: 1 | -1): Seg[] {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const map = ([t, n]: Pt): Pt => [a[0] + t * dx - n * sign * dy, a[1] + t * dy + n * sign * dx];
  return KNOB.map(([c1, c2, p]) => [map(c1), map(c2), map(p)]);
}

function reverse(start: Pt, segs: Seg[]): Seg[] {
  const out: Seg[] = [];
  for (let i = segs.length - 1; i >= 0; i--) {
    const prev = i === 0 ? start : segs[i - 1][2];
    out.push([segs[i][1], segs[i][0], prev]);
  }
  return out;
}

const f = (n: number) => Math.round(n * 10) / 10;
const toD = (segs: Seg[]) => segs.map(([c1, c2, p]) => `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p[0])} ${f(p[1])}`).join(" ");

export const GRID = { x: 30, y: 16, w: 180, h: 128, cols: 2, rows: 3 };

// Knob directions, chosen so the pieces interlock visibly.
const V_SIGNS: (1 | -1)[] = [1, -1, 1];
const H_SIGNS: (1 | -1)[][] = [
  [-1, 1],
  [1, -1],
];

export type JigsawPiece = { col: number; row: number; d: string; cx: number; cy: number };

export function buildPieces(): JigsawPiece[] {
  const { x, y, w, h, cols, rows } = GRID;
  const P = (c: number, r: number): Pt => [x + c * w, y + r * h];
  const vEdge = (r: number) => edge(P(1, r), P(1, r + 1), V_SIGNS[r]);
  const hEdge = (r: number, c: number) => edge(P(c, r + 1), P(c + 1, r + 1), H_SIGNS[r][c]);

  const pieces: JigsawPiece[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tl = P(c, r), tr = P(c + 1, r), br = P(c + 1, r + 1), bl = P(c, r + 1);
      const parts = [`M${tl[0]} ${tl[1]}`];
      parts.push(r === 0 ? `L${tr[0]} ${tr[1]}` : toD(hEdge(r - 1, c)));
      parts.push(c === cols - 1 ? `L${br[0]} ${br[1]}` : toD(vEdge(r)));
      parts.push(r === rows - 1 ? `L${bl[0]} ${bl[1]}` : toD(reverse(bl, hEdge(r, c))));
      parts.push(c === 0 ? `L${tl[0]} ${tl[1]}` : toD(reverse(tl, vEdge(r))));
      pieces.push({ col: c, row: r, d: parts.join(" ") + " Z", cx: tl[0] + w / 2, cy: tl[1] + h / 2 });
    }
  }
  return pieces;
}

// The drop from the logo: round belly bottom-left, tip top-right.
export const DROP =
  "M382 22 C300 26 150 40 78 150 C18 244 56 350 150 386 C252 424 362 360 380 232 C392 146 370 84 382 22 Z";
