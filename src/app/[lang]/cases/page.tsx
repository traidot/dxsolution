import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/i18n/dictionaries";
import ContactButton from "@/components/ContactButton";
import CTA from "@/components/CTA";

export default async function CasesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.testimonials;

  const fullCasesByLocale: Record<
    Locale,
    {
      id: string;
      domain: string;
      solutionTag: string;
      img: string;
      title: string;
      before: string;
      after: string;
      quote: string;
      author: string;
      m1Val: string;
      m1Label: string;
      m2Val: string;
      m2Label: string;
    }[]
  > = {
    vi: [
      {
        id: "case-healthcare",
        domain: "Chăm sóc sức khỏe",
        solutionTag: "Web App · CRM & Đặt lịch",
        img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
        title: "Hệ thống quản lý lịch hẹn, hồ sơ dịch vụ và chăm sóc khách hàng đa chi nhánh",
        before:
          "Quy trình đặt lịch hẹn và quản lý hồ sơ khách hàng thực hiện rời rạc trên sổ sách và bảng tính, dẫn đến trùng lịch giữa các cơ sở và mất nhiều thời gian tổng hợp báo cáo.",
        after:
          "Xây dựng nền tảng quản lý tập trung trên Web và Mobile, đồng bộ lịch hẹn theo thời gian thực, tự động hóa gửi thông báo nhắc lịch và chuẩn hóa báo cáo doanh thu toàn hệ thống.",
        quote: t.items[0].quote,
        author: "Hệ thống Phòng khám & Chăm sóc sức khỏe",
        m1Val: "+42%",
        m1Label: "Tỷ lệ duy trì khách hàng",
        m2Val: "-70%",
        m2Label: "Thời gian tổng hợp báo cáo",
      },
      {
        id: "case-retail",
        domain: "Bán lẻ & Thương mại điện tử",
        solutionTag: "OMS & WMS · Tích hợp ERP",
        img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
        title: "Nền tảng quản trị đơn hàng, tồn kho đa điểm và đồng bộ kế toán tự động",
        before:
          "Hoạt động bán hàng trên nhiều kênh (cửa hàng POS, sàn thương mại điện tử, website) khiến dữ liệu tồn kho không đồng nhất, phát sinh sai lệch khi đối soát vận chuyển và kế toán.",
        after:
          "Triển khai hệ thống OMS/WMS trung tâm kết nối hai chiều với POS, đơn vị vận chuyển và phần mềm kế toán MISA, tự động hóa hoàn toàn khâu giữ hàng, điều phối kho và hạch toán.",
        quote: t.items[1].quote,
        author: "Doanh nghiệp Bán lẻ & Phân phối",
        m1Val: "99.8%",
        m1Label: "Độ chính xác dữ liệu tồn kho",
        m2Val: "-65%",
        m2Label: "Thời gian xử lý & đối soát đơn",
      },
      {
        id: "case-services",
        domain: "Dịch vụ Chuyên nghiệp",
        solutionTag: "Enterprise Portal · Quản trị Dự án",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        title: "Hệ thống điều hành dự án, quản lý nguồn lực và kiểm soát tài chính theo hợp đồng",
        before:
          "Thông tin dự án, tiến độ công việc và đề xuất chi phí phân tán trên nhiều công cụ giao tiếp, gây khó khăn cho ban giám đốc trong việc theo dõi nguồn lực và biên lợi nhuận.",
        after:
          "Phát triển cổng thông tin quản trị dự án tập trung, chuẩn hóa quy trình từ khởi tạo hợp đồng, phân bổ nhân sự, phê duyệt chi phí đến báo cáo tài chính (P&L) theo từng dự án.",
        quote: t.items[2].quote,
        author: "Doanh nghiệp Dịch vụ & Tư vấn B2B",
        m1Val: "+50%",
        m1Label: "Hiệu suất điều phối dự án",
        m2Val: "100%",
        m2Label: "Minh bạch tiến độ & chi phí",
      },
      {
        id: "case-distribution",
        domain: "Logistics & Phân phối",
        solutionTag: "B2B Portal · Quản lý kho WMS",
        img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
        title: "Cổng đặt hàng B2B và hệ thống quản trị kho vận theo tiêu chuẩn FEFO",
        before:
          "Tiếp nhận đơn hàng đại lý thủ công, khó kiểm soát chính sách chiết khấu bậc thang, hạn mức công nợ và thứ tự xuất kho theo lô/hạn sử dụng.",
        after:
          "Triển khai cổng đặt hàng B2B cho hệ thống đại lý tích hợp kiểm soát công nợ tự động và phần mềm quản lý kho WMS theo chuẩn FEFO.",
        quote:
          "Rút ngắn đáng kể thời gian xử lý đơn hàng sỉ, đồng thời kiểm soát chặt chẽ công nợ đại lý và tồn kho theo lô hạn sử dụng.",
        author: "Doanh nghiệp Phân phối & Logistics",
        m1Val: "+60%",
        m1Label: "Tốc độ xử lý đơn hàng B2B",
        m2Val: "100%",
        m2Label: "Tuân thủ chuẩn xuất kho FEFO",
      },
    ],
    en: [
      {
        id: "case-healthcare",
        domain: "Healthcare",
        solutionTag: "Web App · CRM & Scheduling",
        img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
        title: "Multi-branch appointment scheduling, service records, and customer care platform",
        before:
          "Manual booking and fragmented spreadsheet tracking caused schedule conflicts across branches, missed follow-up appointments, and slow monthly reporting.",
        after:
          "Engineered a centralized web and mobile platform that synchronizes multi-branch schedules in real time, automates customer reminders, and standardizes revenue reporting.",
        quote: t.items[0].quote,
        author: "Healthcare & Clinic Network",
        m1Val: "+42%",
        m1Label: "Customer retention rate",
        m2Val: "-70%",
        m2Label: "Reporting preparation time",
      },
      {
        id: "case-retail",
        domain: "Retail & E-Commerce",
        solutionTag: "OMS & WMS · ERP Integration",
        img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
        title: "Centralized order management, multi-warehouse inventory, and accounting sync",
        before:
          "Selling across physical POS stores, e-commerce marketplaces, and web channels led to inventory discrepancies and manual reconciliation delays.",
        after:
          "Deployed a central OMS/WMS platform integrated two-way with POS, logistics providers, and accounting software to automate stock reservation and financial entries.",
        quote: t.items[1].quote,
        author: "Retail & Distribution Enterprise",
        m1Val: "99.8%",
        m1Label: "Inventory data accuracy",
        m2Val: "-65%",
        m2Label: "Order reconciliation time",
      },
      {
        id: "case-services",
        domain: "Professional Services",
        solutionTag: "Enterprise Portal · Project Management",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        title: "Enterprise project operations, resource planning, and contract financial control",
        before:
          "Project documentation, task progress, and expense approvals were scattered across communication tools, limiting visibility into resource utilization and net margins.",
        after:
          "Developed an enterprise project management portal standardizing contract milestones, resource allocation, expense workflows, and real-time project P&L.",
        quote: t.items[2].quote,
        author: "B2B Consulting & Services Firm",
        m1Val: "+50%",
        m1Label: "Project coordination efficiency",
        m2Val: "100%",
        m2Label: "Timeline & cost transparency",
      },
      {
        id: "case-distribution",
        domain: "Logistics & Distribution",
        solutionTag: "B2B Portal · Warehouse Management",
        img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
        title: "B2B dealer ordering portal and FEFO warehouse management system",
        before:
          "Manual dealer order intake made it difficult to enforce tiered pricing rules, credit limits, and strict batch/expiry warehouse picking.",
        after:
          "Delivered a self-service B2B ordering portal integrated with automated credit control and FEFO warehouse management.",
        quote:
          "Significantly accelerated wholesale order fulfillment while ensuring strict compliance with dealer credit limits and batch expiry rules.",
        author: "Distribution & Logistics Enterprise",
        m1Val: "+60%",
        m1Label: "B2B order fulfillment speed",
        m2Val: "100%",
        m2Label: "FEFO batch compliance",
      },
    ],
    ja: [
      {
        id: "case-healthcare",
        domain: "ヘルスケア",
        solutionTag: "Webアプリ · CRM・予約管理",
        img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
        title: "多拠点クリニック向け 予約・カルテ記録・顧客フォロー統合システム",
        before:
          "電話・紙・表計算ソフトによる個別管理のため、拠点間の予約重複やフォロー漏れが発生し、月次の売上・稼働集計に多大な時間を要していた。",
        after:
          "Web・モバイル統合管理システムを構築し、全拠点の予約枠をリアルタイム同期。自動リマインド配信と経営レポートの自動集計を実現した。",
        quote: t.items[0].quote,
        author: "ヘルスケア・クリニックチェーン",
        m1Val: "+42%",
        m1Label: "顧客継続率の向上",
        m2Val: "-70%",
        m2Label: "月次集計工数の削減",
      },
      {
        id: "case-retail",
        domain: "小売・EC",
        solutionTag: "OMS & WMS · ERP連携",
        img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
        title: "オムニチャネル受注管理・多拠点在庫管理・会計自動連携システム",
        before:
          "実店舗POS、複数のECモール、自社ECサイト間で在庫データが分断され、売り越しや出荷遅延、会計システムへの手入力ミスが発生していた。",
        after:
          "統合OMS/WMS基盤を導入し、POS・配送システム・会計ソフトと双方向API連携。在庫引き当てから出荷指示、仕訳計上までを完全自動化した。",
        quote: t.items[1].quote,
        author: "小売・流通企業",
        m1Val: "99.8%",
        m1Label: "在庫データ整合性",
        m2Val: "-65%",
        m2Label: "受注・照合処理時間",
      },
      {
        id: "case-services",
        domain: "プロフェッショナルサービス",
        solutionTag: "エンタープライズポータル · 案件管理",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        title: "プロジェクト運営・リソース管理・契約別収支（P&L）管理システム",
        before:
          "契約情報、タスク進捗、工数・経費申請が複数のチャットやシートに散在し、要員の稼働率や案件ごとの利益率をタイムリーに把握できなかった。",
        after:
          "契約マイルストーン管理、アサイン計画、経費ワークフロー、リアルタイム案件別P&Lを統合した社内ポータルを構築し、経営可視化を実現した。",
        quote: t.items[2].quote,
        author: "B2Bコンサルティング・サービス企業",
        m1Val: "+50%",
        m1Label: "案件管理効率の向上",
        m2Val: "100%",
        m2Label: "進捗・コストの可視化",
      },
      {
        id: "case-distribution",
        domain: "物流・流通（卸売）",
        solutionTag: "B2Bポータル · 倉庫管理 WMS",
        img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
        title: "代理店向けB2B受発注ポータルおよびFEFO対応倉庫管理システム",
        before:
          "代理店からの電話・FAX・チャットによる受注処理に手間がかかり、取引先別の価格条件や与信限度額、ロット・有効期限（FEFO）順の出荷管理が困難だった。",
        after:
          "与信自動チェック機能を備えたB2B受発注ポータルと、FEFO基準の倉庫管理システム（WMS）を導入し、受注から出荷・売掛管理までを標準化した。",
        quote:
          "卸売受注の処理スピードが大幅に向上し、代理店ごとの与信管理とロット・有効期限別の在庫管理を厳格に行えるようになりました。",
        author: "流通・ロジスティクス企業",
        m1Val: "+60%",
        m1Label: "B2B受注処理スピード",
        m2Val: "100%",
        m2Label: "FEFO出荷基準の遵守",
      },
    ],
  };

  const fullCases = fullCasesByLocale[lang];
  const copy = {
    vi: {
      bannerTitle: "Dự án Thành công",
      bannerSub: "Năng lực triển khai được khách hàng công nhận",
      home: "Trang chủ",
      beforeLabel: "BÀI TOÁN TRƯỚC TRIỂN KHAI",
      afterLabel: "GIẢI PHÁP & KẾT QUẢ",
      consultBtn: "Tư vấn giải pháp tương tự",
    },
    en: {
      bannerTitle: "Case Studies",
      bannerSub: "Implementation capability recognized by clients",
      home: "Home",
      beforeLabel: "CHALLENGE",
      afterLabel: "SOLUTION & OUTCOME",
      consultBtn: "Consult a similar solution",
    },
    ja: {
      bannerTitle: "導入事例",
      bannerSub: "お客様に評価される確かなシステム実装力",
      home: "ホーム",
      beforeLabel: "導入前の課題",
      afterLabel: "導入ソリューションと成果",
      consultBtn: "類似ソリューションについて相談する",
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
          <span className="font-semibold text-white">{dict.nav.cases}</span>
        </div>
      </section>

      {/* Case Study Showcases */}
      <section className="bg-white divide-y divide-neutral-200">
        {fullCases.map((item, idx) => (
          <article key={item.id} className="py-20 lg:py-24">
            <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left Column: Image + Metrics */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="aspect-[16/10] bg-neutral-900 overflow-hidden rounded-[12px] group">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </div>

                <div className="grid grid-cols-2 rounded-[12px] overflow-hidden border border-neutral-200 divide-x divide-neutral-200">
                  <div className="p-6 bg-[#f6f7f9]">
                    <div className="font-headline text-[32px] font-bold text-[#0c48d8] tabular-nums leading-none">
                      {item.m1Val}
                    </div>
                    <div className="text-[13px] text-neutral-600 mt-2">{item.m1Label}</div>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="font-headline text-[32px] font-bold text-[#1a1a1a] tabular-nums leading-none">
                      {item.m2Val}
                    </div>
                    <div className="text-[13px] text-neutral-600 mt-2">{item.m2Label}</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative + Before/After */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-[13px] font-bold text-[#0c48d8] mr-2 tabular-nums">
                      0{idx + 1}
                    </span>
                    <span className="px-3 py-1 text-[12px] font-medium bg-[#0b0d14] text-white rounded-[6px]">
                      {item.domain}
                    </span>
                    <span className="px-3 py-1 text-[12px] border border-neutral-300 text-neutral-700 rounded-[6px]">
                      {item.solutionTag}
                    </span>
                  </div>

                  <h2 className="font-headline text-[24px] sm:text-[30px] font-semibold text-[#1a1a1a] leading-[1.22] mb-6">
                    {item.title}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 rounded-[12px] overflow-hidden border border-neutral-200 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 mb-7">
                    <div className="p-6 bg-neutral-50">
                      <span className="block text-[11.5px] font-semibold uppercase tracking-[0.08em] text-neutral-400 mb-2">
                        {copy.beforeLabel}
                      </span>
                      <p className="text-[14px] text-neutral-700 leading-relaxed">
                        {item.before}
                      </p>
                    </div>
                    <div className="p-6 bg-white">
                      <span className="block text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#0c48d8] mb-2">
                        {copy.afterLabel}
                      </span>
                      <p className="text-[14px] text-[#1a1a1a] font-medium leading-relaxed">
                        {item.after}
                      </p>
                    </div>
                  </div>

                  <p className="text-[15px] text-neutral-600 leading-relaxed border-l-2 border-[#0c48d8] pl-5 py-1 mb-2">
                    {item.quote}
                  </p>
                  <p className="text-[13px] font-medium text-neutral-500 pl-5 mb-7">{item.author}</p>
                </div>

                <div>
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
              </div>
            </div>
          </article>
        ))}
      </section>

      <CTA dict={dict} />
    </>
  );
}
