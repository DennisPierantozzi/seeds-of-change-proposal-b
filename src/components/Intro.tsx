"use client";

import { useRef } from "react";
import { intro } from "@/content/site";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import styles from "./Intro.module.css";

export default function Intro() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(`.${styles.context}`, {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
        // Words light up as the statement scrolls through the viewport
        gsap.fromTo(
          `.${styles.word}`,
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: `.${styles.statement}`, start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className={styles.intro}>
      <div className="container">
        <div className={styles.context}>
          <span className="note">why we started</span>
          <p>{intro.context}</p>
        </div>
        <p className={styles.statement}>
          {intro.statement.split(" ").map((w, i) => (
            <span key={i} className={styles.word}>
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
