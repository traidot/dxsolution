"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import Reveal from "./Reveal";

export default function Products({ dict, lang = "vi" }: { dict: Dictionary; lang?: Locale }) {
  const t = dict.products;
  const [activeTab, setActiveTab] = useState<"software" | "ai">("software");
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTabHover = (tab: "software" | "ai") => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveTab(tab);
    }, 110);
  };

  const handleTabLeave = () => {
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

  const tabConfigs = [
    {
      key: "software" as const,
      label:
        lang === "vi" ? "DỊCH VỤ CỐT LÕI" : lang === "ja" ? "コアサービス" : "CORE SERVICES",
      anchor: "#core-software",
      items: t.items,
    },
    {
      key: "ai" as const,
      label:
        lang === "vi"
          ? "NĂNG LỰC CÔNG NGHỆ"
          : lang === "ja"
            ? "テクノロジー領域"
            : "TECHNOLOGY CAPABILITIES",
      anchor: "#ai-native",
      items: t.aiItems,
    },
  ];

  const allServicesLabel =
    lang === "vi" ? "TẤT CẢ DỊCH VỤ" : lang === "ja" ? "サービス一覧を見る" : "ALL SERVICES";

  return (
    <section id="products" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        {/* Section Header — solid corporate color, no gradient */}
        <Reveal className="max-w-3xl mb-14 lg:mb-20">
          <h2 className="vnext-h2">
            {lang === "vi" ? (
              <>
                Giải pháp thúc đẩy{" "}
                <span className="font-bold text-[#0c48d8]">
                  chuyển đổi số doanh nghiệp
                </span>
              </>
            ) : lang === "ja" ? (
              <>
                企業の{" "}
                <span className="font-bold text-[#0c48d8]">
                  DXを推進するソリューション
                </span>
              </>
            ) : (
              <>
                Solutions accelerating{" "}
                <span className="font-bold text-[#0c48d8]">
                  enterprise digital transformation
                </span>
              </>
            )}
          </h2>
          <p className="mt-4 text-[16px] text-neutral-600 font-normal leading-relaxed">
            {t.subtitle}
          </p>
        </Reveal>

        {/* 2-Column Split: Left Category Switcher + Right Hairline List */}
        <Reveal delay={90} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Category Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-5">
            {tabConfigs.map((tab) => {
              const isSelected = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                    setActiveTab(tab.key);
                  }}
                  onMouseEnter={() => handleTabHover(tab.key)}
                  onMouseLeave={handleTabLeave}
                  className="group text-left py-2 cursor-pointer"
                >
                  <h3
                    className={`font-headline text-[17px] sm:text-[18px] font-bold uppercase tracking-[0.04em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isSelected
                        ? "text-[#0c48d8] translate-x-0.5"
                        : "text-neutral-400 group-hover:text-neutral-700"
                    }`}
                  >
                    {tab.label}
                  </h3>
                  <div className="mt-3 h-[2px] w-full bg-neutral-200 overflow-hidden">
                    <div
                      className={`h-full bg-[#0c48d8] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isSelected ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                </button>
              );
            })}

            <div className="pt-6">
              <Link
                href={`/${lang}/solutions`}
                className="group inline-flex items-center gap-3 text-[13.5px] font-semibold uppercase tracking-[0.08em] text-[#1a1a1a] hover:text-[#0c48d8] transition-colors duration-300"
              >
                <span className="h-[1.5px] w-10 bg-[#0c48d8] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-14" />
                <span>{allServicesLabel}</span>
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
            </div>
          </div>

          {/* Right Editorial Hairline List — Stacked panels for smooth crossfade */}
          <div className="lg:col-span-8 grid grid-cols-1">
            {tabConfigs.map((tab) => {
              const isSelected = activeTab === tab.key;
              return (
                <div
                  key={tab.key}
                  aria-hidden={!isSelected}
                  className={`col-start-1 row-start-1 border-t border-neutral-200 divide-y divide-neutral-200 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isSelected
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  {tab.items.map((item, idx) => (
                    <Link
                      key={item.name}
                      href={`/${lang}/solutions${tab.anchor}`}
                      tabIndex={isSelected ? 0 : -1}
                      className="group py-6 sm:py-7 flex items-center justify-between gap-6 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-neutral-50/80 px-3 sm:px-5 -mx-3 sm:-mx-5 rounded-[6px]"
                    >
                      <div className="flex items-start gap-5 sm:gap-7">
                        <span className="text-[15px] font-normal text-neutral-400 group-hover:text-[#0c48d8] transition-colors duration-300 pt-0.5 tabular-nums">
                          0{idx + 1}
                        </span>
                        <div className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                          <h4 className="font-headline text-[19px] sm:text-[21px] font-semibold text-[#1a1a1a] group-hover:text-[#0c48d8] transition-colors duration-300">
                            {item.name}
                          </h4>
                          <p className="mt-1.5 text-[15px] text-neutral-500 font-normal leading-relaxed max-w-2xl">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <span className="shrink-0 w-9 h-9 rounded-[6px] border border-neutral-200 flex items-center justify-center text-neutral-400 group-hover:border-[#0c48d8] group-hover:bg-[#0c48d8] group-hover:text-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <svg
                          width="13"
                          height="13"
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
                      </span>
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
