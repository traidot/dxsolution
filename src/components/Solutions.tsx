"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import Reveal from "./Reveal";

const DOMAIN_IMAGES = [
  "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
];

export default function Solutions({ dict, lang = "vi" }: { dict: Dictionary; lang?: Locale }) {
  const t = dict.solutions;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (index: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setSelectedIndex(index);
    }, 120);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const exploreAllLabel =
    lang === "vi" ? "KHÁM PHÁ TẤT CẢ" : lang === "ja" ? "すべての業界を見る" : "EXPLORE ALL";
  const viewDetailLabel =
    lang === "vi"
      ? "Xem chi tiết ngành"
      : lang === "ja"
        ? "業界別ソリューション詳細"
        : "View industry details";

  return (
    <section id="solutions" className="py-20 lg:py-28 bg-[#f6f7f9] border-y border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        {/* Section Header */}
        <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 lg:mb-20">
          <h2 className="vnext-h2 max-w-3xl">
            {lang === "vi" ? (
              <>
                <span className="font-bold text-[#0c48d8]">Kiến tạo giá trị</span> qua
                <br />
                các giải pháp thông minh
              </>
            ) : lang === "ja" ? (
              <>
                <span className="font-bold text-[#0c48d8]">インテリジェントな</span>
                <br />
                ソリューションで価値を創造
              </>
            ) : (
              <>
                <span className="font-bold text-[#0c48d8]">Creating value</span> through
                <br />
                intelligent solutions
              </>
            )}
          </h2>

          <Link
            href={`/${lang}/industries`}
            className="group inline-flex items-center gap-3 text-[13.5px] font-semibold uppercase tracking-[0.08em] text-[#1a1a1a] hover:text-[#0c48d8] transition-colors duration-300 shrink-0"
          >
            <span className="h-[1.5px] w-10 bg-[#0c48d8] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-14" />
            <span>{exploreAllLabel}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            >
              <path
                d="M1.5 12.5L12.5 1.5M12.5 1.5H3.5M12.5 1.5V10.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </Reveal>

        {/* 2-Column Industry Showcase */}
        <Reveal delay={90} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Visual Showcase with stacked crossfading images AND stacked crossfading text panels */}
          <div className="lg:col-span-6 relative min-h-[460px] lg:min-h-[550px] rounded-[12px] bg-[#0b0d14] overflow-hidden grid grid-cols-1">
            {t.domains.map((domain, idx) => {
              const imgUrl = DOMAIN_IMAGES[idx % DOMAIN_IMAGES.length];
              const isCurrent = idx === selectedIndex;
              return (
                <img
                  key={`img-${domain.id}`}
                  src={imgUrl}
                  alt={domain.badge}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isCurrent
                      ? "opacity-35 scale-100"
                      : "opacity-0 scale-[1.04] pointer-events-none"
                  }`}
                />
              );
            })}
            <div className="absolute inset-0 bg-[#0b0d14]/65 pointer-events-none" />

            {/* Stacked Domain Content Panels — zero layout shift, smooth 500ms crossfade */}
            {t.domains.map((domain, idx) => {
              const isCurrent = idx === selectedIndex;
              return (
                <div
                  key={`panel-${domain.id}`}
                  aria-hidden={!isCurrent}
                  className={`col-start-1 row-start-1 relative z-10 flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isCurrent
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-1.5 pointer-events-none"
                  }`}
                >
                  <div className="p-7 sm:p-9 flex items-baseline justify-between gap-4 border-b border-white/15 text-white">
                    <span className="text-[13px] font-medium uppercase tracking-[0.06em] text-white/75">
                      0{idx + 1} / {domain.badge}
                    </span>
                    <div className="text-right">
                      <span className="font-headline text-[26px] sm:text-[30px] font-bold text-white tabular-nums leading-none">
                        {domain.metricValue}
                      </span>
                      <span className="block text-[12px] text-white/65 mt-1">
                        {domain.metricLabel}
                      </span>
                    </div>
                  </div>

                  <div className="p-7 sm:p-9 text-white bg-[#0b0d14]/90 border-t border-white/15">
                    <h3 className="font-headline text-[20px] sm:text-[23px] font-semibold leading-snug text-white mb-2.5">
                      {domain.title}
                    </h3>

                    <p className="text-[14.5px] text-white/75 font-light leading-relaxed mb-5">
                      {domain.solution}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {domain.modules.map((mod) => (
                        <span
                          key={mod}
                          className="px-3 py-1 text-[12.5px] font-normal rounded-[6px] bg-white/10 border border-white/15 text-white/90"
                        >
                          {mod}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/${lang}/industries#${domain.id}`}
                      tabIndex={isCurrent ? 0 : -1}
                      className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-white hover:text-white/80 transition-colors duration-300"
                    >
                      <span>{viewDetailLabel}</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      >
                        <path
                          d="M1.5 12.5L12.5 1.5M12.5 1.5H3.5M12.5 1.5V10.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Smooth CSS Grid Accordion List */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <ul className="border-t border-neutral-300 divide-y divide-neutral-300">
              {t.domains.map((domain, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <li key={domain.id}>
                    <button
                      type="button"
                      onClick={() => {
                        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                        setSelectedIndex(index);
                      }}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      className="w-full text-left py-5 sm:py-6 flex flex-col group cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3
                          className={`font-headline text-[19px] sm:text-[21px] font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isSelected
                              ? "text-[#0c48d8] translate-x-1"
                              : "text-[#1a1a1a] group-hover:text-[#0c48d8] group-hover:translate-x-0.5"
                          }`}
                        >
                          {domain.badge}
                        </h3>

                        <span
                          className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isSelected
                              ? "text-[#0c48d8] translate-x-0.5 -translate-y-0.5"
                              : "text-neutral-400 group-hover:text-[#0c48d8] group-hover:translate-x-0.5"
                          }`}
                        >
                          <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path
                              d="M1.5 12.5L12.5 1.5M12.5 1.5H3.5M12.5 1.5V10.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>

                      {/* Smooth height + opacity expansion using CSS Grid 0fr -> 1fr */}
                      <div
                        className={`grid transition-[grid-template-rows,opacity,margin] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isSelected
                            ? "grid-rows-[1fr] opacity-100 mt-2.5"
                            : "grid-rows-[0fr] opacity-0 mt-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-[14.5px] text-neutral-600 font-normal leading-relaxed max-w-xl pl-1">
                            {domain.solution}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
