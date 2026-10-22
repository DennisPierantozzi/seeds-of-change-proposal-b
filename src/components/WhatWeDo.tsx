"use client";

import { useMemo, useRef, useState } from "react";
import { pieces, whatWeDo, type Piece } from "@/content/site";
import { gsap, useGSAP, MOTION_OK, REDUCED } from "@/lib/gsap";
import { buildPieces, DROP } from "./jigsaw";
import styles from "./WhatWeDo.module.css";

// Where each piece starts before it flies into place (same order as `pieces`).
const START = [
  { x: -320, y: -140, rotation: -40 },
  { x: 320, y: -160, rotation: 34 },
  { x: -360, y: 20, rotation: 28 },
  { x: 360, y: 30, rotation: -32 },
  { x: -300, y: 180, rotation: -24 },
  { x: 320, y: 200, rotation: 40 },
];
const STEP = 1;
const FLY = 0.8;

export default function WhatWeDo() {
  const root = useRef<HTMLElement>(null);
  const [landed, setLanded] = useState(0);

  // Light pieces fill the left column of the drop, dark ones the right, top to bottom.
  const shapes = useMemo(() => {
    const grid = buildPieces();
    const rowOf = { light: 0, dark: 0 };
    return pieces.map((p) => {
      const col = p.tone === "light" ? 0 : 1;
      const row = rowOf[p.tone]++;
      return grid.find((g) => g.col === col && g.row === row)!;
    });
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true });
      pieces.forEach((_, i) => {
        tl.from(`[data-piece="${i}"]`, { ...START[i], opacity: 0, scale: 0.7, transformOrigin: "50% 50%", duration: FLY, ease: "power3.out" }, i * STEP);
      });
      tl.to(`.${styles.seam}`, { attr: { "stroke-width": 3 }, duration: 0.5 }, pieces.length * STEP)
        .from(`.${styles.ghost}`, { opacity: 1, duration: 0.5 }, pieces.length * STEP)
        .fromTo(`.${styles.glow}`, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, transformOrigin: "50% 50%", duration: 0.6 }, pieces.length * STEP);

      tl.eventCallback("onUpdate", () => {
        const n = Math.floor((tl.time() - FLY + 0.05) / STEP) + 1;
        setLanded(Math.max(0, Math.min(pieces.length, n)));
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.to(tl, {
          progress: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 2.6}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });
      mm.add(REDUCED, () => {
        tl.progress(1);
      });
    },
    { scope: root },
  );

  const latest = landed > 0 && landed < pieces.length ? pieces[landed - 1] : null;

  const side = (tone: Piece["tone"]) =>
    pieces.map((p, i) => ({ p, i })).filter(({ p }) => p.tone === tone);

  const label = ({ p, i }: { p: Piece; i: number }) => (
    <li key={p.label} className={`${styles.label} ${styles[p.tone]} ${i < landed ? styles.landed : ""}`}>
      <span className={styles.pill}>{p.label}</span>
      <ul>
        {p.body.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </li>
  );

  return (
    <section id="what-we-do" ref={root} className={styles.wwd}>
      <div className="container">
        <div className={styles.head}>
          <span className="note">what we actually do</span>
          <h2 className="h2">The missing pieces, put together.</h2>
          <p className="lede">{whatWeDo.lede}</p>
        </div>

        <div className={styles.board}>
          <ul className={`${styles.col} ${styles.left}`}>{side("light").map(label)}</ul>

          <div className={styles.drop}>
            <svg viewBox="0 0 420 420" role="img" aria-label="Six puzzle pieces fit together into the Seeds of Change drop">
              <defs>
                <clipPath id="drop-clip">
                  <path d={DROP} />
                </clipPath>
                <radialGradient id="drop-glow">
                  <stop offset="0%" stopColor="var(--sky)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--sky)" stopOpacity={0} />
                </radialGradient>
              </defs>
              <circle className={styles.glow} cx={220} cy={215} r={210} fill="url(#drop-glow)" />
              <path className={styles.ghost} d={DROP} />
              {shapes.map((s, i) => (
                <g key={i} data-piece={i}>
                  <path
                    d={s.d}
                    clipPath="url(#drop-clip)"
                    className={styles.seam}
                    fill={pieces[i].tone === "light" ? "var(--sky)" : "var(--navy)"}
                  />
                </g>
              ))}
            </svg>
            <p className={`${styles.count} ${landed === pieces.length ? styles.done : ""}`} aria-live="polite">
              {landed === pieces.length ? whatWeDo.outro : `${landed} / ${pieces.length}`}
            </p>
          </div>

          <ul className={`${styles.col} ${styles.right}`}>{side("dark").map(label)}</ul>

          {/* Narrow screens: just the piece that landed last */}
          <div className={styles.current} aria-hidden>
            {latest ? (
              <div key={latest.label} className={`${styles.label} ${styles[latest.tone]} ${styles.landed}`}>
                <span className={styles.pill}>{latest.label}</span>
                <ul>
                  {latest.body.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ) : landed === 0 ? (
              <p className={styles.hint}>keep scrolling to put it together ↓</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
