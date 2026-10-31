import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/i18n/dictionaries";
import ContactButton from "@/components/ContactButton";
import CTA from "@/components/CTA";

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  const softwareSuites = dict.products.items;
  const aiEngines = dict.products.aiItems;
  const ecosystemGroups = dict.partners.groups;

  const archLayersByLocale: Record<
    Locale,
    { layer: string; desc: string; nodes: string[] }[]
  > = {
    vi: [
      {
        layer: "TẦNG 03 · ỨNG DỤNG & CỔNG THÔNG TIN NGƯỜI DÙNG",
        desc: "Thiết kế giao diện Web App và Mobile App trực quan theo từng vai trò nhân sự, tối ưu hóa trải nghiệm và tốc độ thao tác nghiệp vụ.",
        nodes: [
          "Hệ thống Báo cáo Quản trị (BI)",
          "Ứng dụng Nghiệp vụ Phòng ban",
          "Ứng dụng Di động hiện trường",
          "Cổng Khách hàng & Đối tác B2B",
        ],
      },
      {
        layer: "TẦNG 02 · HỆ THỐNG PHẦN MỀM DOANH NGHIỆP & NĂNG LỰC AI",
        desc: "Kết hợp các hệ thống quản trị cốt lõi (ERP, CRM, OMS, WMS) với các mô hình AI và công cụ tự động hóa quy trình nghiệp vụ (RPA).",
        nodes: [
          "Quản trị Đơn hàng & Kho (OMS/WMS)",
          "Quản trị Quy trình & Dự án (BPM)",
          "Quản trị Khách hàng (CRM)",
          "AI, Học máy & OCR tự động hóa",
        ],
      },
      {
        layer: "TẦNG 01 · HẠ TẦNG ĐÁM MÂY & TÍCH HỢP DỮ LIỆU",
        desc: "Liên thông dữ liệu hai chiều an toàn, ổn định với các hệ thống kế toán, POS, vận chuyển và nền tảng thương mại sẵn có của doanh nghiệp.",
        nodes: [
          "Hệ thống POS & Sàn TMĐT",
          "Phần mềm Kế toán & Tài chính",
          "Hệ thống Logistics & Giao nhận",
          "Hạ tầng Cloud & Bảo mật dữ liệu",
        ],
      },
    ],
    en: [
      {
        layer: "LAYER 03 · USER APPLICATIONS & PORTALS",
        desc: "Role-based web and mobile applications engineered for operational clarity, speed, and high user adoption across departments.",
        nodes: [
          "Executive BI Dashboards",
          "Departmental Web Applications",
          "Field Operations Mobile Apps",
          "B2B Partner & Client Portals",
        ],
      },
      {
        layer: "LAYER 02 · ENTERPRISE SYSTEMS & AI CAPABILITIES",
        desc: "Core enterprise platforms (ERP, CRM, OMS, WMS) integrated with machine learning models and robotic process automation (RPA).",
        nodes: [
          "Order & Warehouse (OMS/WMS)",
          "Process & Project Management",
          "Customer Management (CRM)",
          "Applied AI, ML & OCR",
        ],
      },
      {
        layer: "LAYER 01 · CLOUD INFRASTRUCTURE & SYSTEM INTEGRATION",
        desc: "Secure, reliable bidirectional data integration across existing POS, accounting, logistics, and cloud infrastructure.",
        nodes: [
          "POS & E-Commerce Platforms",
          "Accounting & ERP Systems",
          "Logistics & Courier APIs",
          "Cloud Infrastructure & Security",
        ],
      },
    ],
    ja: [
      {
        layer: "レイヤー 03 · ユーザーアプリケーション・ポータル",
        desc: "部門や役割ごとに最適化されたWebアプリ・モバイルアプリにより、直感的な操作性と業務スピードを実現します。",
        nodes: [
          "経営・BIダッシュボード",
          "部門別業務Webアプリ",
          "現場・フィールド用モバイルアプリ",
          "B2B取引先・顧客ポータル",
        ],
      },
      {
        layer: "レイヤー 02 · 業務基幹システム・AIケイパビリティ",
        desc: "基幹システム（ERP・CRM・OMS・WMS）と、AI・機械学習および業務自動化（RPA）を統合した中核レイヤーです。",
        nodes: [
          "受注・倉庫管理 (OMS/WMS)",
          "業務フロー・案件管理 (BPM)",
          "顧客関係管理 (CRM)",
          "AI・機械学習・AI-OCR自動化",
        ],
      },
      {
        layer: "レイヤー 01 · クラウド基盤・外部システムデータ連携",
        desc: "既存の会計ソフト、POS、ECモール、物流システムと安全かつ安定した双方向API連携を実現します。",
        nodes: [
          "POS・ECプラットフォーム連携",
          "会計・財務システム連携",
          "物流・配送キャリアAPI連携",
          "クラウドインフラ・情報セキュリティ",
        ],
      },
    ],
  };

  const archLayers = archLayersByLocale[lang];
  const copy = {
    vi: {
      bannerTitle: "Dịch vụ & Năng lực Công nghệ",
      bannerSub: "Giải pháp thúc đẩy chuyển đổi số doanh nghiệp",
      ecosystemTab: "Tích hợp hệ thống",
      home: "Trang chủ",
      coreDesc:
        "Cung cấp dịch vụ phát triển phần mềm, triển khai hệ thống quản trị doanh nghiệp (ERP, CRM, OMS, WMS), hạ tầng đám mây và hiện đại hóa hệ thống thông tin.",
      deliverablesLabel: "NỘI DUNG TRIỂN KHAI",
      consultBtn: "Nhận tư vấn dịch vụ",
      aiDesc:
        "Ứng dụng trí tuệ nhân tạo (AI), học máy (Machine Learning), thị giác máy tính và phân tích dữ liệu chuyên sâu vào quy trình vận hành thực tế của doanh nghiệp.",
    },
    en: {
      bannerTitle: "Services & Technology Capabilities",
      bannerSub: "Solutions accelerating enterprise digital transformation",
      ecosystemTab: "System Integration",
      home: "Home",
      coreDesc:
        "Delivering custom software development, enterprise management systems (ERP, CRM, OMS, WMS), cloud infrastructure, and legacy system modernization.",
      deliverablesLabel: "KEY DELIVERABLES",
      consultBtn: "Consult this service",
      aiDesc:
        "Applying artificial intelligence, machine learning, computer vision, and advanced data analytics directly into enterprise workflows.",
    },
    ja: {
      bannerTitle: "サービス・技術ケイパビリティ",
      bannerSub: "企業のDXを推進するソリューション",
      ecosystemTab: "システム連携",
      home: "ホーム",
      coreDesc:
        "業務システム開発、基幹システム（ERP・CRM・OMS・WMS）導入、クラウド基盤構築、およびレガシーシステムのモダナイゼーションをワンストップで提供します。",
      deliverablesLabel: "主な提供内容",
      consultBtn: "このサービスについて相談する",
      aiDesc:
        "AI（人工知能）、機械学習、コンピュータビジョン、高度データ分析を実務プロセスに組み込み、業務の自動化と意思決定の高度化を実現します。",
    },
  }[lang];

  return (
    <>
      {/* Subpage Banner — Solid dark background, no gradient */}
      <section className="relative min-h-[380px] bg-[#0d0a10] text-white pt-32 pb-16 lg:pt-36 lg:pb-20 border-b border-white/10 flex flex-col justify-between">
        <div className="max-w-[1400px] w-full mx-auto px-5 md:px-10 my-auto">
          <div className="max-w-3xl">
            <h1 className="font-headline text-[34px] sm:text-[44px] lg:text-[48px] font-semibold leading-[1.2] text-white">
              {copy.bannerTitle}
            </h1>
            <p className="mt-3 text-[20px] sm:text-[22px] font-bold text-white/85">
              {copy.bannerSub}
            </p>
            <p className="mt-3 text-[16px] font-light text-white/75 leading-[1.7] max-w-2xl">
              {dict.products.subtitle}
            </p>
          </div>
        </div>

        <div className="max-w-[1400px] w-full mx-auto px-5 md:px-10 pt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2.5">
            <a
              href="#core-software"
              className="px-3.5 py-1.5 text-[13px] font-medium rounded-[6px] border border-white/15 text-white/80 hover:border-white hover:text-white transition-colors"
            >
              {dict.products.tabSoftware}
            </a>
            <a
              href="#ai-native"
              className="px-3.5 py-1.5 text-[13px] font-medium rounded-[6px] border border-white/15 text-white/80 hover:border-white hover:text-white transition-colors"
            >
              {dict.products.tabAi}
            </a>
            <a
              href="#ecosystem"
              className="px-3.5 py-1.5 text-[13px] font-medium rounded-[6px] border border-white/15 text-white/80 hover:border-white hover:text-white transition-colors"
            >
              {copy.ecosystemTab}
            </a>
          </div>

          <div className="flex items-center gap-2 text-[14px] font-light text-white/60">
            <Link href={`/${lang}`} className="hover:text-white transition-colors">
              {copy.home}
            </Link>
            <span>/</span>
            <span className="font-semibold text-white">{dict.nav.products}</span>
          </div>
        </div>
      </section>

      {/* Section 00: 3-Layer System Architecture */}
      <section id="architecture" className="py-20 lg:py-24 bg-[#f6f7f9] border-b border-neutral-200 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mb-12">
            <h2 className="vnext-h2">
              {lang === "vi" ? (
                <>
                  Kiến trúc <span className="font-bold text-[#0c48d8]">giải pháp tổng thể</span>
                </>
              ) : lang === "ja" ? (
                <>
                  エンタープライズ <span className="font-bold text-[#0c48d8]">ソリューション構成</span>
                </>
              ) : (
                <>
                  Enterprise <span className="font-bold text-[#0c48d8]">solution architecture</span>
                </>
              )}
            </h2>
          </div>

          <div className="rounded-[12px] overflow-hidden border border-neutral-300 bg-white divide-y divide-neutral-300">
            {archLayers.map((l) => (
              <div
                key={l.layer}
                className="p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5">
                  <span className="text-[12.5px] font-bold uppercase tracking-[0.08em] text-[#0c48d8]">
                    {l.layer}
                  </span>
                  <p className="text-[14.5px] text-neutral-600 mt-2 leading-relaxed">
                    {l.desc}
                  </p>
                </div>
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {l.nodes.map((node) => (
                    <div
                      key={node}
                      className="p-4 rounded-[6px] bg-[#f6f7f9] border border-neutral-200 font-headline text-[13.5px] font-semibold text-[#1a1a1a] flex items-center"
                    >
                      {node}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part 1: Core Services */}
      <section id="core-software" className="py-20 lg:py-28 bg-white border-b border-neutral-200 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-4">
              <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0c48d8]">
                01 / {dict.products.tabSoftware}
              </span>
              <h2 className="vnext-h2 mt-2">
                {dict.products.tabSoftware}
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-[16px] text-neutral-600 leading-relaxed max-w-2xl">
                {copy.coreDesc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {softwareSuites.map((item, idx) => (
              <article
                key={item.name}
                className="p-8 sm:p-10 rounded-[12px] border border-neutral-200 bg-white flex flex-col justify-between gap-8"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span className="text-[14px] font-semibold text-[#0c48d8] tabular-nums">
                      01.{idx + 1}
                    </span>
                    <span className="px-3 py-1 text-[12px] rounded-[6px] bg-neutral-100 border border-neutral-200 text-neutral-700">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-headline text-[22px] sm:text-[26px] font-semibold text-[#1a1a1a] mb-3">
                    {item.name}
                  </h3>

                  <p className="text-[15px] text-neutral-600 leading-relaxed mb-7">
                    {item.description}
                  </p>

                  <div className="border-t border-neutral-200 pt-5">
                    <span className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-400 mb-3">
                      {copy.deliverablesLabel}
                    </span>
                    <ul className="flex flex-col gap-2.5">
                      {item.highlights.map((pt) => (
                        <li
                          key={pt}
                          className="flex items-baseline gap-3 text-[14.5px] text-neutral-800"
                        >
                          <span className="text-[#0c48d8]">—</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2">
                  <ContactButton className="group inline-flex items-center gap-2 text-[14px] font-semibold text-[#0c48d8] hover:text-[#0835a6] transition-colors cursor-pointer">
                    <span>{copy.consultBtn}</span>
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path
                        d="M1.5 12.5L12.5 1.5M12.5 1.5H3.5M12.5 1.5V10.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </ContactButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Part 2: Technology Capabilities */}
      <section id="ai-native" className="py-20 lg:py-28 bg-[#0b0d14] text-white scroll-mt-20">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-4">
              <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white/60">
                02 / {dict.products.tabAi}
              </span>
              <h2 className="vnext-h2-dark mt-2">
                {dict.products.tabAi}
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-[16px] text-white/70 font-light leading-relaxed max-w-2xl">
                {copy.aiDesc}
              </p>
            </div>
          </div>

          <div className="border-t border-white/15 divide-y divide-white/15">
            {aiEngines.map((engine, idx) => (
              <div
                key={engine.name}
                className="py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-4">
                  <span className="text-[13px] text-white/50 tabular-nums">02.{idx + 1}</span>
                  <h3 className="font-headline text-[22px] sm:text-[24px] font-semibold text-white mt-1">
                    {engine.name}
                  </h3>
                  <span className="inline-block mt-2 px-3 py-1 text-[12px] rounded-[6px] border border-white/15 text-white/70">
                    {engine.tag}
                  </span>
                </div>

                <div className="lg:col-span-4">
                  <p className="text-[15px] text-white/75 font-light leading-relaxed">
                    {engine.description}
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-2.5">
                  {engine.highlights.map((h) => (
                    <div
                      key={h}
                      className="p-3.5 rounded-[6px] bg-white/[0.04] border border-white/10 text-[13.5px] text-white/85"
                    >
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part 3: System Integration Ecosystem */}
      <section id="ecosystem" className="py-20 lg:py-28 bg-white scroll-mt-20">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mb-14">
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0c48d8]">
              03 / {dict.partners.eyebrow}
            </span>
            <h2 className="vnext-h2 mt-2">
              {dict.partners.title}
            </h2>
            <p className="mt-4 text-[16px] text-neutral-600 leading-relaxed">
              {dict.partners.label}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecosystemGroups.map((group, idx) => (
              <div
                key={group.category}
                className="p-7 sm:p-8 rounded-[12px] border border-neutral-200 bg-white flex flex-col justify-between"
              >
                <div>
                  <span className="text-[12px] text-neutral-400 tabular-nums">0{idx + 1}</span>
                  <h3 className="font-headline text-[17px] font-semibold text-[#1a1a1a] mt-1 mb-5">
                    {group.category}
                  </h3>
                  <div className="flex flex-col divide-y divide-neutral-200 border-y border-neutral-200">
                    {group.items.map((partner) => (
                      <div
                        key={partner}
                        className="py-2.5 flex items-center justify-between text-[14px] font-medium text-neutral-700"
                      >
                        <span>{partner}</span>
                        <span className="text-[11.5px] text-neutral-400">API</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA dict={dict} />
    </>
  );
}
