"use client";

import { useRef } from "react";
import { principles } from "@/content/site";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import styles from "./Principles.module.css";

export default function Principles() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(`.${styles.card}`, {
          y: 60,
          opacity: 0,
          rotate: (i) => (i % 2 ? 2 : -2),
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: `.${styles.cards}`, start: "top 80%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="principles" ref={root} className={styles.principles}>
      <div className="container">
        <div className={styles.head}>
          <span className="note">what guides us</span>
          <h2 className="h2">Their community. Their decisions.</h2>
          <p className="lede">{principles.lede}</p>
        </div>
        <ul className={styles.cards}>
          {principles.items.map((p, i) => (
            <li key={p.title} className={styles.card}>
              <span className={styles.n}>0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
