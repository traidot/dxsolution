"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import Reveal from "./Reveal";

export default function Products({ dict, lang = "vi" }: { dict: Dictionary; lang?: Locale }) {
  const t = dict.products;
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleGroupHover = (index: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveGroupIndex(index);
    }, 110);
  };

  const handleGroupLeave = () => {
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

  const activeGroup = t.groups[activeGroupIndex] ?? t.groups[0];

  return (
    <section id="systems" className="py-20 lg:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        {/* Section Header */}
        <Reveal className="max-w-3xl mb-14 lg:mb-20">
          <span className="text-[12px] font-mono font-bold text-[#0c48d8] tracking-[0.14em] uppercase block mb-3">
            {t.eyebrow}
          </span>
          <h2 className="vnext-h2">
            {lang === "vi" ? (
              <>
                Bộ giải pháp{" "}
                <span className="font-bold text-[#0c48d8]">
                  vận hành doanh nghiệp toàn diện
                </span>
              </>
            ) : (
              <>
                Comprehensive{" "}
                <span className="font-bold text-[#0c48d8]">
                  enterprise operations suite
                </span>
              </>
            )}
          </h2>
          <p className="mt-4 text-[16px] text-neutral-600 font-normal leading-relaxed">
            {t.subtitle}
          </p>
        </Reveal>

        {/* 2-Column Split: Left Pillar Switcher + Right Sub-module Showcase */}
        <Reveal delay={80} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Sticky Pillar Selector - Sharp 4px */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-2.5">
            {t.groups.map((group, idx) => {
              const isSelected = activeGroupIndex === idx;
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => {
                    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                    setActiveGroupIndex(idx);
                  }}
                  onMouseEnter={() => handleGroupHover(idx)}
                  onMouseLeave={handleGroupLeave}
                  className={`group text-left p-4 rounded-[4px] transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[#f6f7f9] border border-neutral-300 shadow-xs"
                      : "hover:bg-neutral-50 border border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[11.5px] font-mono font-bold tracking-wider uppercase transition-colors ${
                        isSelected ? "text-[#0c48d8]" : "text-neutral-400 group-hover:text-neutral-600"
                      }`}
                    >
                      PHÂN HỆ {group.num}
                    </span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-[2px] font-medium font-mono transition-colors ${
                        isSelected
                          ? "bg-[#0c48d8]/10 text-[#0c48d8]"
                          : "bg-neutral-200/60 text-neutral-500"
                      }`}
                    >
                      {group.badge}
                    </span>
                  </div>

                  <h3
                    className={`font-headline text-[16px] font-bold transition-all duration-200 ${
                      isSelected
                        ? "text-[#1a1a1a]"
                        : "text-neutral-600 group-hover:text-neutral-900"
                    }`}
                  >
                    {group.title}
                  </h3>

                  {/* Indicator Line */}
                  <div className="mt-3 h-[2px] w-full bg-neutral-200 overflow-hidden">
                    <div
                      className={`h-full bg-[#0c48d8] transition-all duration-300 ${
                        isSelected ? "w-full" : "w-0 group-hover:w-1/4"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Module Cards - Sharp 4px & 6px */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="p-7 sm:p-9 rounded-[6px] border border-neutral-200 bg-[#fbfcfd] shadow-xs">
              {/* Header of Active Pillar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
                <div>
                  <span className="text-[12px] font-mono font-bold text-[#0c48d8] tracking-widest uppercase">
                    PHÂN HỆ {activeGroup.num}
                  </span>
                  <h3 className="font-headline text-[24px] sm:text-[28px] font-bold text-[#1a1a1a] mt-1">
                    {activeGroup.title}
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[3px] bg-emerald-50 border border-emerald-200 text-emerald-800 text-[12px] font-semibold font-mono shrink-0">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M13.33 4L6 11.33 2.67 8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{activeGroup.badge}</span>
                </div>
              </div>

              <p className="mt-5 text-[15.5px] text-neutral-600 leading-relaxed font-normal">
                {activeGroup.description}
              </p>

              {/* Submodules Grid - Sharp 4px */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {activeGroup.modules.map((mod) => (
                  <div
                    key={mod.name}
                    className="p-4 rounded-[4px] border border-neutral-200 bg-white hover:border-[#0c48d8]/50 hover:shadow-xs transition-all duration-150"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#0c48d8] shrink-0" />
                      <h4 className="font-headline text-[15px] font-bold text-[#1a1a1a]">
                        {mod.name}
                      </h4>
                    </div>
                    <p className="text-[13px] text-neutral-500 leading-relaxed pl-3.5">
                      {mod.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Highlight Callout */}
              <div className="mt-8 pt-5 border-t border-neutral-200 flex items-center gap-2.5 text-[13.5px] font-semibold text-[#0c48d8]">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="8" cy="8" r="7" />
                  <path d="M5.5 8l1.8 1.8 3.2-3.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{activeGroup.highlight}</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Integration Gateway Bar - Sharp 4px */}
        <Reveal delay={120} className="mt-16 pt-12 border-t border-neutral-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h4 className="font-headline text-[18px] sm:text-[20px] font-bold text-[#1a1a1a]">
                {t.integrationBar.title}
              </h4>
              <p className="text-[14px] text-neutral-500 mt-1">
                {t.integrationBar.subtitle}
              </p>
            </div>
            <span className="text-[12px] font-mono font-semibold text-[#0c48d8] bg-[#0c48d8]/10 px-2.5 py-1 rounded-[2px] shrink-0 w-fit">
              API SẴN SÀNG LIÊN THÔNG
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200 rounded-[4px] overflow-hidden shadow-xs">
            {t.integrationBar.items.map((item) => (
              <div
                key={item.name}
                className="bg-white p-5 hover:bg-neutral-50/80 transition-colors duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-[#0c48d8] mb-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 16l-4-4 4-4M17 8l4 4-4 4M14 4l-4 16" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-neutral-400">
                      GATEWAY
                    </span>
                  </div>
                  <h5 className="font-headline text-[15px] font-bold text-[#1a1a1a]">
                    {item.name}
                  </h5>
                  <p className="text-[13px] text-neutral-500 mt-1 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
