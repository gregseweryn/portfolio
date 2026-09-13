"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import styles from "./Nav.module.css";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close the overlay on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll, close on Escape, and keep focus with the menu while it's open.
  useEffect(() => {
    if (!open) return;

    // The menu covers the page, so tabbing out of it puts focus on links the
    // reader cannot see. The cycle is the overlay's own links plus the button
    // that closes it — that button lives in the header, outside the overlay, so
    // the trap is built from both rather than from the overlay alone.
    const focusables = () => {
      const toggle = toggleRef.current;
      const inOverlay = [...(overlayRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? [])];
      return toggle ? [toggle, ...inOverlay] : inOverlay;
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && (active === first || !active || !items.includes(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    overlayRef.current?.querySelector<HTMLElement>("a")?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      // Hand focus back to the button that opened it — but only if focus is
      // still inside the menu. Following a link out of it should leave focus
      // on the new page rather than yanking it back up to the header.
      const overlay = overlayRef.current;
      if (overlay && overlay.contains(document.activeElement)) {
        toggleRef.current?.focus();
      }
    };
  }, [open]);

  const isActive = (href: string) => href.startsWith("/") && !href.includes("#") && pathname === href;

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.wordmark} aria-label={`${site.name} – home`}>
          <span className={styles.name}>{site.name}</span>
          <span className={styles.role}>{site.role}</span>
        </Link>

        <nav className={styles.desktop} aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navlink} ${isActive(item.href) ? styles.active : ""}`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* inert rather than aria-hidden: it removes the closed menu from the
          accessibility tree AND from the tab order, so the two can't disagree. */}
      <div
        ref={overlayRef}
        id="mobile-menu"
        className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
        inert={!open}
      >
        <nav className={styles.overlayNav} aria-label="Primary mobile">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.overlayLink}
              style={{ transitionDelay: open ? `${80 + i * 55}ms` : "0ms" }}
            >
              {item.label}
            </Link>
          ))}
          <a href={`mailto:${site.email}`} className={styles.overlayContact}>
            {site.email}
          </a>
        </nav>
      </div>
    </header>
  );
}
