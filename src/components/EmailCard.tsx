"use client";

import { useState } from "react";
import { site } from "@/content/site";
import styles from "./EmailCard.module.css";

export default function EmailCard() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (insecure origin, permissions); the address is still visible to select.
    }
  };

  return (
    <div id="contact" className={styles.card}>
      <div>
        <h3 className={styles.heading}>Email us</h3>
        <p className={styles.sub}>Write to the team.</p>
      </div>
      <div className={styles.address}>
        <a href={`mailto:${site.email}`} className={styles.email}>
          {site.email}
        </a>
        <button className={styles.copy} onClick={copy} aria-live="polite">
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
    </div>
  );
}
