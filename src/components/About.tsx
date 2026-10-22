"use client";

import { useRef } from "react";
import { about } from "@/content/site";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import styles from "./About.module.css";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>(`.${styles.item}`).forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0.15, x: -16 },
            {
              opacity: 1,
              x: 0,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 85%", end: "top 55%", scrub: true },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="team" ref={root} className={styles.about}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.side}>
          <span className="note">who we are</span>
          <h2 className="h2">{about.title}</h2>
          <p className="lede">{about.lede}</p>
        </div>
        <ul className={styles.list}>
          {about.experience.map((e) => (
            <li key={e} className={styles.item}>
              <span className={styles.we}>We&rsquo;ve</span> {e}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
