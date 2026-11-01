import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/i18n/dictionaries";
import ContactButton from "@/components/ContactButton";
import CTA from "@/components/CTA";

const DOMAIN_IMAGES = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
];

const WORKFLOW_STEPS: Record<Locale, Record<string, string[]>> = {
  vi: {
    manufacturing: [
      "Tiếp nhận đơn đặt hàng và hoạch định định mức nguyên vật liệu (BOM)",
      "Kiểm tra tồn kho vật tư và lập lệnh sản xuất theo công đoạn",
      "Ghi nhận sản lượng, tiến độ và kiểm soát chất lượng tại xưởng",
      "Nhập kho thành phẩm và hạch toán giá thành sản xuất thực tế",
    ],
    retail: [
      "Thu thập đơn hàng từ hệ thống POS, sàn TMĐT và kênh trực tuyến",
      "Đồng bộ tồn kho đa điểm và điều phối kho xuất hàng tối ưu",
      "Kết nối tự động đơn vị vận chuyển và đối soát giao nhận",
      "Liên thông dữ liệu doanh thu, công nợ sang hệ thống kế toán",
    ],
    beauty: [
      "Tiếp nhận lịch hẹn trực tuyến và phân bổ lịch làm việc theo cơ sở",
      "Quản lý hồ sơ khách hàng, lịch sử sử dụng dịch vụ và thẻ liệu trình",
      "Tự động hóa gửi thông báo xác nhận và nhắc lịch hẹn",
      "Tổng hợp báo cáo doanh thu và hiệu suất nhân sự theo thời gian thực",
    ],
    distribution: [
      "Tiếp nhận đơn đặt hàng từ hệ thống đại lý và nhân viên thị trường",
      "Kiểm tra tự động chính sách giá, chiết khấu và hạn mức công nợ",
      "Quản lý xuất nhập kho theo tiêu chuẩn Lô và Hạn sử dụng (FEFO)",
      "Điều phối lộ trình giao nhận và đối chiếu công nợ tự động",
    ],
    services: [
      "Quản lý hồ sơ hợp đồng, phạm vi công việc và các mốc nghiệm thu",
      "Phân bổ nguồn lực nhân sự và theo dõi tiến độ thực hiện dự án",
      "Số hóa quy trình đề xuất, phê duyệt chi phí và chứng từ nội bộ",
      "Báo cáo hiệu quả tài chính (P&L) theo từng dự án và khách hàng",
    ],
    education: [
      "Quản lý thông tin tuyển sinh và quy trình tư vấn đa kênh",
      "Tổ chức xếp lớp, phân bổ lịch giảng dạy và quản lý phòng học",
      "Theo dõi chuyên cần, kết quả đào tạo và tương tác học viên",
      "Quản lý thu học phí và báo cáo vận hành trung tâm đào tạo",
    ],
  },
  en: {
    manufacturing: [
      "Sales order intake and multi-level Bill of Materials (BOM) planning",
      "Material availability check and shop-floor work order scheduling",
      "Real-time stage output tracking and quality inspection",
      "Finished goods receipt and actual batch cost accounting",
    ],
    retail: [
      "Order consolidation across retail POS, marketplaces, and web channels",
      "Real-time multi-branch inventory sync and order routing",
      "Automated logistics dispatch and COD reconciliation",
      "Two-way synchronization of revenue and inventory with ERP/accounting",
    ],
    beauty: [
      "Online appointment booking and multi-branch resource scheduling",
      "Centralized client profiles, service records, and package management",
      "Automated appointment confirmations and post-service care reminders",
      "Real-time branch revenue and staff performance reporting",
    ],
    distribution: [
      "B2B order capture from dealers and field sales representatives",
      "Automated tier pricing, promotion, and credit limit validation",
      "Warehouse picking and inventory control using FEFO batch rules",
      "Delivery route dispatch and automated receivables reconciliation",
    ],
    services: [
      "Contract scope, deliverables, and billing milestone initialization",
      "Resource allocation, task tracking, and SLA monitoring",
      "Digitized internal approval workflows and expense management",
      "Real-time project profit-and-loss (P&L) and utilization reporting",
    ],
    education: [
      "Omnichannel admissions lead capture and counseling workflow",
      "Automated class rostering, faculty scheduling, and room allocation",
      "Attendance tracking, academic grading, and student portal updates",
      "Automated tuition billing and multi-campus management reporting",
    ],
  },
  ja: {
    manufacturing: [
      "受注取り込みおよび部品表（BOM）に基づく所要量計算",
      "資材在庫の引き当てと製造工程別の作業指示書発行",
      "現場での生産実績・進捗のリアルタイム記録と品質検査",
      "完成品入庫処理およびロット別の実績原価算出",
    ],
    retail: [
      "実店舗POS・ECモール・自社ECからの受注データ自動集約",
      "多拠点在庫のリアルタイム同期と最適出荷拠点の自動判定",
      "配送キャリアシステムとの自動連携および代金引換・決済照合",
      "売上・売掛・在庫データの会計システム（ERP）への自動連携",
    ],
    beauty: [
      "オンライン予約受付および拠点・担当者別のスケジュール自動割り当て",
      "顧客カルテ、施術・サービス履歴、コース契約の一元管理",
      "予約確認およびアフターフォロー通知の自動配信",
      "拠点別の売上実績・スタッフ稼働率のリアルタイム集計",
    ],
    distribution: [
      "代理店ポータルおよび営業担当者からのB2B受注データ取り込み",
      "取引先別の価格テーブル、割引条件、与信限度額の自動チェック",
      "ロット・有効期限順（FEFO）に基づく倉庫ピッキング・出荷管理",
      "配送ルート最適化と納品・売掛金消込の自動化",
    ],
    services: [
      "契約情報、業務スコープ、検収・請求マイルストーンの登録",
      "プロジェクト別の要員アサインとタスク・工数実績の追跡",
      "社内稟議・経費精算・購買申請ワークフローのデジタル化",
      "プロジェクト別・顧客別のリアルタイム損益（P&L）可視化",
    ],
    education: [
      "マルチチャネルからの入学相談・見込み受講生データの一元管理",
      "クラス編成、講師スケジュール、教室割り当ての最適化",
      "出席状況、成績評価、および受講生・保護者ポータル連携",
      "受講料の請求・入金消込および拠点別運営レポートの自動作成",
    ],
  },
};

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.solutions;
  const workflowMap = WORKFLOW_STEPS[lang];

  const copy = {
    vi: {
      bannerTitle: "Giải pháp theo Ngành nghề",
      bannerSub: "Kiến tạo giá trị qua các giải pháp thông minh",
      home: "Trang chủ",
      workflowTitle: "QUY TRÌNH NGHIỆP VỤ SỐ HÓA",
    },
    en: {
      bannerTitle: "Solutions by Industry",
      bannerSub: "Creating value through intelligent solutions",
      home: "Home",
      workflowTitle: "DIGITAL OPERATIONAL WORKFLOW",
    },
    ja: {
      bannerTitle: "業界別ソリューション",
      bannerSub: "インテリジェントなソリューションで価値を創造する",
      home: "ホーム",
      workflowTitle: "デジタル化された標準業務フロー",
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
              {t.subtitle}
            </p>
          </div>
        </div>

        <div className="max-w-[1400px] w-full mx-auto px-5 md:px-10 pt-8 flex items-center justify-end gap-2 text-[14px] font-light text-white/60">
          <Link href={`/${lang}`} className="hover:text-white transition-colors">
            {copy.home}
          </Link>
          <span>/</span>
          <span className="font-semibold text-white">{dict.nav.solutions}</span>
        </div>
      </section>

      {/* Sticky Sub-Navigation Bar */}
      <div className="sticky top-[70px] z-40 bg-white border-b border-neutral-200 overflow-x-auto">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex items-center divide-x divide-neutral-200">
          {t.domains.map((d, i) => (
            <a
              key={d.id}
              href={`#${d.id}`}
              className="py-3.5 px-4 first:pl-0 text-[13px] font-medium text-neutral-600 hover:text-[#0c48d8] whitespace-nowrap transition-colors flex items-center gap-2"
            >
              <span className="text-[12px] text-[#0c48d8] font-bold tabular-nums">0{i + 1}</span>
              <span>{d.badge}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Full Breakdown of All 6 Industries */}
      <section className="bg-white divide-y divide-neutral-200">
        {t.domains.map((domain, index) => {
          const imgUrl = DOMAIN_IMAGES[index % DOMAIN_IMAGES.length];
          const steps = workflowMap[domain.id] ?? [];
          return (
            <article
              key={domain.id}
              id={domain.id}
              className="py-20 lg:py-24 scroll-mt-32"
            >
              <div className="max-w-[1400px] mx-auto px-5 md:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                  {/* Left Column: Image + Key Metric + Modules */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden rounded-[12px]">
                      <img
                        src={imgUrl}
                        alt={domain.badge}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-[#0b0d14] p-6 text-white flex items-baseline justify-between border-t border-white/15">
                        <span className="text-[13px] text-white/75">{domain.metricLabel}</span>
                        <span className="font-headline text-[30px] font-bold text-white tabular-nums">
                          {domain.metricValue}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 rounded-[12px] border border-neutral-200 bg-[#f6f7f9]">
                      <span className="block text-[11.5px] font-semibold uppercase tracking-[0.08em] text-neutral-400 mb-3">
                        {t.modulesLabel}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {domain.modules.map((mod) => (
                          <span
                            key={mod}
                            className="px-3 py-1.5 text-[12.5px] font-medium rounded-[6px] bg-white border border-neutral-200 text-[#1a1a1a]"
                          >
                            {mod}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Industry Details & 4-Step Flow */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3 text-[13px] font-semibold text-[#0c48d8]">
                        <span>0{index + 1}</span>
                        <span>/</span>
                        <span className="uppercase tracking-wider">{domain.badge}</span>
                      </div>

                      <h2 className="font-headline text-[24px] sm:text-[32px] font-semibold text-[#1a1a1a] leading-[1.2] mb-7">
                        {domain.title}
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 rounded-[12px] overflow-hidden border border-neutral-200 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 mb-8">
                        <div className="p-6 bg-neutral-50">
                          <span className="block text-[11.5px] font-semibold uppercase tracking-[0.08em] text-neutral-400 mb-2">
                            {t.painLabel}
                          </span>
                          <p className="text-[14.5px] text-neutral-700 leading-relaxed">
                            {domain.pain}
                          </p>
                        </div>

                        <div className="p-6 bg-white">
                          <span className="block text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#0c48d8] mb-2">
                            {t.solutionLabel}
                          </span>
                          <p className="text-[14.5px] text-[#1a1a1a] leading-relaxed font-medium">
                            {domain.solution}
                          </p>
                        </div>
                      </div>

                      {/* 4-Step Digital Workflow */}
                      {steps.length > 0 && (
                        <div className="mb-8">
                          <span className="block text-[11.5px] font-semibold uppercase tracking-[0.08em] text-neutral-400 mb-3">
                            {copy.workflowTitle}
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {steps.map((stepText, sIdx) => (
                              <div
                                key={stepText}
                                className="p-4 rounded-[6px] border border-neutral-200 bg-white flex items-baseline gap-3"
                              >
                                <span className="text-[12px] font-bold text-[#0c48d8] tabular-nums">
                                  0{sIdx + 1}
                                </span>
                                <span className="text-[13.5px] text-neutral-800 leading-snug">
                                  {stepText}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="p-6 bg-[#0b0d14] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[12px]">
                        <div>
                          <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-white/60">
                            {t.aiLabel}
                          </span>
                          <p className="text-[14px] text-white/90 mt-1">{domain.aiFeature}</p>
                        </div>

                        <ContactButton className="px-5 py-3 rounded-[6px] bg-[#0c48d8] text-white text-[13.5px] font-medium hover:bg-[#0835a6] transition-colors shrink-0 cursor-pointer">
                          {dict.nav.contact}
                        </ContactButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <CTA dict={dict} />
    </>
  );
}
