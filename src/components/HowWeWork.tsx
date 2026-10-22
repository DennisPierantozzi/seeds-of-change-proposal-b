"use client";

import { useRef } from "react";
import { steps, stepsNote } from "@/content/site";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import styles from "./HowWeWork.module.css";

export default function HowWeWork() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ ok: MOTION_OK, narrow: "(max-width: 860px)" }, (ctx) => {
        const { ok, narrow } = ctx.conditions as { ok: boolean; narrow: boolean };
        if (!ok) return;
        const tl = gsap.timeline({
          scrollTrigger: { trigger: `.${styles.steps}`, start: "top 75%", end: "bottom 55%", scrub: 0.5 },
        });
        tl.from(`.${styles.fill}`, { [narrow ? "scaleY" : "scaleX"]: 0, ease: "none", duration: 4 }, 0);
        gsap.utils.toArray<HTMLElement>(`.${styles.step}`).forEach((el, i) => {
          tl.from(el, { opacity: 0, y: 30, duration: 0.6 }, i)
            .from(el.querySelector(`.${styles.dot}`), { backgroundColor: "#ffffff", scale: 0.6, duration: 0.3 }, i + 0.2);
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="how" ref={root} className={styles.how}>
      <div className="container">
        <div className={styles.head}>
          <span className="note">how we work</span>
          <h2 className="h2">A partnership, not a project.</h2>
        </div>

        <div className={styles.wrap}>
          <span className={styles.track} aria-hidden>
            <span className={styles.fill} />
          </span>
          <ol className={styles.steps}>
          {steps.map((s, i) => (
            <li key={s.label} className={styles.step}>
              <span className={styles.dot} aria-hidden>
                {i + 1}
              </span>
              <h3>{s.label}</h3>
              <p>{s.body}</p>
            </li>
          ))}
          </ol>
        </div>

        <p className={styles.note}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.7M20 4v4.7h-4.7M20 12a8 8 0 0 1-13.7 5.6L4 15.3M4 20v-4.7h4.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {stepsNote}
        </p>
      </div>
    </section>
  );
}
