"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpLeft, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
      if (event.key === "Tab") {
        const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
        const last = items.at(-1);
        if (event.shiftKey && document.activeElement === items[0]) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          items[0]?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled || open ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="صَرْح — الرئيسية">صَرْح<span className="brand-line" /></Link>
        <nav className="desktop-nav" aria-label="التنقل الرئيسي">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)) ? "active" : ""} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>
          ))}
        </nav>
        <Link className="header-cta" href="/contact">استشر مهندسنا <ArrowUpLeft size={17} /></Link>
        <button ref={buttonRef} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "إغلاق القائمة" : "فتح القائمة"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="mobile-menu" id="mobile-menu" ref={menuRef}>
          <nav aria-label="التنقل على الهاتف">
            {navigation.map((item, index) => <Link key={item.href} href={item.href}><span>0{index + 1}</span>{item.label}<ArrowUpLeft /></Link>)}
          </nav>
          <p>من الأرض إلى الصرح، برؤية واحدة وتفاصيل مدروسة.</p>
          <Link href="/contact" className="button button-primary">ابدأ استشارتك الآن <ArrowUpLeft size={18} /></Link>
        </div>
      )}
    </header>
  );
}
