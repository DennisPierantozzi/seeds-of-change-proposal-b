"use client";

import { useRef } from "react";
import { hero } from "@/content/site";
import { asset } from "@/lib/asset";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import styles from "./Hero.module.css";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from("[data-rise]", { yPercent: 110, duration: 1, stagger: 0.08 })
          .from("[data-fade]", { opacity: 0, y: 20, duration: 0.8, stagger: 0.08 }, "-=0.6")
          .from(`.${styles.mark}`, { backgroundSize: "0% 100%", duration: 0.7, ease: "power2.inOut" }, "-=0.3")
          .from(`.${styles.polaroid}`, { y: 60, rotate: 10, opacity: 0, duration: 1.1 }, 0.1)
          .from(`.${styles.tape}`, { scaleX: 0, duration: 0.4, stagger: 0.1 }, 0.9)
          .from(`.${styles.seed}`, { y: -80, opacity: 0, duration: 1, stagger: 0.1, ease: "bounce.out" }, 0.6);

        // Polaroid drifts as the user scrolls on
        gsap.to(`.${styles.polaroid}`, {
          yPercent: 10,
          rotate: 5,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root },
  );

  const words = hero.title.split(" ");

  return (
    <section id="top" ref={root} className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <span className="note" data-fade>
            {hero.kicker}
          </span>
          <h1 className={styles.title}>
            {words.map((w, i) => (
              <span key={i} className={styles.wordMask}>
                <span data-rise className={i >= hero.markFrom ? styles.mark : undefined}>
                  {w}
                </span>
              </span>
            ))}
          </h1>
          <p className="lede" data-fade>
            {hero.lede}
          </p>
          <div className={styles.ctas} data-fade>
            <a href="#contact" className="btn btn-primary">
              Work with us <Arrow />
            </a>
            <a href="#journey" className="btn btn-ghost">
              See how it works
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          <figure className={styles.polaroid}>
            <span className={`${styles.tape} ${styles.tapeL}`} aria-hidden />
            <span className={`${styles.tape} ${styles.tapeR}`} aria-hidden />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/images/hands.png")} alt="Many hands stacked together in a circle" />
            <figcaption>{hero.caption}</figcaption>
          </figure>
          <svg className={styles.seeds} viewBox="0 0 120 120" aria-hidden>
            {[
              [30, 30, "var(--sky)"],
              [70, 18, "var(--navy)"],
              [92, 56, "var(--leaf)"],
            ].map(([x, y, c], i) => (
              <path
                key={i}
                className={styles.seed}
                d="M0 -10 C6 -2 8 4 0 10 C-8 4 -6 -2 0 -10 Z"
                transform={`translate(${x} ${y}) rotate(${i * 25 - 20})`}
                fill={c as string}
              />
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}

export function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
