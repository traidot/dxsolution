"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import ContactButton from "./ContactButton";

interface HeroSlide {
  label: string;
  code: string;
  title: string;
  desc: string;
  metricVal: string;
  metricLabel: string;
  tags: string[];
  href: string;
}

const IMAGE_PACKS = [
  {
    id: "tech",
    labelVi: "Hệ thống & Dữ liệu",
    labelEn: "Systems & Data",
    labelJa: "システム・データ",
    backdrop:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85",
    slides: [
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=85",
    ],
  },
  {
    id: "infrastructure",
    labelVi: "Hạ tầng & Vận hành",
    labelEn: "Infrastructure",
    labelJa: "インフラ・運用",
    backdrop:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=2000&q=85",
    slides: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
    ],
  },
  {
    id: "architecture",
    labelVi: "Kiến trúc Doanh nghiệp",
    labelEn: "Architecture",
    labelJa: "コーポレート",
    backdrop:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2000&q=85",
    slides: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1600&q=85",
    ],
  },
] as const;

export default function Hero({ dict, lang = "vi" }: { dict: Dictionary; lang?: Locale }) {
  const t = dict.hero;
  const [activeIndex, setActiveIndex] = useState(0);
  const [packIndex, setPackIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const slidesByLocale: Record<Locale, HeroSlide[]> = {
    vi: [
      {
        label: "Phát triển Phần mềm",
        code: "01 / PHÁT TRIỂN PHẦN MỀM",
        title: "Phát triển ứng dụng Web, Mobile & Hệ thống quản trị chuyên biệt",
        desc: "Thiết kế kiến trúc và xây dựng phần mềm hiệu năng cao, bám sát quy trình nghiệp vụ thực tế của doanh nghiệp.",
        metricVal: "50+",
        metricLabel: "Dự án triển khai",
        tags: ["Web Application", "Mobile App", "Enterprise Portal"],
        href: `/${lang}/solutions#core-software`,
      },
      {
        label: "Giải pháp Doanh nghiệp & Tự động hóa",
        code: "02 / GIẢI PHÁP DOANH NGHIỆP",
        title: "Hệ thống ERP, CRM, OMS, WMS & Tự động hóa quy trình RPA",
        desc: "Liên thông dữ liệu xuyên suốt giữa các phòng ban, tự động hóa xử lý đơn hàng, kho vận và đối soát kế toán.",
        metricVal: "99.8%",
        metricLabel: "Độ chính xác dữ liệu",
        tags: ["ERP · OMS · WMS", "CRM Đa kênh", "Tự động hóa RPA"],
        href: `/${lang}/solutions#core-software`,
      },
      {
        label: "AI & Học máy",
        code: "03 / AI & DỮ LIỆU CHUYÊN SÂU",
        title: "Ứng dụng AI, Học máy, OCR & Phân tích dữ liệu quản trị (BI)",
        desc: "Tự động hóa bóc tách chứng từ, dự báo nhu cầu kinh doanh và trực quan hóa báo cáo điều hành thời gian thực.",
        metricVal: "-65%",
        metricLabel: "Tác vụ thủ công",
        tags: ["AI / GenAI", "Computer Vision & OCR", "BI & Data Warehouse"],
        href: `/${lang}/solutions#ai-native`,
      },
      {
        label: "Điện toán đám mây & DevOps",
        code: "04 / CLOUD & DEVOPS",
        title: "Tư vấn kiến trúc Cloud, chuyển đổi hạ tầng & tự động hóa CI/CD",
        desc: "Xây dựng hạ tầng đám mây an toàn, sẵn sàng mở rộng quy mô lớn và tối ưu chi phí vận hành hệ thống.",
        metricVal: "99.9%",
        metricLabel: "Độ sẵn sàng hệ thống",
        tags: ["Cloud Architecture", "CI/CD Pipeline", "Bảo mật & Giám sát"],
        href: `/${lang}/solutions#core-software`,
      },
      {
        label: "Hiện đại hóa hệ thống",
        code: "05 / HIỆN ĐẠI HÓA HỆ THỐNG",
        title: "Nâng cấp kiến trúc phần mềm & chuẩn hóa tích hợp dữ liệu",
        desc: "Chuyển đổi các hệ thống cũ sang nền tảng công nghệ hiện đại mà không làm gián đoạn hoạt động kinh doanh.",
        metricVal: "15+",
        metricLabel: "Nền tảng tích hợp API",
        tags: ["Nâng cấp Kiến trúc", "Chuyển đổi Dữ liệu", "Tích hợp Open API"],
        href: `/${lang}/process`,
      },
    ],
    en: [
      {
        label: "Software Development",
        code: "01 / SOFTWARE DEVELOPMENT",
        title: "Custom Enterprise Web, Mobile & Core Management Systems",
        desc: "Architecting and engineering high-performance software tailored to complex enterprise workflows.",
        metricVal: "50+",
        metricLabel: "Delivered projects",
        tags: ["Web Application", "Mobile App", "Enterprise Portal"],
        href: `/${lang}/solutions#core-software`,
      },
      {
        label: "Enterprise Solutions & Automation",
        code: "02 / ENTERPRISE SOLUTIONS",
        title: "ERP, CRM, OMS, WMS Platforms & RPA Workflow Automation",
        desc: "Connecting cross-departmental data and automating order fulfillment, warehousing, and accounting sync.",
        metricVal: "99.8%",
        metricLabel: "Data accuracy",
        tags: ["ERP · OMS · WMS", "Omnichannel CRM", "RPA Automation"],
        href: `/${lang}/solutions#core-software`,
      },
      {
        label: "AI & Machine Learning",
        code: "03 / AI & ADVANCED ANALYTICS",
        title: "Applied AI, Machine Learning, OCR & Executive BI Analytics",
        desc: "Automating document extraction, demand forecasting, and real-time operational intelligence.",
        metricVal: "-65%",
        metricLabel: "Manual workload",
        tags: ["AI / GenAI", "Computer Vision & OCR", "BI & Data Warehouse"],
        href: `/${lang}/solutions#ai-native`,
      },
      {
        label: "Cloud & DevOps",
        code: "04 / CLOUD & DEVOPS",
        title: "Cloud Architecture, Infrastructure Migration & CI/CD Automation",
        desc: "Building secure, highly available cloud infrastructure optimized for scale and cost efficiency.",
        metricVal: "99.9%",
        metricLabel: "System availability",
        tags: ["Cloud Architecture", "CI/CD Pipeline", "Security & Monitoring"],
        href: `/${lang}/solutions#core-software`,
      },
      {
        label: "System Modernization",
        code: "05 / SYSTEM MODERNIZATION",
        title: "Legacy System Re-Architecture & Seamless Data Migration",
        desc: "Upgrading legacy software into modern scalable platforms with zero operational disruption.",
        metricVal: "15+",
        metricLabel: "API integrations",
        tags: ["Re-Architecture", "Zero-Downtime Migration", "Open API Ecosystem"],
        href: `/${lang}/process`,
      },
    ],
    ja: [
      {
        label: "ソフトウェア開発",
        code: "01 / ソフトウェア開発",
        title: "業務向けWeb・モバイルアプリおよび基幹システムの設計・開発",
        desc: "企業の業務要件に即した高信頼性・高パフォーマンスのシステムをワンストップで構築します。",
        metricVal: "50+",
        metricLabel: "導入プロジェクト実績",
        tags: ["Webアプリケーション", "モバイルアプリ", "業務ポータル"],
        href: `/${lang}/solutions#core-software`,
      },
      {
        label: "業務システム・自動化",
        code: "02 / 業務システム・自動化",
        title: "ERP・CRM・OMS・WMS導入およびRPA業務プロセス自動化",
        desc: "部門間のデータを一元化し、受注処理・在庫管理・会計連携までをシームレスに自動化します。",
        metricVal: "99.8%",
        metricLabel: "データ整合性",
        tags: ["ERP · OMS · WMS", "統合CRM", "RPA自動化"],
        href: `/${lang}/solutions#core-software`,
      },
      {
        label: "AI・機械学習",
        code: "03 / AI・データ高度分析",
        title: "AI・機械学習・AI-OCRおよび経営BIダッシュボードの構築",
        desc: "帳票の自動データ化、需要予測モデルの導入、リアルタイムな経営可視化を実現します。",
        metricVal: "-65%",
        metricLabel: "手作業工数の削減",
        tags: ["AI / 生成AI", "画像認識・AI-OCR", "BI・DWH構築"],
        href: `/${lang}/solutions#ai-native`,
      },
      {
        label: "クラウド・DevOps",
        code: "04 / クラウド・DEVOPS",
        title: "クラウドアーキテクチャ設計・インフラ移行・CI/CD自動化",
        desc: "高い安全性と拡張性を備えたクラウド基盤を構築し、運用負荷とコストを最適化します。",
        metricVal: "99.9%",
        metricLabel: "システム稼働率",
        tags: ["クラウド設計・移行", "CI/CDパイプライン", "セキュリティ監視"],
        href: `/${lang}/solutions#core-software`,
      },
      {
        label: "システムモダナイゼーション",
        code: "05 / モダナイゼーション",
        title: "レガシーシステムの刷新および安全なデータ移行・API統合",
        desc: "既存の業務資産を活かしながら、業務を止めずに最新のアーキテクチャへ段階的に移行します。",
        metricVal: "15+",
        metricLabel: "外部API連携基盤",
        tags: ["アーキテクチャ刷新", "無停止データ移行", "オープンAPI連携"],
        href: `/${lang}/process`,
      },
    ],
  };

  const slides = slidesByLocale[lang];
  const currentPack = IMAGE_PACKS[packIndex];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const handleTabHover = (index: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveIndex(index);
    }, 90);
  };

  const handleTabLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const heroTitleLight =
    lang === "vi" ? "Công nghệ đồng hành," : lang === "ja" ? "企業の成長を加速する" : "Enterprise";
  const heroTitleBold =
    lang === "vi"
      ? "doanh nghiệp bứt phá."
      : lang === "ja"
        ? "DXソリューションパートナー"
        : "digital transformation solutions";

  const heroEyebrow =
    lang === "vi"
      ? "ĐỐI TÁC PHÁT TRIỂN PHẦN MỀM & CHUYỂN ĐỔI SỐ"
      : lang === "ja"
        ? "ソフトウェア開発・企業DX推進パートナー"
        : "SOFTWARE DEVELOPMENT & DIGITAL TRANSFORMATION PARTNER";

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[100dvh] bg-[#0b0d14] text-white flex flex-col justify-between overflow-hidden pt-[76px]"
    >
      {/* Dedicated Architectural Backdrop — 100% people-free */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {IMAGE_PACKS.map((pack, pIdx) => (
          <img
            key={`backdrop-${pack.id}`}
            src={pack.backdrop}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              pIdx === packIndex ? "opacity-25" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-[#0b0d14]/80" />
      </div>

      {/* Main 2-Column Hero Content */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-5 md:px-10 my-auto py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, Subtitle, CTAs & Key Stats */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-[6px] bg-white/[0.07] border border-white/15 text-[12px] font-semibold tracking-[0.08em] text-white/85 mb-6">
              <span className="h-2 w-2 rounded-[6px] bg-[#0c48d8]" />
              <span>{heroEyebrow}</span>
            </div>

            <h1 className="mb-3">
              <span className="vnext-hero-title-light block">{heroTitleLight}</span>
              <span className="vnext-hero-title-bold text-white block mt-1">{heroTitleBold}</span>
            </h1>

            <p className="mt-4 mb-9 text-[16.5px] sm:text-[18px] font-light text-white/80 leading-[1.65] max-w-xl">
              {t.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <ContactButton className="group h-12 px-6 rounded-[6px] bg-[#0c48d8] text-white text-[15px] font-medium inline-flex items-center gap-2.5 hover:bg-[#0835a6] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer">
                <span>{t.ctaPrimary}</span>
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
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </ContactButton>

              <Link
                href={`/${lang}/solutions`}
                className="group h-12 px-6 rounded-[6px] bg-white/12 border border-white/15 text-white text-[15px] font-medium inline-flex items-center gap-2.5 hover:bg-white/20 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                <span>{t.ctaSecondary}</span>
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
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            {/* Executive Trust Metrics Row */}
            <div className="mt-11 pt-7 border-t border-white/12 grid grid-cols-4 gap-4 max-w-lg">
              {t.stats.map((st) => (
                <div key={st.label}>
                  <div className="font-headline text-[22px] sm:text-[26px] font-bold text-white tabular-nums leading-none">
                    {st.value}
                  </div>
                  <div className="text-[12px] text-white/60 mt-1.5 leading-snug">{st.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Framed Hero Image & Interactive Service Showcase Card (100% People-Free) */}
          <div className="lg:col-span-6">
            {/* Top Toolbar: Switch between 3 Curated People-Free Hero Image Packs + Prev/Next Slide */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-1 p-1 rounded-[6px] bg-white/[0.06] border border-white/12">
                {IMAGE_PACKS.map((pack, pIdx) => {
                  const isCurrentPack = pIdx === packIndex;
                  const packLabel =
                    lang === "vi" ? pack.labelVi : lang === "ja" ? pack.labelJa : pack.labelEn;
                  return (
                    <button
                      key={pack.id}
                      type="button"
                      onClick={() => setPackIndex(pIdx)}
                      className={`px-2.5 py-1 rounded-[6px] text-[12px] font-medium transition-all duration-300 cursor-pointer ${
                        isCurrentPack
                          ? "bg-[#0c48d8] text-white"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      0{pIdx + 1} · {packLabel}
                    </button>
                  );
                })}
              </div>

              <div className="inline-flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
                  }
                  aria-label="Previous slide"
                  className="h-8 w-8 rounded-[6px] bg-white/[0.06] border border-white/12 flex items-center justify-center text-white/75 hover:bg-[#0c48d8] hover:border-[#0c48d8] hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                      d="M8.5 3.5L5 7L8.5 10.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex((prev) => (prev + 1) % slides.length)}
                  aria-label="Next slide"
                  className="h-8 w-8 rounded-[6px] bg-white/[0.06] border border-white/12 flex items-center justify-center text-white/75 hover:bg-[#0c48d8] hover:border-[#0c48d8] hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                      d="M5.5 3.5L9 7L5.5 10.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="rounded-[12px] overflow-hidden border border-white/15 bg-[#111522] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)]">
              {/* Top Image Stage with Stacked Crossfade */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0b0d14]">
                {slides.map((s, idx) => {
                  const isCurrent = idx === activeIndex;
                  const imgUrl = currentPack.slides[idx % currentPack.slides.length];
                  return (
                    <img
                      key={`hero-card-img-${currentPack.id}-${s.code}`}
                      src={imgUrl}
                      alt={s.title}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isCurrent
                          ? "opacity-92 scale-100"
                          : "opacity-0 scale-[1.04] pointer-events-none"
                      }`}
                    />
                  );
                })}
                <div className="absolute inset-0 bg-[#0b0d14]/20 pointer-events-none" />

                {/* Top Overlay Bar: Category Code + Slide Indicators */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3">
                  <span className="px-3 py-1.5 rounded-[6px] bg-[#0b0d14]/90 border border-white/15 text-[11.5px] font-semibold tracking-[0.06em] text-white">
                    {slides[activeIndex].code}
                  </span>

                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[6px] bg-[#0b0d14]/85 border border-white/15">
                    {slides.map((s, idx) => (
                      <button
                        key={`dot-${s.code}`}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        aria-label={s.label}
                        className={`h-1.5 rounded-[6px] transition-all duration-300 cursor-pointer ${
                          idx === activeIndex
                            ? "w-6 bg-[#0c48d8]"
                            : "w-1.5 bg-white/35 hover:bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom-Right Metric Badge */}
                <div className="absolute bottom-4 right-4 rounded-[6px] bg-[#0b0d14]/92 border border-white/15 px-4 py-2 flex items-baseline gap-2.5">
                  <span className="font-headline text-[22px] font-bold text-white tabular-nums">
                    {slides[activeIndex].metricVal}
                  </span>
                  <span className="text-[12px] text-white/75">{slides[activeIndex].metricLabel}</span>
                </div>
              </div>

              {/* Bottom Stacked Content Panel — Zero Layout Jump */}
              <div className="grid grid-cols-1 border-t border-white/12 bg-[#0e121d]">
                {slides.map((s, idx) => {
                  const isCurrent = idx === activeIndex;
                  return (
                    <Link
                      key={`hero-card-panel-${s.code}`}
                      href={s.href}
                      tabIndex={isCurrent ? 0 : -1}
                      aria-hidden={!isCurrent}
                      className={`col-start-1 row-start-1 group p-6 sm:p-7 flex flex-col justify-between gap-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isCurrent
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 translate-y-1.5 pointer-events-none"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="font-headline text-[18px] sm:text-[20px] font-semibold text-white group-hover:text-[#4d8dff] transition-colors duration-300 leading-snug">
                            {s.title}
                          </h2>
                          <p className="mt-1.5 text-[14px] text-white/65 font-light leading-relaxed">
                            {s.desc}
                          </p>
                        </div>

                        <span className="shrink-0 w-9 h-9 rounded-[6px] border border-white/15 flex items-center justify-center text-white/70 group-hover:border-[#0c48d8] group-hover:bg-[#0c48d8] group-hover:text-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
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
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {s.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-[12px] font-medium rounded-[6px] bg-white/[0.06] border border-white/12 text-white/85"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 5-Service Interactive Strip (Synced with Hero Showcase) */}
      <div className="relative z-10 border-t border-white/12 bg-[#0b0d14]/95">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {slides.map((item, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <Link
                key={item.label}
                href={item.href}
                onMouseEnter={() => handleTabHover(idx)}
                onMouseLeave={handleTabLeave}
                className={`group relative h-[64px] lg:h-[78px] px-5 flex items-center justify-center text-center text-[14.5px] lg:text-[15.5px] font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isSelected
                    ? "text-white bg-white/[0.06]"
                    : "text-white/60 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <span
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-[#0c48d8] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${
                    isSelected ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
