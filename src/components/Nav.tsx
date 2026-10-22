"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { asset } from "@/lib/asset";
import styles from "./Nav.module.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 24);
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""} ${open ? styles.open : ""}`}>
      <div className={styles.inner}>
        <a href="#top" className={styles.logo} onClick={close} aria-label="The Seeds of Change Initiative, back to top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/images/logo.png")} alt="Seeds of Change" width={176} height={25} />
        </a>

        <nav className={styles.links} aria-label="Main">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={close}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href="#contact" className={`btn btn-primary ${styles.small}`} onClick={close}>
            Get in touch
          </a>
          <button
            className={styles.burger}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className={styles.progress} style={{ transform: `scaleX(${progress})` }} aria-hidden />
    </header>
  );
}
