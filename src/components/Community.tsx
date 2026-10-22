"use client";

import { useRef } from "react";
import { community } from "@/content/site";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import styles from "./Community.module.css";

// Node positions in the network graphic (viewBox 0 0 400 300)
const NODES = [
  { x: 320, y: 80 },
  { x: 70, y: 110 },
  { x: 200, y: 250 },
];

export default function Community() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: `.${styles.net}`, start: "top 75%" } });
        tl.from(`.${styles.node}`, { scale: 0, transformOrigin: "50% 50%", duration: 0.6, stagger: 0.15, ease: "back.out(2)" })
          .from(`.${styles.link}`, { strokeDashoffset: 300, duration: 1, stagger: 0.15, ease: "power2.out" }, 0.3)
          .from(`.${styles.hub}`, { scale: 0, transformOrigin: "50% 50%", duration: 0.6, ease: "back.out(2)" }, 0.8);
        gsap.from(`.${styles.pillar}`, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: `.${styles.pillars}`, start: "top 85%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="community" ref={root} className={styles.community}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <span className="note">our community</span>
          <h2 className="h2">A network that looks after its own.</h2>
          <p className="lede">{community.lede}</p>
        </div>

        <svg className={styles.net} viewBox="0 0 400 300" role="img" aria-label="A collaborator in Asia, a volunteer in the USA and a trustee in the UK, connected">
          {NODES.map((a, i) => {
            const b = NODES[(i + 1) % NODES.length];
            return <line key={i} className={styles.link} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />;
          })}
          {NODES.map((n) => (
            <line key={`h${n.x}`} className={styles.link} x1={n.x} y1={n.y} x2={200} y2={150} />
          ))}
          <g className={styles.hub}>
            <circle cx={200} cy={150} r={26} />
            <path d="M190 150 l7 7 l13 -14" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          </g>
          {community.nodes.map((n, i) => (
            <g key={n.role} className={styles.node}>
              <circle cx={NODES[i].x} cy={NODES[i].y} r={34} className={styles.pulse} />
              <circle cx={NODES[i].x} cy={NODES[i].y} r={22} />
              <text x={NODES[i].x} y={NODES[i].y + 50} textAnchor="middle">
                <tspan className={styles.role}>{n.role}</tspan>
                <tspan className={styles.place} x={NODES[i].x} dy={16}>
                  {n.place}
                </tspan>
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className={`container ${styles.pillars}`}>
        {community.pillars.map((p) => (
          <div key={p.title} className={styles.pillar}>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
