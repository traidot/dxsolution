import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/i18n/dictionaries";
import CTA from "@/components/CTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const titles = {
    vi: "Về DXS - Đối tác phát triển phần mềm & chuyển đổi số doanh nghiệp",
    en: "About DXS - Enterprise Software Development & Digital Transformation Partner",
    ja: "DXSについて - ソフトウェア開発・企業DX推進パートナー",
  };

  const descriptions = {
    vi: "Tìm hiểu về DXS: Sứ mệnh, tầm nhìn, 4 giá trị cốt lõi, tiêu chuẩn kiến trúc kỹ thuật và cam kết bảo mật cấp doanh nghiệp.",
    en: "Learn about DXS: Our mission, vision, core engineering standards, enterprise security commitments, and corporate profile.",
    ja: "DXSの企業情報：ミッション、ビジョン、4つの行動規範、高品質な開発標準、情報セキュリティへの取り組みをご紹介します。",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!hasLocale(rawLang)) notFound();
  const lang = rawLang as Locale;
  const dict = getDictionary(lang);

  const copy = {
    vi: {
      home: "Trang chủ",
      eyebrow: "VỀ CHÚNG TÔI",
      bannerTitle: "Công nghệ đồng hành, kiến tạo tương lai số.",
      bannerSub: "DXS là đối tác chiến lược trong phát triển phần mềm quản trị và chuyển đổi số toàn diện cho doanh nghiệp.",
      bannerDesc: "Chúng tôi kết hợp nền tảng kỹ thuật chuẩn mực, tư duy nghiệp vụ thực chiến và năng lực ứng dụng AI để xây dựng các hệ thống phần mềm có độ tin cậy cao, giải quyết trọn vẹn bài toán vận hành của tổ chức.",
      
      storyEyebrow: "01 / TẦM NHÌN & SỨ MỆNH",
      storyTitle: "Định vị đối tác công nghệ tin cậy dài hạn",
      storyP1: "DXS được thành lập với mục tiêu trở thành cầu nối vững chắc giúp các doanh nghiệp Việt Nam và khu vực hiện đại hóa hệ thống quản trị, tối ưu năng suất lao động và bứt phá doanh thu bằng sức mạnh công nghệ.",
      storyP2: "Chúng tôi không chỉ viết phần mềm theo đơn đặt hàng mà đóng vai trò là kiến trúc sư công nghệ đồng hành: lắng nghe bài toán thực tế, tư vấn lộ trình khả thi và chịu trách nhiệm đến cùng về tính ổn định của hệ thống khi đưa vào vận hành.",
      
      visionTitle: "Tầm nhìn",
      visionDesc: "Trở thành đơn vị công nghệ và chuyển đổi số được tin chọn hàng đầu khu vực, nổi bật bởi các giải pháp phần mềm chuyên biệt, kiến trúc mở và khả năng mở rộng không giới hạn.",
      
      missionTitle: "Sứ mệnh",
      missionDesc: "Đơn giản hóa và tự động hóa các quy trình vận hành phức tạp, giải phóng con người khỏi thao tác thủ công, đồng hành cùng doanh nghiệp bứt phá tăng trưởng bền vững.",

      storyImgTag: "HẠ TẦNG & KIẾN TRÚC",
      storyImgTitle: "Chuẩn mực hạ tầng đám mây & kỹ thuật phần mềm hiện đại",

      valuesEyebrow: "02 / GIÁ TRỊ CỐT LÕI",
      valuesTitle: "4 chuẩn mực dẫn lối mọi dự án tại DXS",
      values: [
        {
          num: "01",
          title: "Thực chiến & Hướng kết quả",
          desc: "Mọi tính năng, dòng code đều xuất phát từ bài toán kinh doanh thực tế. Chúng tôi cam kết tiến độ và hiệu quả đầu tư rõ ràng qua từng giai đoạn nghiệm thu.",
        },
        {
          num: "02",
          title: "Kiến trúc Chuẩn mực & Mở rộng",
          desc: "Thiết kế hệ thống theo tiêu chuẩn mở, dễ dàng liên thông dữ liệu hai chiều qua API với các nền tảng ERP, POS, sàn TMĐT và cổng thanh toán sẵn có.",
        },
        {
          num: "03",
          title: "Tự động hóa & Ứng dụng AI",
          desc: "Tiên phong đưa các giải pháp tự động hóa RPA và trí tuệ nhân tạo (AI/GenAI) vào quy trình xử lý, cắt giảm 50–70% thời gian thao tác thủ công.",
        },
        {
          num: "04",
          title: "Bảo mật & Đồng hành Dài hạn",
          desc: "Cam kết bảo mật tuyệt đối với thỏa thuận NDA, cơ chế phân quyền RBAC và chính sách bảo hành, hỗ trợ kỹ thuật vận hành 24/7 lâu dài.",
        },
      ],

      pillarsEyebrow: "03 / NĂNG LỰC KỸ THUẬT",
      pillarsTitle: "Tiêu chuẩn kỹ thuật đẳng cấp doanh nghiệp",
      pillarsSubtitle: "Hệ thống phần mềm do DXS phát triển tuân thủ nghiêm ngặt các tiêu chuẩn kiến trúc hiện đại:",
      pillars: [
        {
          tag: "Kiến trúc hệ thống",
          title: "Kiến trúc phân tầng sạch & Khối mô-đun hóa (Clean Architecture)",
          desc: "Phân tách rõ ràng giữa tầng nghiệp vụ và tầng dữ liệu, giúp mã nguồn luôn trong sáng, dễ bảo trì, dễ kiểm thử và sẵn sàng mở rộng linh hoạt.",
        },
        {
          tag: "Hạ tầng & Đám mây",
          title: "Nền tảng Cloud-Native & Tự động hóa CI/CD",
          desc: "Triển khai trên nền tảng đám mây an toàn (AWS, GCP, Vercel), đường ống CI/CD tự động hóa kiểm thử và triển khai với cam kết thời gian hoạt động 99.8%.",
        },
        {
          tag: "Dữ liệu & Tích hợp",
          title: "Tích hợp & Đồng bộ dữ liệu hai chiều",
          desc: "Xử lý dữ liệu thời gian thực giữa các phân hệ ERP, CRM, OMS, WMS với cơ chế giao dịch (Transaction) an toàn, đảm bảo toàn vẹn và chống thất thoát dữ liệu.",
        },
        {
          tag: "An toàn thông tin",
          title: "Bảo mật đa tầng & Mã hóa dữ liệu chuyên sâu",
          desc: "Mã hóa dữ liệu lưu trữ và truyền tải (TLS 1.3 / AES-256), ghi vết lịch sử thao tác (Audit Log) bất biến và tuân thủ nghiêm ngặt Nghị định 13/2023/NĐ-CP.",
        },
      ],

      profileEyebrow: "04 / THÔNG TIN PHÁP NHÂN",
      profileTitle: "Thông tin tổng quan về công ty",
      profileItems: [
        { label: "Tên thương hiệu", value: "DXS (Giải pháp Chuyển đổi số Doanh nghiệp)" },
        { label: "Pháp nhân", value: "Công ty Cổ phần Giải pháp Chuyển đổi số DXS" },
        { label: "Lĩnh vực hoạt động", value: "Phát triển phần mềm theo yêu cầu, Giải pháp ERP/CRM/OMS/WMS, Tư vấn kiến trúc & Chuyển đổi số" },
        { label: "Thị trường trọng điểm", value: "Việt Nam, Nhật Bản và các đối tác doanh nghiệp quốc tế" },
        { label: "Cam kết chất lượng", value: "Cam kết hoạt động Uptime 99.8% · Bảo mật dữ liệu NDA · Hỗ trợ kỹ thuật 24/7" },
        { label: "Kênh liên hệ chính thức", value: "contact@dxsolution.vn · Hotline: 098.884.2828" },
      ],
    },
    en: {
      home: "Home",
      eyebrow: "ABOUT US",
      bannerTitle: "Technology partner for scalable enterprise growth.",
      bannerSub: "DXS is a strategic partner in custom software development and end-to-end digital transformation for enterprises.",
      bannerDesc: "We combine modern software engineering standards, deep industry domain expertise, and practical AI solutions to build robust software systems that resolve real operational bottlenecks.",
      
      storyEyebrow: "01 / VISION & MISSION",
      storyTitle: "A trusted, long-term enterprise technology partner",
      storyP1: "DXS was established to empower businesses across Vietnam and the region to modernize operations, elevate productivity, and drive sustainable revenue growth through technological excellence.",
      storyP2: "We go beyond conventional software outsourcing by serving as dedicated technology architects: actively understanding operational challenges, designing pragmatic roadmaps, and taking full responsibility for system stability in production.",
      
      visionTitle: "Vision",
      visionDesc: "To become the regional benchmark in enterprise technology and digital transformation, recognized for specialized domain solutions, open architectures, and unlimited scalability.",
      
      missionTitle: "Mission",
      missionDesc: "To simplify and automate complex operational workflows, liberating teams from repetitive tasks and enabling enterprises to accelerate sustainable business growth.",

      storyImgTag: "INFRASTRUCTURE & ARCHITECTURE",
      storyImgTitle: "Modern cloud infrastructure & software engineering standards",

      valuesEyebrow: "02 / CORE VALUES",
      valuesTitle: "4 foundational principles guiding every DXS engagement",
      values: [
        {
          num: "01",
          title: "Pragmatic & Outcome-Driven",
          desc: "Every feature and line of code solves a concrete operational need. We deliver predictable milestones and measurable ROI across each phase.",
        },
        {
          num: "02",
          title: "Standardized & Extensible Architecture",
          desc: "Engineered on open API standards for seamless bidirectional synchronization with your existing ERP, POS, e-commerce, and financial systems.",
        },
        {
          num: "03",
          title: "Automation & Applied AI",
          desc: "Pioneering the integration of RPA and AI/GenAI into business processes, cutting manual processing times by 50% to 70%.",
        },
        {
          num: "04",
          title: "Enterprise Security & Dedicated Care",
          desc: "Strict Non-Disclosure Agreements (NDA), role-based access control (RBAC), and 24/7 post-launch maintenance ensure complete peace of mind.",
        },
      ],

      pillarsEyebrow: "03 / TECHNICAL EXCELLENCE",
      pillarsTitle: "Enterprise-grade software engineering standards",
      pillarsSubtitle: "All systems built by DXS adhere to rigorous modern architecture guidelines:",
      pillars: [
        {
          tag: "Architecture",
          title: "Clean Architecture & Modular Monolith",
          desc: "Strict separation of business domain logic and data layers ensures the codebase remains maintainable, testable, and microservice-ready.",
        },
        {
          tag: "Cloud & DevOps",
          title: "Cloud-Native Infrastructure & Automated CI/CD",
          desc: "Secure deployments across AWS, GCP, and Vercel with automated test pipelines, blue-green releases, and a 99.8% uptime commitment.",
        },
        {
          tag: "Data Flow",
          title: "Bidirectional Synchronization & Consistency",
          desc: "Real-time transactional integrity across ERP, CRM, OMS, and WMS modules with comprehensive data reconciliation.",
        },
        {
          tag: "Security",
          title: "Multi-Tier Security & Data Encryption",
          desc: "End-to-end encryption (TLS 1.3 / AES-256), immutable audit trails, and strict compliance with national and international data privacy regulations.",
        },
      ],

      profileEyebrow: "04 / CORPORATE PROFILE",
      profileTitle: "Company overview & operational details",
      profileItems: [
        { label: "Brand Name", value: "DXS (Digital Transformation Solutions)" },
        { label: "Legal Entity", value: "DXS Digital Transformation Solutions JSC" },
        { label: "Core Services", value: "Custom Software Engineering, Enterprise ERP/OMS/WMS/CRM, AI Solutions & Architecture Consulting" },
        { label: "Key Markets", value: "Vietnam, Japan, and International Enterprise Clients" },
        { label: "Service Commitments", value: "99.8% SLA Uptime · NDA Data Protection · 24/7 Operations Support" },
        { label: "Official Inquiries", value: "contact@dxsolution.vn · Hotline: 098.884.2828" },
      ],
    },
    ja: {
      home: "ホーム",
      eyebrow: "会社情報",
      bannerTitle: "企業の成長を加速する、確かなDX技術パートナー",
      bannerSub: "DXSは、エンタープライズ業務システム開発および企業DX推進を支援する総合テクノロジーパートナーです。",
      bannerDesc: "国際標準の開発基準、実務に即した業務知見、そして最新のAI技術を融合し、高信頼・高拡張な業務基盤の構築を実現します。",
      
      storyEyebrow: "01 / ビジョン＆ミッション",
      storyTitle: "長期的な信頼に基づくテクノロジーパートナー",
      storyP1: "DXSは、企業が直面する複雑な業務課題をテクノロジーの力で解決し、生産性の飛躍的向上と持続的な事業成長を支援するために設立されました。",
      storyP2: "単なる開発委託にとどまらず、お客様の事業戦略に深く寄り添う技術アーキテクトとして、実効性の高いロードマップを策定し、本番稼働後の安定運用まで一貫して責任を持ちます。",
      
      visionTitle: "ビジョン",
      visionDesc: "業界別の専門知見、オープンな設計思想、無限の拡張性を備えた業務ソリューションを提供し、アジア地域で最も信頼されるDXパートナーを目指します。",
      
      missionTitle: "ミッション",
      missionDesc: "複雑な業務フローをシンプル化・自動化し、現場の負担を軽減することで、企業が本業の成長に専念できる環境を創出します。",

      storyImgTag: "インフラ＆アーキテクチャ",
      storyImgTitle: "最新クラウドインフラと高品質なソフトウェア設計基準",

      valuesEyebrow: "02 / 行動指針・コアバリュー",
      valuesTitle: "DXSの全プロジェクトを貫く4つの原則",
      values: [
        {
          num: "01",
          title: "実効性・成果主義",
          desc: "すべての機能開発は実務上の課題解決に直結します。段階的な検収プロセスにより、明確な投資対効果（ROI）をお届けします。",
        },
        {
          num: "02",
          title: "標準化された拡張性アーキテクチャ",
          desc: "オープンAPIに基づき設計され、既存のERP、POS、ECモール、決済システムとのシームレスな双方向データ連携を保証します。",
        },
        {
          num: "03",
          title: "業務自動化・実践的AI導入",
          desc: "RPAおよびAI技術を業務プロセスに組み込み、手作業による管理工数を大幅に削減します。",
        },
        {
          num: "04",
          title: "万全のセキュリティと長期伴走",
          desc: "秘密保持契約（NDA）の締結、厳格なアクセス制御（RBAC）、24時間365日のシステム保守体制により、安心の運用を提供します。",
        },
      ],

      pillarsEyebrow: "03 / 技術力・開発標準",
      pillarsTitle: "エンタープライズ品質の開発基準",
      pillarsSubtitle: "DXSが構築するすべてのシステムは、厳格なモダンアーキテクチャ標準に準拠しています：",
      pillars: [
        {
          tag: "アーキテクチャ",
          title: "クリーンアーキテクチャ＆モジュラー設計",
          desc: "ビジネスロジックとデータアクセス層を分離し、保守性が高くマイクロサービス化にも適したコード品質を維持します。",
        },
        {
          tag: "クラウド＆DevOps",
          title: "クラウドネイティブ＆自動化CI/CD",
          desc: "AWS、GCP、Vercel等のセキュアな基盤上に構築し、CI/CDパイプラインによる自動テスト・継続的デプロイを実現します。",
        },
        {
          tag: "データ連携",
          title: "高整合性・双方向API連携",
          desc: "ERP、CRM、OMS、WMS間のリアルタイムデータ同期において、トランザクションの完全性と整合性を担保します。",
        },
        {
          tag: "セキュリティ",
          title: "多層防御セキュリティ＆データ暗号化",
          desc: "通信・保存データの強固な暗号化（TLS 1.3 / AES-256）、監査ログの完全保持、国際的なデータ保護基準に適合します。",
        },
      ],

      profileEyebrow: "04 / 企業概要",
      profileTitle: "DXSの基本情報",
      profileItems: [
        { label: "ブランド名", value: "DXS (Digital Transformation Solutions)" },
        { label: "法人名", value: "DXS Digital Transformation Solutions JSC" },
        { label: "事業内容", value: "受託ソフトウェア開発、ERP/OMS/WMS/CRM構築、アーキテクチャ設計・DXコンサルティング" },
        { label: "主要市場", value: "ベトナム、日本、およびグローバル企業" },
        { label: "品質保証", value: "99.8% SLA稼働率 · NDA機密保持 · 24/7運用保守体制" },
        { label: "お問い合わせ", value: "contact@dxsolution.vn · 電話: 098.884.2828" },
      ],
    },
  }[lang];

  return (
    <>
      {/* Subpage Banner — Solid dark background, zero people */}
      <section className="relative min-h-[380px] bg-[#0b0d14] text-white pt-32 pb-16 lg:pt-36 lg:pb-20 border-b border-white/10 flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0b0d14]/85" />
        </div>

        <div className="relative z-10 max-w-[1400px] w-full mx-auto px-5 md:px-10 my-auto">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-[4px] bg-white/[0.08] border border-white/15 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#4d8dff] mb-4">
              {copy.eyebrow}
            </span>
            <h1 className="font-headline text-[34px] sm:text-[44px] lg:text-[48px] font-semibold leading-[1.2] text-white">
              {copy.bannerTitle}
            </h1>
            <p className="mt-3 text-[19px] sm:text-[21px] font-bold text-white/90">
              {copy.bannerSub}
            </p>
            <p className="mt-4 text-[15.5px] font-light text-white/75 leading-[1.7] max-w-2xl">
              {copy.bannerDesc}
            </p>
          </div>
        </div>

        <div className="relative z-10 max-w-[1400px] w-full mx-auto px-5 md:px-10 pt-8 flex items-center justify-end gap-2 text-[14px] font-light text-white/60">
          <Link href={`/${lang}`} className="hover:text-white transition-colors">
            {copy.home}
          </Link>
          <span>/</span>
          <span className="font-semibold text-white">{dict.nav.about}</span>
        </div>
      </section>

      {/* Section 1: Vision & Mission */}
      <section className="py-20 lg:py-28 bg-white border-b border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0c48d8]">
                {copy.storyEyebrow}
              </span>
              <h2 className="vnext-h2 mt-2 mb-6">
                {copy.storyTitle}
              </h2>
              <p className="text-[15.5px] text-neutral-600 font-normal leading-relaxed mb-4">
                {copy.storyP1}
              </p>
              <p className="text-[15.5px] text-neutral-600 font-normal leading-relaxed">
                {copy.storyP2}
              </p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-[10px] bg-[#f8f9fc] border border-neutral-200">
                  <h3 className="font-headline text-[17px] font-bold text-[#1a1a1a] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0c48d8]" />
                    {copy.visionTitle}
                  </h3>
                  <p className="text-[14px] text-neutral-600 leading-relaxed">
                    {copy.visionDesc}
                  </p>
                </div>
                <div className="p-6 rounded-[10px] bg-[#f8f9fc] border border-neutral-200">
                  <h3 className="font-headline text-[17px] font-bold text-[#1a1a1a] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0c48d8]" />
                    {copy.missionTitle}
                  </h3>
                  <p className="text-[14px] text-neutral-600 leading-relaxed">
                    {copy.missionDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-[14px] overflow-hidden border border-neutral-200 shadow-xl bg-neutral-900 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
                  alt="DXS Infrastructure & Technology"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[12px] uppercase tracking-wider text-[#4d8dff] font-semibold">
                    {copy.storyImgTag}
                  </span>
                  <div className="font-headline text-[18px] sm:text-[20px] font-bold mt-1">
                    {copy.storyImgTitle}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Core Values (Clean Hairline Bento Grid - 0 Overlapping Border) */}
      <section className="py-20 lg:py-28 bg-[#f8f9fc] border-b border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mb-14">
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0c48d8]">
              {copy.valuesEyebrow}
            </span>
            <h2 className="vnext-h2 mt-2">
              {copy.valuesTitle}
            </h2>
          </div>

          <div className="rounded-[12px] overflow-hidden border border-neutral-200 bg-neutral-200 gap-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 shadow-sm">
            {copy.values.map((val) => (
              <div
                key={val.num}
                className="group bg-white p-8 sm:p-9 flex flex-col justify-between hover:bg-neutral-50/90 transition-all duration-300"
              >
                <div>
                  <span className="inline-block px-3 py-1 rounded-[4px] bg-[#0c48d8]/[0.08] text-[12px] font-mono font-bold text-[#0c48d8] mb-6">
                    {val.num}
                  </span>
                  <h3 className="font-headline text-[19px] font-semibold text-[#1a1a1a] group-hover:text-[#0c48d8] transition-colors duration-300 mb-3 leading-snug">
                    {val.title}
                  </h3>
                  <p className="text-[14.5px] text-neutral-500 font-normal leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Engineering Standards & Technical Pillars */}
      <section className="py-20 lg:py-28 bg-white border-b border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mb-14">
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0c48d8]">
              {copy.pillarsEyebrow}
            </span>
            <h2 className="vnext-h2 mt-2 mb-4">
              {copy.pillarsTitle}
            </h2>
            <p className="text-[15.5px] text-neutral-600 font-normal leading-relaxed">
              {copy.pillarsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {copy.pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-8 rounded-[12px] border border-neutral-200 bg-white hover:border-[#0c48d8]/40 hover:shadow-lg transition-all duration-300"
              >
                <span className="inline-block px-2.5 py-1 rounded-[4px] bg-neutral-100 text-[11.5px] font-semibold uppercase tracking-wider text-neutral-600 mb-3">
                  {pillar.tag}
                </span>
                <h3 className="font-headline text-[20px] font-semibold text-[#1a1a1a] mb-2.5">
                  {pillar.title}
                </h3>
                <p className="text-[14.5px] text-neutral-500 leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Corporate Profile & Legal Entity */}
      <section className="py-20 lg:py-28 bg-[#f8f9fc] border-b border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0c48d8]">
                {copy.profileEyebrow}
              </span>
              <h2 className="vnext-h2 mt-2 mb-4">
                {copy.profileTitle}
              </h2>
              <p className="text-[15px] text-neutral-600 leading-relaxed">
                DXS vận hành với tư cách là pháp nhân công nghệ độc lập, sở hữu đội ngũ kỹ sư phần mềm, chuyên gia kiến trúc và phân tích nghiệp vụ giàu kinh nghiệm thực chiến.
              </p>
            </div>

            <div className="lg:col-span-7 rounded-[12px] overflow-hidden border border-neutral-200 bg-neutral-200 gap-px grid grid-cols-1 shadow-sm">
              {copy.profileItems.map((item) => (
                <div
                  key={item.label}
                  className="bg-white p-6 sm:p-7 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 hover:bg-neutral-50/70 transition-colors"
                >
                  <span className="font-headline text-[14px] font-semibold text-neutral-500 shrink-0 sm:w-1/3">
                    {item.label}
                  </span>
                  <span className="text-[14.5px] font-medium text-[#1a1a1a] sm:w-2/3 leading-relaxed">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA dict={dict} />
    </>
  );
}
