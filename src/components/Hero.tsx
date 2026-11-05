"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import ContactButton from "./ContactButton";

interface HeroPillarVisual {
  id: string;
  code: string;
  tabLabel: string;
  title: string;
  highlight: string;
  metric: string;
  imgUrl: string;
}

const HERO_VISUALS: HeroPillarVisual[] = [
  {
    id: "finance",
    code: "01",
    tabLabel: "Tài chính & Quỹ",
    title: "Tài chính & Dòng tiền vận hành",
    highlight: "Quản trị đa quỹ thu chi · AI đọc hóa đơn & đối chiếu sao kê tự động",
    metric: "100% Minh bạch",
    imgUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "supply",
    code: "02",
    tabLabel: "Kho & Chuỗi cung ứng",
    title: "Bán hàng & Quản trị kho đa điểm",
    highlight: "Liên thông đơn hàng OMS · Kiểm soát tồn kho thời gian thực & Lô/HSD",
    metric: "99.8% Khớp sổ",
    imgUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "mes",
    code: "03",
    tabLabel: "Dự án & MES",
    title: "Dự án, Sản xuất & Định mức BOM",
    highlight: "Bóc tách dự toán công trình · Lập lệnh sản xuất & kiểm soát hao hụt",
    metric: "Chuẩn hóa MES",
    imgUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "admin",
    code: "04",
    tabLabel: "Hành chính số",
    title: "Văn phòng số & Ký duyệt trực tuyến",
    highlight: "Số hóa luồng tờ trình · Ký số từ xa & cảnh báo hạn hợp đồng pháp chế",
    metric: "-65% Giấy tờ",
    imgUrl:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85",
  },
];

export default function Hero({ dict, lang = "vi" }: { dict: Dictionary; lang?: Locale }) {
  const t = dict.hero;
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto rotate tabs every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_VISUALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentVisual = HERO_VISUALS[activeIndex] ?? HERO_VISUALS[0];

  return (
    <section className="relative pt-24 lg:pt-32 pb-20 lg:pb-28 overflow-hidden bg-white border-b border-neutral-200">
      {/* Subtle ambient workspace background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-blue-50/50 blur-3xl opacity-70" />
        <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Value Proposition & Positioning */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Endorsed by DXSolution Badge - Sharp 3px */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[3px] bg-neutral-100 border border-neutral-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-[1px] bg-[#0c48d8]" />
              <span className="text-[12px] font-semibold text-neutral-700 tracking-wide font-mono">
                {t.brandTag}
              </span>
            </div>

            {/* Headline — Balanced 2-line layout without orphan words */}
            <h1 className="font-headline text-[30px] sm:text-[36px] lg:text-[38px] xl:text-[42px] font-bold text-[#1a1a1a] leading-[1.24] tracking-tight mb-5 max-w-2xl">
              {lang === "vi" ? (
                <>
                  <span className="block">Hệ thống vận hành chuyên&nbsp;biệt</span>
                  <span className="text-[#0c48d8] block mt-1.5">
                    cho từng doanh nghiệp
                  </span>
                </>
              ) : lang === "ja" ? (
                <>
                  <span className="block">実業務に最適化された業務基盤を、</span>
                  <span className="text-[#0c48d8] block mt-1.5">
                    一社一社の現場へ
                  </span>
                </>
              ) : (
                <>
                  <span className="block">Bespoke Operations System</span>
                  <span className="text-[#0c48d8] block mt-1.5">
                    for your enterprise
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-[15.5px] sm:text-[16.5px] text-neutral-600 font-normal leading-relaxed mb-8 max-w-lg">
              {t.subtitle}
            </p>

            {/* Action Buttons - Sharp 4px */}
            <div className="flex flex-wrap items-center gap-3 mb-10 w-full sm:w-auto">
              <ContactButton className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0c48d8] text-white rounded-[4px] font-semibold text-[14px] hover:bg-[#0835a6] transition-all duration-150 shadow-xs cursor-pointer">
                <span>{t.ctaPrimary}</span>
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ContactButton>

              <Link
                href="#systems"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200 text-neutral-800 rounded-[4px] font-semibold text-[14px] transition-all duration-150"
              >
                <span>{t.ctaSecondary}</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 12l4-4-4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            {/* 3 Core Value Pills - Sharp 3px */}
            <div className="pt-6 border-t border-neutral-200 w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-[13px] font-medium text-neutral-700 whitespace-nowrap">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] bg-[#0c48d8]/10 text-[#0c48d8] text-[10px] font-bold">
                  ✓
                </span>
                <span>{t.chipTailored}</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] font-medium text-neutral-700 whitespace-nowrap">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] bg-[#0c48d8]/10 text-[#0c48d8] text-[10px] font-bold">
                  ✓
                </span>
                <span>{t.chipUnlimited}</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] font-medium text-neutral-700 whitespace-nowrap">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] bg-[#0c48d8]/10 text-[#0c48d8] text-[10px] font-bold">
                  ✓
                </span>
                <span>{t.chipAi}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Unsplash Showcase Window */}
          <div className="lg:col-span-6 relative">
            {/* The OS Frame Window - Sharp 6px */}
            <div className="rounded-[6px] border border-neutral-300 bg-white shadow-[0_16px_40px_-20px_rgba(11,28,48,0.18)] overflow-hidden">
              {/* Window Header */}
              <div className="bg-neutral-100 border-b border-neutral-200 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-[1px] bg-[#ff5f56] inline-block" />
                    <span className="w-2.5 h-2.5 rounded-[1px] bg-[#ffbd2e] inline-block" />
                    <span className="w-2.5 h-2.5 rounded-[1px] bg-[#27c93f] inline-block" />
                  </div>
                  <span className="text-neutral-300 ml-1.5">|</span>
                  <div className="flex items-center gap-1.5 ml-1">
                    <span className="w-2 h-2 rounded-[1px] bg-[#0c48d8]" />
                    <span className="text-[12px] font-mono font-semibold text-neutral-700">
                      DXBiz Work OS · Vận hành doanh nghiệp
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-[2px] bg-white border border-neutral-200 text-neutral-500">
                    AI4W Platform
                  </span>
                </div>
              </div>

              {/* Pillar Selector Tabs */}
              <div className="grid grid-cols-4 border-b border-neutral-200 bg-neutral-50 text-[11.5px] sm:text-[12.5px] font-bold text-neutral-600">
                {HERO_VISUALS.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`py-2.5 px-1.5 text-center transition-colors cursor-pointer ${
                        isActive
                          ? "bg-white text-[#0c48d8] border-b-2 border-[#0c48d8]"
                          : "hover:bg-neutral-100"
                      }`}
                    >
                      {item.tabLabel}
                    </button>
                  );
                })}
              </div>

              {/* Main Visual Image Frame with Crossfading Unsplash Photos */}
              <div className="relative aspect-[16/10.5] bg-neutral-900 overflow-hidden">
                {HERO_VISUALS.map((item, idx) => {
                  const isCurrent = idx === activeIndex;
                  return (
                    <img
                      key={item.id}
                      src={item.imgUrl}
                      alt={item.title}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isCurrent
                          ? "opacity-90 scale-100"
                          : "opacity-0 scale-[1.03] pointer-events-none"
                      }`}
                    />
                  );
                })}

                {/* Gradient shade for bottom text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                {/* Top Badge inside Image */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-[2px] bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] font-semibold uppercase">
                    PHÂN HỆ {currentVisual.code}
                  </span>
                  <span className="px-2.5 py-1 rounded-[2px] bg-[#0c48d8] text-white font-mono text-[11px] font-bold shadow-xs">
                    {currentVisual.metric}
                  </span>
                </div>

                {/* Bottom Info Strip inside Image */}
                <div className="absolute bottom-3.5 left-4 right-4 text-white">
                  <h3 className="font-headline text-[17px] sm:text-[19px] font-bold text-white leading-snug">
                    {currentVisual.title}
                  </h3>
                  <p className="text-[12.5px] sm:text-[13px] text-white/80 mt-1 leading-relaxed font-light">
                    {currentVisual.highlight}
                  </p>
                </div>
              </div>

              {/* Bottom Integration Footer inside Frame */}
              <div className="bg-white px-4 py-2.5 border-t border-neutral-200 flex items-center justify-between text-[11.5px] text-neutral-500 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-emerald-500" />
                  Dữ liệu tập trung · Không phân mảnh
                </span>
                <span className="text-[#0c48d8] font-semibold">
                  Liên thông MISA & VietQR
                </span>
              </div>
            </div>

            {/* Floating Live Badge Top-Right - Sharp 4px */}
            <div className="hidden sm:flex absolute -top-3 -right-2 bg-white/98 px-3 py-1.5 rounded-[4px] border border-neutral-300 shadow-md items-center gap-2 text-[12px] font-semibold text-neutral-800">
              <span className="w-2 h-2 rounded-[1px] bg-emerald-500" />
              <span>Khớp chuẩn quy trình thực tế</span>
            </div>

            {/* Floating Live Badge Bottom-Left - Sharp 4px */}
            <div className="hidden sm:flex absolute -bottom-3 -left-2 bg-white/98 px-3 py-1.5 rounded-[4px] border border-neutral-300 shadow-md items-center gap-2 text-[12px] font-semibold text-neutral-800">
              <span className="w-2 h-2 rounded-[1px] bg-[#0c48d8]" />
              <span>AI Đọc hóa đơn & Đối soát</span>
            </div>
          </div>
        </div>

        {/* 4 Bottom Enterprise Stat Counters - Sharp 4px */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200 rounded-[4px] overflow-hidden mt-16 shadow-xs">
          {t.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-6 flex flex-col justify-between hover:bg-neutral-50/80 transition-colors duration-200"
            >
              <div className="font-headline text-[30px] sm:text-[36px] font-bold text-[#1a1a1a] tracking-tight tabular-nums">
                {stat.value}
              </div>
              <div className="text-[13px] text-neutral-500 mt-2 font-normal leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
