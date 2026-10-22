"use client";

import { useRef, useState } from "react";
import { journey } from "@/content/site";
import { gsap, useGSAP, MOTION_OK, REDUCED } from "@/lib/gsap";
import { Bust, Leaf, Person, PuzzleLeaf } from "./illustrations";
import styles from "./Journey.module.css";

const SOIL =
  "M70 480 C70 455 95 446 120 450 C140 428 180 424 205 438 C228 414 270 412 292 428 C315 408 360 408 380 426 C405 412 445 414 462 436 C490 424 528 430 540 452 C565 452 575 470 570 480 Z";

const TRUNK =
  "M302 470 C308 420 311 380 312 330 C292 312 272 296 246 272 L256 262 C278 282 296 296 313 308 C314 280 315 250 316 214 L326 214 C327 250 327 276 327 300 C346 286 372 272 400 262 L405 274 C378 286 352 300 330 320 C332 372 336 420 344 470 Z";

const SEEDS = [
  { x: 286, label: "Community", c: "var(--sky)" },
  { x: 320, label: "Perspective", c: "var(--navy)" },
  { x: 354, label: "Expertise", c: "var(--sky)" },
];

const HALO = ["#eaf1ea", "#dceff7", "#e3f4e2", "#fdf1df"];

export default function Journey() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [isStatic, setIsStatic] = useState(false);

  useGSAP(
    () => {
      const q = (tag: string) => `[data-j="${tag}"]`;
      const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });

      // 1 · Collaborator: the seedling is already rooted
      tl.from(q("stem"), { scaleY: 0, transformOrigin: "50% 100%", duration: 0.5 }, 0.05)
        .from(q("seedleaf"), { scale: 0, transformOrigin: "0% 50%", duration: 0.35, stagger: 0.1, ease: "back.out(2)" }, 0.4)
        .from(q("root"), { opacity: 0, duration: 0.3 }, 0.1);

      // 2 · Collaboration: seeds of community, perspective, expertise fall in
      tl.to(q("halo"), { attr: { fill: HALO[1] }, duration: 0.3 }, 1)
        .fromTo(q("seed"), { y: -330, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.08, ease: "power1.in" }, 1.0)
        .to(q("seed"), { opacity: 0, scale: 0.4, duration: 0.15, stagger: 0.08 }, 1.5)
        .from(q("sproutstem"), { scaleY: 0, transformOrigin: "50% 100%", duration: 0.35, stagger: 0.08 }, 1.6)
        .from(q("sproutleaf"), { scale: 0, transformOrigin: "0% 50%", duration: 0.3, stagger: 0.05, ease: "back.out(2)" }, 1.75)
        .from(q("puzzle1"), { scale: 0, transformOrigin: "0% 50%", duration: 0.35, ease: "back.out(2)" }, 1.8);

      // 3 · Organisation resilience: they grow into one strong tree
      tl.to(q("halo"), { attr: { fill: HALO[2] }, duration: 0.3 }, 2)
        .to(q("young"), { scale: 0, opacity: 0, transformOrigin: "50% 100%", duration: 0.3 }, 2.0)
        .from(q("trunk"), { scaleY: 0, transformOrigin: "50% 100%", duration: 0.5, ease: "power1.out" }, 2.15)
        .from(q("treeleaf"), { scale: 0, transformOrigin: "0% 50%", duration: 0.3, stagger: 0.04, ease: "back.out(2)" }, 2.45)
        .from(q("puzzle2"), { scale: 0, transformOrigin: "0% 50%", duration: 0.35, ease: "back.out(2)" }, 2.75);

      // 4 · Community impact: people gather, new shoots spread
      tl.to(q("halo"), { attr: { fill: HALO[3] }, duration: 0.3 }, 3)
        .from(q("person"), { scale: 0, transformOrigin: "50% 100%", duration: 0.3, stagger: 0.07, ease: "back.out(2)" }, 3.05)
        .from(q("mini"), { scale: 0, transformOrigin: "50% 100%", duration: 0.25, stagger: 0.05, ease: "back.out(2)" }, 3.25)
        .fromTo(
          q("ripple"),
          { attr: { rx: 40, ry: 8 }, opacity: 0.9 },
          { attr: { rx: 300, ry: 46 }, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power1.out" },
          3.3,
        )
        .to({}, { duration: 0.1 }, 3.9);

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        setIsStatic(false);
        gsap.to(tl, {
          progress: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 3.2}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(Math.min(3, Math.floor(self.progress * 4))),
          },
        });
      });
      mm.add(REDUCED, () => {
        tl.progress(1);
        setIsStatic(true);
      });
    },
    { scope: root },
  );

  return (
    <section id="journey" ref={root} className={`${styles.journey} ${isStatic ? styles.static : ""}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <span className="note">how change grows</span>
          <h2 className="h2">From one collaborator to a whole community.</h2>
          <ol className={styles.stages}>
            {journey.map((s, i) => (
              <li key={s.title} className={i === active || isStatic ? styles.active : ""} aria-current={i === active ? "step" : undefined}>
                <span className={styles.num}>0{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p className={styles.line}>{s.line}</p>
                  <p className={styles.body}>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className={styles.rail} aria-hidden>
            {journey.map((s, i) => (
              <span key={s.title} className={i <= active ? styles.on : ""} />
            ))}
          </div>
        </div>

        <div className={styles.stage}>
          <svg viewBox="60 40 520 460" role="img" aria-label="A seedling grows into a tree surrounded by people, as Seeds of Change helps an organisation grow">
            <circle data-j="halo" cx={320} cy={290} r={232} fill={HALO[0]} />
            {[0, 1, 2].map((i) => (
              <ellipse key={i} data-j="ripple" cx={320} cy={472} rx={40} ry={8} fill="none" stroke="var(--sky)" strokeWidth={2} opacity={0} />
            ))}

            {/* Stage 3: the tree, drawn behind the soil so the trunk rises out of it */}
            <path data-j="trunk" d={TRUNK} fill="var(--soil)" />
            {[
              [318, 216, -112, 84],
              [322, 216, -62, 86],
              [250, 268, -168, 70],
              [250, 268, -128, 74],
              [262, 280, 150, 58],
              [402, 268, -12, 72],
              [394, 274, 36, 58],
              [312, 336, 196, 58],
              [330, 352, -14, 52],
            ].map(([x, y, a, len], i) => (
              <Leaf key={i} x={x} y={y} a={a} len={len} tag="treeleaf" />
            ))}
            <PuzzleLeaf x={402} y={266} a={-58} len={84} tag="puzzle2" />

            {/* Stages 1–2: young plants, which fold away when the tree grows */}
            <g data-j="young">
              <path data-j="root" d="M320 440 C311 452 312 468 320 478 C328 468 329 452 320 440 Z" fill="#efe4d6" />
              <path data-j="stem" d="M320 442 C320 412 318 382 320 352" stroke="var(--leaf)" strokeWidth={7} strokeLinecap="round" fill="none" />
              <Leaf x={320} y={376} a={-150} len={58} tag="seedleaf" />
              <Leaf x={320} y={392} a={-24} len={50} tag="seedleaf" />
              <PuzzleLeaf x={320} y={354} a={-78} len={70} tag="puzzle1" />
              {[212, 428].map((x, i) => (
                <g key={x}>
                  <path
                    data-j="sproutstem"
                    d={`M${x} 446 C${x} 420 ${x + (i ? 4 : -4)} 396 ${x} 372`}
                    stroke="var(--leaf)"
                    strokeWidth={6}
                    strokeLinecap="round"
                    fill="none"
                  />
                  <Leaf x={x} y={376} a={-140} len={54} tag="sproutleaf" />
                  <Leaf x={x} y={380} a={-40} len={54} tag="sproutleaf" />
                </g>
              ))}
            </g>

            <path d={SOIL} fill="var(--soil)" />

            {/* Stage 2: falling seeds */}
            {SEEDS.map((s, i) => (
              <g key={s.label} data-j="seed">
                <path d="M0 -12 C7 -3 9 5 0 12 C-9 5 -7 -3 0 -12 Z" transform={`translate(${s.x} 420) rotate(${(i - 1) * 20})`} fill={s.c} />
                <text x={s.x} y={i === 1 ? 392 : 400} textAnchor="middle" className={styles.seedLabel}>
                  {s.label}
                </text>
              </g>
            ))}

            {/* Stage 4: community */}
            <Bust x={282} y={208} s={0.9} tag="person" />
            <Bust x={360} y={238} s={0.8} tag="person" />
            <Person x={452} y={460} s={1} tag="person" />
            <Person x={176} y={462} s={0.9} tag="person" color="var(--sky)" />
            <Person x={518} y={466} s={0.75} tag="person" color="var(--sky)" />
            {[110, 236, 400, 560].map((x, i) => (
              <g key={x} data-j="mini">
                <path d={`M${x} ${468 - (i % 2) * 6} l0 -22`} stroke="var(--leaf)" strokeWidth={4} strokeLinecap="round" />
                <Leaf x={x} y={452 - (i % 2) * 6} a={-150} len={22} tag="mini-leaf" />
                <Leaf x={x} y={454 - (i % 2) * 6} a={-30} len={22} tag="mini-leaf" />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
