import { nav, site } from "@/content/site";
import { LogoMark } from "./illustrations";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <LogoMark size={44} />
          <div>
            <strong>Seeds of Change</strong>
            <p>Community · Perspective · Expertise</p>
          </div>
        </div>
        <nav className={styles.links} aria-label="Footer">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </nav>
      </div>
      <div className={`container ${styles.base}`}>
        <span>© {site.name} 2026</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
