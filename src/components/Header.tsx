"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import { useContact } from "./ContactModal";

const LOCALES: { code: Locale; label: string }[] = [
  { code: "vi", label: "VI" },
  { code: "en", label: "EN" },
  { code: "ja", label: "JA" },
];

export default function Header({ nav, lang }: { nav: Dictionary["nav"]; lang: Locale }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<"solutions" | "industries" | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const { open: openContact } = useContact();

  const openMenu = (menu: "solutions" | "industries" | null) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setHoveredMenu(menu);
  };

  const scheduleCloseMenu = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 130);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const rest = pathname.replace(/^\/(vi|en|ja)(?=\/|$)/, "");
  const localeHref = (code: Locale) => `/${code}${rest}`;

  const navLinks = [
    { key: "solutions" as const, label: nav.products, href: `/${lang}/solutions`, hasMega: true },
    { key: "industries" as const, label: nav.solutions, href: `/${lang}/industries`, hasMega: true },
    { key: "process" as const, label: nav.features, href: `/${lang}/process`, hasMega: false },
    { key: "cases" as const, label: nav.cases, href: `/${lang}/cases`, hasMega: false },
    { key: "about" as const, label: nav.about, href: `/${lang}/about`, hasMega: false },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const solidHeader = isScrolled || mobileMenuOpen || hoveredMenu !== null;

  const megaSolutionsByLocale = {
    vi: {
      softwareTitle: "DỊCH VỤ CỐT LÕI",
      softwareItems: [
        { name: "Phát triển phần mềm", desc: "Phát triển ứng dụng Web, Mobile và hệ thống quản trị", href: `/${lang}/solutions#core-software` },
        { name: "Giải pháp Doanh nghiệp & Tự động hóa", desc: "ERP, CRM, OMS, WMS và tự động hóa quy trình RPA", href: `/${lang}/solutions#core-software` },
        { name: "Điện toán đám mây & DevOps", desc: "Tư vấn kiến trúc Cloud, chuyển đổi hạ tầng & CI/CD", href: `/${lang}/solutions#core-software` },
        { name: "Hiện đại hóa hệ thống", desc: "Nâng cấp kiến trúc phần mềm và chuyển đổi dữ liệu", href: `/${lang}/solutions#core-software` },
      ],
      aiTitle: "NĂNG LỰC CÔNG NGHỆ",
      aiItems: [
        { name: "AI & Học máy", desc: "Ứng dụng AI/GenAI tự động hóa quy trình nghiệp vụ", href: `/${lang}/solutions#ai-native` },
        { name: "AI ngôn ngữ & Hội thoại", desc: "Xử lý ngôn ngữ tự nhiên và hệ thống tư vấn đa kênh", href: `/${lang}/solutions#ai-native` },
        { name: "Thị giác máy tính & OCR", desc: "Nhận diện hình ảnh và số hóa chứng từ tự động", href: `/${lang}/solutions#ai-native` },
        { name: "Dữ liệu & Phân tích chuyên sâu", desc: "Kho dữ liệu tập trung và báo cáo quản trị BI", href: `/${lang}/solutions#ai-native` },
      ],
    },
    en: {
      softwareTitle: "CORE SERVICES",
      softwareItems: [
        { name: "Software Development", desc: "Enterprise web, mobile, and custom software systems", href: `/${lang}/solutions#core-software` },
        { name: "Enterprise Solutions & Automation", desc: "ERP, CRM, OMS, WMS, and RPA workflow automation", href: `/${lang}/solutions#core-software` },
        { name: "Cloud & DevOps", desc: "Cloud architecture, migration, and CI/CD automation", href: `/${lang}/solutions#core-software` },
        { name: "System Modernization", desc: "Legacy system re-architecture and data migration", href: `/${lang}/solutions#core-software` },
      ],
      aiTitle: "TECHNOLOGY CAPABILITIES",
      aiItems: [
        { name: "AI & Machine Learning", desc: "Applied AI/GenAI for business process transformation", href: `/${lang}/solutions#ai-native` },
        { name: "Conversational AI & NLP", desc: "Natural language processing and enterprise chatbots", href: `/${lang}/solutions#ai-native` },
        { name: "Computer Vision & OCR", desc: "Image recognition and automated document extraction", href: `/${lang}/solutions#ai-native` },
        { name: "Data & Advanced Analytics", desc: "Data warehousing and executive BI dashboards", href: `/${lang}/solutions#ai-native` },
      ],
    },
    ja: {
      softwareTitle: "コアサービス",
      softwareItems: [
        { name: "ソフトウェア開発", desc: "業務向けWeb・モバイル・基幹システムの設計・開発", href: `/${lang}/solutions#core-software` },
        { name: "業務システム・自動化", desc: "ERP・CRM・OMS・WMS導入およびRPA業務自動化", href: `/${lang}/solutions#core-software` },
        { name: "クラウド・DevOps", desc: "クラウド設計・移行およびCI/CDパイプライン自動化", href: `/${lang}/solutions#core-software` },
        { name: "システムモダナイゼーション", desc: "レガシーシステム刷新・安全なデータ移行", href: `/${lang}/solutions#core-software` },
      ],
      aiTitle: "テクノロジー領域",
      aiItems: [
        { name: "AI・機械学習", desc: "AI・生成AIによる業務プロセスの自動化と高度化", href: `/${lang}/solutions#ai-native` },
        { name: "対話型AI・自然言語処理", desc: "顧客対応および社内ナレッジ検索の自動化", href: `/${lang}/solutions#ai-native` },
        { name: "コンピュータビジョン・AI-OCR", desc: "画像認識および帳票・請求書の自動データ化", href: `/${lang}/solutions#ai-native` },
        { name: "データ基盤・高度分析（BI）", desc: "データウェアハウス構築と経営ダッシュボード可視化", href: `/${lang}/solutions#ai-native` },
      ],
    },
  };

  const megaIndustriesByLocale = {
    vi: [
      { id: "manufacturing", name: "Sản xuất", sub: "MES · Định mức BOM · Kho vận WMS" },
      { id: "retail", name: "Bán lẻ & Thương mại điện tử", sub: "OMS · POS & TMĐT · CRM" },
      { id: "beauty", name: "Chăm sóc sức khỏe", sub: "Đặt lịch hẹn · Hồ sơ dịch vụ · CSKH" },
      { id: "distribution", name: "Logistics & Phân phối", sub: "Cổng B2B · Kho FEFO · Điều phối TMS" },
      { id: "services", name: "Dịch vụ Chuyên nghiệp", sub: "Quản trị dự án · Hợp đồng · Báo cáo P&L" },
      { id: "education", name: "Giáo dục", sub: "CRM Tuyển sinh · Quản lý đào tạo · Học phí" },
    ],
    en: [
      { id: "manufacturing", name: "Manufacturing", sub: "MES · BOM Management · WMS" },
      { id: "retail", name: "Retail & E-Commerce", sub: "OMS · POS & Marketplaces · CRM" },
      { id: "beauty", name: "Healthcare", sub: "Scheduling · Service Records · Care" },
      { id: "distribution", name: "Logistics & Distribution", sub: "B2B Portal · FEFO WMS · TMS" },
      { id: "services", name: "Professional Services", sub: "Project Management · Contracts · P&L" },
      { id: "education", name: "Education", sub: "Admissions CRM · LMS/SIS · Billing" },
    ],
    ja: [
      { id: "manufacturing", name: "製造業", sub: "製造実行 MES · 部品表 BOM · 倉庫管理 WMS" },
      { id: "retail", name: "小売・EC", sub: "統合受注 OMS · POS/EC連携 · 顧客管理 CRM" },
      { id: "beauty", name: "ヘルスケア", sub: "予約管理 · カルテ・記録管理 · 顧客フォロー" },
      { id: "distribution", name: "物流・流通（卸売）", sub: "B2B受発注 · FEFO倉庫管理 · 輸配送 TMS" },
      { id: "services", name: "プロフェッショナルサービス", sub: "案件管理 · 契約・検収 · 案件別損益 P&L" },
      { id: "education", name: "教育・研修", sub: "受講生募集 CRM · 教務管理 LMS/SIS · 請求" },
    ],
  };

  const megaSolutions = megaSolutionsByLocale[lang];
  const megaIndustries = megaIndustriesByLocale[lang];
  const callbackLabel =
    lang === "vi" ? "Yêu cầu gọi lại" : lang === "ja" ? "折り返し連絡を希望" : "Request Call";

  return (
    <header
      onMouseLeave={scheduleCloseMenu}
      onMouseEnter={() => {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
      }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        solidHeader
          ? "h-[70px] bg-white border-b border-neutral-200 text-[#1a1a1a] shadow-[0_4px_20px_-12px_rgba(15,23,42,0.08)]"
          : "h-[76px] bg-[#0b0d14] border-b border-white/10 text-white"
      }`}
    >
      <div className="flex justify-between items-center h-full px-5 md:px-10 max-w-[1400px] mx-auto">
        <Link
          href={`/${lang}`}
          onClick={(e) => {
            setMobileMenuOpen(false);
            setHoveredMenu(null);
            if (pathname === `/${lang}` || pathname === `/${lang}/` || pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-2 cursor-pointer"
          aria-label={nav.home}
        >
          <Image
            src="/dxs-mark.svg"
            alt=""
            width={34}
            height={34}
            priority
            className="h-8 w-8"
          />
          <span
            className={`font-brand text-[23px] font-extrabold tracking-[0.04em] uppercase leading-none transition-colors duration-300 ${
              solidHeader ? "text-[#111625]" : "text-white"
            }`}
          >
            DXS
          </span>
        </Link>

        <nav className="hidden lg:flex items-center h-full gap-9">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const isMenuOpen = hoveredMenu === link.key;
            return (
              <div
                key={link.href}
                onMouseEnter={() =>
                  openMenu(
                    link.key === "solutions" || link.key === "industries" ? link.key : null
                  )
                }
                className="h-full flex items-center"
              >
                <Link
                  href={link.href}
                  onClick={() => setHoveredMenu(null)}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-2 text-[15px] font-medium transition-colors duration-300 flex items-center gap-1.5 ${
                    solidHeader
                      ? active || isMenuOpen
                        ? "text-[#0c48d8] font-semibold"
                        : "text-neutral-700 hover:text-[#0c48d8]"
                      : active || isMenuOpen
                        ? "text-white font-semibold"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.hasMega && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 12 12"
                      fill="none"
                      className={`transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isMenuOpen ? "rotate-180 text-[#0c48d8]" : "opacity-60"
                      }`}
                      aria-hidden="true"
                    >
                      <path
                        d="M2.5 4.5L6 8L9.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] origin-left ${
                      solidHeader ? "bg-[#0c48d8]" : "bg-white"
                    } ${active || isMenuOpen ? "scale-x-100" : "scale-x-0"}`}
                  />
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-1 text-[13px] font-medium"
            role="group"
            aria-label={nav.switchLanguage}
          >
            {LOCALES.map(({ code, label }, i) => (
              <span key={code} className="flex items-center">
                {i > 0 && (
                  <span className={`mx-1 ${solidHeader ? "text-neutral-300" : "text-white/25"}`}>
                    /
                  </span>
                )}
                <Link
                  href={localeHref(code)}
                  aria-current={code === lang ? "true" : undefined}
                  className={`px-1 py-0.5 transition-colors duration-200 ${
                    code === lang
                      ? solidHeader
                        ? "text-[#0c48d8] font-semibold"
                        : "text-white font-semibold"
                      : solidHeader
                        ? "text-neutral-400 hover:text-neutral-800"
                        : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {label}
                </Link>
              </span>
            ))}
          </div>

          <Link
            href={`/${lang}/contact`}
            onClick={() => setHoveredMenu(null)}
            className="hidden sm:inline-flex group h-10 px-5 rounded-[6px] bg-[#0c48d8] text-white text-[14px] font-medium hover:bg-[#0835a6] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] items-center gap-2"
          >
            <span>{nav.contact}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
            className={`lg:hidden p-2 rounded-[6px] ${solidHeader ? "text-neutral-900" : "text-white"}`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="15" x2="21" y2="15" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Mega-Menu: Services (Smooth fade & slide) */}
      <div
        className={`hidden lg:block absolute left-0 right-0 top-full w-full bg-white border-b border-neutral-200 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.14)] text-[#1a1a1a] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          hoveredMenu === "solutions"
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1.5 pointer-events-none"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-10 py-9 grid grid-cols-12 gap-10">
          <div className="col-span-6 border-r border-neutral-200 pr-8">
            <div className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#0c48d8] mb-4">
              {megaSolutions.softwareTitle}
            </div>
            <div className="flex flex-col divide-y divide-neutral-100">
              {megaSolutions.softwareItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setHoveredMenu(null)}
                  className="group py-3.5 flex items-center justify-between gap-4 hover:bg-neutral-50 px-3.5 -mx-3.5 rounded-[6px] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  <div>
                    <div className="font-headline text-[15px] font-semibold text-[#1a1a1a] group-hover:text-[#0c48d8] transition-colors duration-300">
                      {item.name}
                    </div>
                    <div className="text-[13px] text-neutral-500 mt-0.5">{item.desc}</div>
                  </div>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="shrink-0 text-neutral-300 group-hover:text-[#0c48d8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
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
              ))}
            </div>
          </div>

          <div className="col-span-6">
            <div className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#0c48d8] mb-4">
              {megaSolutions.aiTitle}
            </div>
            <div className="flex flex-col divide-y divide-neutral-100">
              {megaSolutions.aiItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setHoveredMenu(null)}
                  className="group py-3.5 flex items-center justify-between gap-4 hover:bg-neutral-50 px-3.5 -mx-3.5 rounded-[6px] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  <div>
                    <div className="font-headline text-[15px] font-semibold text-[#1a1a1a] group-hover:text-[#0c48d8] transition-colors duration-300">
                      {item.name}
                    </div>
                    <div className="text-[13px] text-neutral-500 mt-0.5">{item.desc}</div>
                  </div>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="shrink-0 text-neutral-300 group-hover:text-[#0c48d8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
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
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Mega-Menu: Industries (Smooth fade & slide) */}
      <div
        className={`hidden lg:block absolute left-0 right-0 top-full w-full bg-white border-b border-neutral-200 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.14)] text-[#1a1a1a] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          hoveredMenu === "industries"
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1.5 pointer-events-none"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-10 py-8">
          <div className="grid grid-cols-3 rounded-[12px] overflow-hidden border-t border-l border-neutral-200">
            {megaIndustries.map((ind) => (
              <Link
                key={ind.id}
                href={`/${lang}/industries#${ind.id}`}
                onClick={() => setHoveredMenu(null)}
                className="group p-5 border-r border-b border-neutral-200 hover:bg-neutral-50 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-between gap-4"
              >
                <div>
                  <div className="font-headline text-[16px] font-semibold text-[#1a1a1a] group-hover:text-[#0c48d8] transition-colors duration-300">
                    {ind.name}
                  </div>
                  <div className="text-[13px] text-neutral-500 mt-1">{ind.sub}</div>
                </div>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="shrink-0 text-neutral-300 group-hover:text-[#0c48d8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
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
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Navigation (Smooth CSS Grid height transition) */}
      <div
        className={`lg:hidden grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] bg-white text-[#1a1a1a] ${
          mobileMenuOpen
            ? "grid-rows-[1fr] opacity-100 border-b border-neutral-200 shadow-lg pointer-events-auto"
            : "grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 py-6 flex flex-col gap-4">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2.5 text-[16px] font-headline border-b border-neutral-100 flex items-center justify-between transition-colors duration-200 ${
                    active ? "text-[#0c48d8] font-semibold" : "text-[#1a1a1a] font-medium"
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <div className="pt-2 flex gap-3">
              <Link
                href={`/${lang}/contact`}
                tabIndex={mobileMenuOpen ? 0 : -1}
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-3 rounded-[6px] bg-[#0c48d8] text-white text-center text-[14.5px] font-medium"
              >
                {nav.contact}
              </Link>
              <button
                type="button"
                tabIndex={mobileMenuOpen ? 0 : -1}
                onClick={() => {
                  setMobileMenuOpen(false);
                  openContact();
                }}
                className="px-4 py-3 rounded-[6px] border border-neutral-300 text-[#1a1a1a] text-[14px] font-medium cursor-pointer"
              >
                {callbackLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
