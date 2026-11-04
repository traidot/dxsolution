"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import Reveal from "./Reveal";
import ContactButton from "./ContactButton";

const DOMAIN_IMAGES = [
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
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

  const activeDomain = t.items[selectedIndex] ?? t.items[0];

  return (
    <section id="solutions" className="py-20 lg:py-28 bg-[#f6f7f9] border-y border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        {/* Section Header */}
        <Reveal className="max-w-3xl mb-14 lg:mb-20">
          <span className="text-[12px] font-mono font-bold text-[#0c48d8] tracking-[0.14em] uppercase block mb-3">
            {t.eyebrow}
          </span>
          <h2 className="vnext-h2">
            {lang === "vi" ? (
              <>
                Thiết kế sẵn cho{" "}
                <span className="font-bold text-[#0c48d8]">
                  từng mô hình doanh nghiệp
                </span>
              </>
            ) : (
              <>
                Pre-architected for{" "}
                <span className="font-bold text-[#0c48d8]">
                  your business model
                </span>
              </>
            )}
          </h2>
          <p className="mt-4 text-[16px] text-neutral-600 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </Reveal>

        {/* 2-Column Industry Showcase - Sharp 6px & 4px */}
        <Reveal delay={90} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Visual Showcase - Sharp 6px */}
          <div className="lg:col-span-6 relative min-h-[460px] lg:min-h-[520px] rounded-[6px] bg-[#0b0d14] overflow-hidden grid grid-cols-1">
            {t.items.map((domain, idx) => {
              const imgUrl = DOMAIN_IMAGES[idx % DOMAIN_IMAGES.length];
              const isCurrent = idx === selectedIndex;
              return (
                <img
                  key={`img-${domain.id}`}
                  src={imgUrl}
                  alt={domain.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isCurrent
                      ? "opacity-40 scale-100"
                      : "opacity-0 scale-[1.03] pointer-events-none"
                  }`}
                />
              );
            })}

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d14] via-[#0b0d14]/60 to-transparent pointer-events-none" />

            {/* Content overlay */}
            <div className="relative z-10 p-7 sm:p-9 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between">
                <span className="text-[11.5px] font-mono font-bold tracking-widest text-[#0c48d8] uppercase bg-white/10 px-2.5 py-1 rounded-[2px] backdrop-blur-md">
                  MẪU NGÀNH 0{selectedIndex + 1}
                </span>
                <span className="text-[12px] text-white/60 font-medium font-mono">
                  {activeDomain.reference}
                </span>
              </div>

              <div className="mt-10">
                <div className="text-[12.5px] font-medium text-white/60 mb-1.5 font-mono">
                  {activeDomain.tag}
                </div>
                <h3 className="font-headline text-[24px] sm:text-[30px] font-bold text-white leading-tight mb-3">
                  {activeDomain.title}
                </h3>
                <p className="text-[14.5px] sm:text-[15.5px] text-white/80 leading-relaxed font-light mb-6">
                  {activeDomain.description}
                </p>

                {/* Core modules list pills - Sharp 2px */}
                <div>
                  <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-white/40 mb-2">
                    PHÂN HỆ CỐT LÕI TRIỂN KHAI:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDomain.coreModules.map((mod) => (
                      <span
                        key={mod}
                        className="px-2.5 py-0.5 rounded-[2px] bg-white/[0.08] border border-white/12 text-[12px] text-white/90 font-medium"
                      >
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Industry Selectors - Sharp 4px */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-2.5">
            {t.items.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                    setSelectedIndex(idx);
                  }}
                  className={`group relative p-5 sm:p-6 rounded-[4px] border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-white border-neutral-400 shadow-xs translate-x-0.5"
                      : "bg-white/70 border-neutral-200 hover:bg-white hover:border-neutral-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[11.5px] font-mono font-bold tracking-wider uppercase transition-colors ${
                            isSelected ? "text-[#0c48d8]" : "text-neutral-400 group-hover:text-neutral-600"
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <span className="text-neutral-300">·</span>
                        <span className="text-[12px] text-neutral-500 font-medium">
                          {item.tag}
                        </span>
                      </div>
                      <h4
                        className={`font-headline text-[17px] sm:text-[18px] font-bold transition-colors ${
                          isSelected ? "text-[#1a1a1a]" : "text-neutral-700 group-hover:text-neutral-900"
                        }`}
                      >
                        {item.title}
                      </h4>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-[3px] flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-[#0c48d8] text-white"
                          : "bg-neutral-100 text-neutral-400 group-hover:bg-neutral-200"
                      }`}
                    >
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 12l4-4-4-4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  <p className="mt-2 text-[13.5px] text-neutral-500 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Active bottom border indicator line */}
                  <div className="mt-3.5 h-[2px] w-full bg-neutral-100 overflow-hidden">
                    <div
                      className={`h-full bg-[#0c48d8] transition-all duration-300 ${
                        isSelected ? "w-full" : "w-0 group-hover:w-1/3"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Bottom Custom Survey Banner - Sharp 4px */}
        <Reveal delay={120} className="mt-12 p-7 sm:p-8 rounded-[4px] border border-neutral-300 bg-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div>
            <h4 className="font-headline text-[19px] font-bold text-[#1a1a1a]">
              {t.consultBanner.title}
            </h4>
            <p className="text-[14.5px] text-neutral-600 mt-1 max-w-2xl leading-relaxed">
              {t.consultBanner.subtitle}
            </p>
          </div>
          <ContactButton className="inline-flex items-center justify-center px-6 py-3 bg-[#0c48d8] text-white rounded-[4px] font-semibold text-[14px] hover:bg-[#0835a6] transition-all duration-150 shadow-xs shrink-0 cursor-pointer">
            {t.consultBanner.cta}
          </ContactButton>
        </Reveal>
      </div>
    </section>
  );
}
