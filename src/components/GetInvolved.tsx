"use client";

import { useRef } from "react";
import { involved, site } from "@/content/site";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { Arrow } from "./Hero";
import EmailCard from "./EmailCard";
import styles from "./GetInvolved.module.css";

export default function GetInvolved() {
  const root = useRef<HTMLElement>(null);
  const { partner, volunteer, donate } = involved.paths;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(`.${styles.title} span`, {
          yPercent: 100,
          opacity: 0,
          duration: 0.9,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: { trigger: `.${styles.title}`, start: "top 80%" },
        });
        gsap.from(`.${styles.card}`, {
          y: 50,
          opacity: 0,
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
    <section id="get-involved" ref={root} className={styles.involved}>
      <div className="container">
        <span className="note">your turn</span>
        <h2 className={styles.title}>
          {involved.title.split(" ").map((w, i) => (
            <span key={i}>{w} </span>
          ))}
        </h2>

        <div className={styles.cards}>
          <article className={`${styles.card} ${styles.partner}`}>
            <h3>{partner.title}</h3>
            <p>{partner.body}</p>
            <a className="btn btn-ghost" href="#contact">
              {partner.cta} <Arrow />
            </a>
          </article>

          <article className={`${styles.card} ${styles.volunteer}`}>
            <h3>{volunteer.title}</h3>
            <p>{volunteer.body}</p>
            <a className="btn btn-primary" href={site.volunteerFormUrl} target="_blank" rel="noopener noreferrer">
              {volunteer.cta} <Arrow />
            </a>
          </article>

          <article id="donate" className={`${styles.card} ${styles.donate}`}>
            <h3>
              {donate.title}
              {!site.donationsOpen && <span className={styles.badge}>opening soon</span>}
            </h3>
            <p>{donate.body}</p>
            {!site.donationsOpen && <p className={styles.pending}>{donate.pending}</p>}
          </article>
        </div>

        <EmailCard />
      </div>
    </section>
  );
}
