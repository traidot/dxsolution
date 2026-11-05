"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import { useContact } from "./ContactModal";

const LOCALES: { code: Locale; label: string }[] = [
  { code: "vi", label: "VI" },
  { code: "en", label: "EN" },
];

export default function Header({ nav, lang }: { nav: Dictionary["nav"]; lang: Locale }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { open: openContact } = useContact();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rest = pathname.replace(/^\/(vi|en)(?=\/|$)/, "");
  const localeHref = (code: Locale) => `/${code}${rest || ""}`;

  const navLinks = [
    { label: nav.products, href: "#systems" },
    { label: nav.solutions, href: "#solutions" },
    { label: nav.features, href: "#features" },
    { label: nav.cases, href: "#testimonials" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? "h-16 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
          : "h-20 bg-white/80 backdrop-blur-xs border-b border-neutral-200/50"
      }`}
    >
      <div className="flex justify-between items-center h-full px-5 md:px-10 max-w-[1400px] mx-auto">
        {/* Brand Logo & Wordmark — Single-line alignment with By DXS */}
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2.5 group focus:outline-none"
          aria-label={nav.home}
        >
          <div className="relative w-8 h-8 shrink-0 flex items-center justify-center">
            <Image
              src="/dxbiz-mark.svg"
              alt="DXBiz Logo"
              width={32}
              height={32}
              priority
              className="w-8 h-8 object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-brand text-[21px] font-extrabold uppercase tracking-[0.03em] flex items-center leading-none">
              <span className="text-[#0c48d8]">DX</span>
              <span className="text-[#1a1a1a]">Biz</span>
            </span>
            <span className="h-3.5 w-px bg-neutral-300" />
            <span className="text-[12px] font-semibold text-neutral-500 tracking-wider uppercase font-sans leading-none pt-0.5">
              By DXS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium text-neutral-600 hover:text-[#0c48d8] px-3 py-1.5 rounded-[3px] hover:bg-neutral-100/70 transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Segmented Locale Switcher */}
          <div
            className="flex items-center rounded-[3px] border border-neutral-300/80 p-0.5 bg-neutral-100/60"
            role="group"
            aria-label={nav.switchLanguage}
          >
            {LOCALES.map(({ code, label }) => (
              <Link
                key={code}
                href={localeHref(code)}
                aria-current={code === lang ? "true" : undefined}
                className={`text-[12px] font-bold px-2 py-0.5 rounded-[2px] transition-all duration-150 font-mono ${
                  code === lang
                    ? "bg-[#0c48d8] text-white shadow-xs"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Consultation Button - Sharp 4px */}
          <button
            type="button"
            onClick={openContact}
            className="hidden sm:inline-flex items-center justify-center text-[13.5px] font-semibold px-4 sm:px-5 py-2.5 bg-[#0c48d8] text-white rounded-[4px] hover:bg-[#0835a6] transition-all duration-150 shadow-xs cursor-pointer"
          >
            {nav.contact}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-[3px] border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-200 bg-white/98 backdrop-blur-lg px-5 py-5 shadow-lg animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[15px] font-medium text-neutral-800 hover:text-[#0c48d8] py-2 px-3 rounded-[3px] hover:bg-neutral-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-neutral-200 mt-1">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openContact();
                }}
                className="w-full py-2.5 bg-[#0c48d8] text-white rounded-[4px] font-semibold text-[14px] hover:bg-[#0835a6] transition-colors"
              >
                {nav.contact}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
