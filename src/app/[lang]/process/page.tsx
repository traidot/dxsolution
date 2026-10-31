import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/i18n/dictionaries";
import ContactButton from "@/components/ContactButton";
import CTA from "@/components/CTA";
import FaqAccordion from "@/components/FaqAccordion";

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.features;

  const deliverablesByLocale: Record<Locale, string[][]> = {
    vi: [
      ["Tài liệu phân tích quy trình nghiệp vụ (BRD)", "Thiết kế kiến trúc hệ thống tổng thể", "Kế hoạch triển khai và dự toán ngân sách"],
      ["Hệ thống phần mềm được cấu hình và phát triển", "Tích hợp API hai chiều với các hệ thống liên quan", "Báo cáo kiểm thử chất lượng phần mềm (QA/QC)"],
      ["Tài liệu hướng dẫn sử dụng theo từng bộ phận", "Chương trình đào tạo trực tiếp cho nhân sự", "Nghiệm thu và đưa hệ thống vào vận hành thực tế"],
      ["Hỗ trợ kỹ thuật và giám sát vận hành 24/7", "Bảo trì định kỳ và tối ưu hiệu năng hệ thống", "Mở rộng tính năng theo nhu cầu phát triển"],
    ],
    en: [
      ["Business Requirements Document (BRD)", "Target system architecture blueprint", "Detailed project schedule & budget estimation"],
      ["Configured and developed software modules", "Bidirectional API integrations with existing systems", "Comprehensive QA/QC test reports"],
      ["Role-specific user manuals and SOPs", "Hands-on training sessions by department", "User acceptance testing (UAT) & production go-live"],
      ["24/7 technical and operational support", "Scheduled maintenance & performance optimization", "Continuous feature expansion as your business scales"],
    ],
    ja: [
      ["業務要件定義書（BRD）・業務フロー図", "システム全体アーキテクチャ設計書", "導入スケジュールおよび詳細見積書"],
      ["開発・カスタマイズ済みシステムモジュール", "既存基幹システムとの双方向API連携実装", "品質検証（QA/QC）テスト完了報告書"],
      ["部門・権限別の操作マニュアル（SOP）", "現場担当者向けの導入・操作トレーニング", "受入テスト（UAT）完了および本番稼働移行"],
      ["24時間365日の稼働監視・技術サポート", "定期メンテナンスおよびパフォーマンス最適化", "事業拡大に伴う継続的な機能拡張支援"],
    ],
  };

  const faqsByLocale: Record<Locale, { q: string; a: string }[]> = {
    vi: [
      {
        q: "Doanh nghiệp đang sử dụng phần mềm kế toán hoặc POS sẵn có thì có tích hợp được không?",
        a: "Hoàn toàn được. Giải pháp của DXBiz được thiết kế theo kiến trúc mở, cho phép tích hợp dữ liệu hai chiều với các phần mềm kế toán (MISA, Fast, SAP), POS (Sapo, KiotViet), sàn thương mại điện tử và đơn vị vận chuyển mà doanh nghiệp đang vận hành.",
      },
      {
        q: "Thời gian triển khai một dự án phần mềm hoặc hệ thống quản trị mất bao lâu?",
        a: "Tùy thuộc vào phạm vi và mô hình hợp tác. Với mô hình triển khai trên nền tảng giải pháp có sẵn của DXBiz, phân hệ đầu tiên có thể đi vào vận hành thực tế sau 2–4 tuần. Với các dự án phát triển phần mềm chuyên biệt quy mô lớn, lộ trình được chia thành từng giai đoạn nghiệm thu rõ ràng.",
      },
      {
        q: "DXBiz đảm bảo chất lượng phần mềm và bảo mật dữ liệu của doanh nghiệp như thế nào?",
        a: "Chúng tôi ký kết thỏa thuận bảo mật thông tin (NDA) ngay từ bước khảo sát. Hệ thống được thiết kế với cơ chế phân quyền theo vai trò (RBAC), lưu vết thao tác (Audit Log), mã hóa dữ liệu và tuân thủ quy trình kiểm thử chất lượng (QA) nghiêm ngặt trước khi bàn giao.",
      },
      {
        q: "Sau khi bàn giao hệ thống, chế độ bảo hành và hỗ trợ kỹ thuật ra sao?",
        a: "Đội ngũ kỹ sư của DXBiz đồng hành xuyên suốt trong giai đoạn vận hành chính thức, hỗ trợ xử lý yêu cầu kỹ thuật nhanh chóng và cung cấp dịch vụ bảo trì, nâng cấp hệ thống dài hạn.",
      },
    ],
    en: [
      {
        q: "Can DXBiz integrate with our existing accounting or POS software?",
        a: "Yes. Our systems are built on an open API architecture that supports seamless two-way synchronization with existing accounting platforms (MISA, Fast, SAP), POS systems (Sapo, KiotViet), e-commerce marketplaces, and logistics providers.",
      },
      {
        q: "What is the typical timeline for implementing a management system?",
        a: "Timelines depend on project scope. Using DXBiz's pre-engineered industry platforms, the first operational module can go live within 2–4 weeks. Larger custom software initiatives are delivered in clear, milestone-based phases.",
      },
      {
        q: "How does DXBiz ensure software quality and enterprise data security?",
        a: "We sign a strict Non-Disclosure Agreement (NDA) from day one. All systems feature role-based access control (RBAC), complete activity audit logs, encrypted storage, and rigorous QA testing prior to deployment.",
      },
      {
        q: "What post-launch support and maintenance services do you provide?",
        a: "Our engineering team provides dedicated post-launch warranty support, continuous system monitoring, and optional long-term maintenance and feature development retainers.",
      },
    ],
    ja: [
      {
        q: "現在利用中の会計ソフトやPOSシステムとの連携は可能ですか？",
        a: "はい、可能です。DXBizのシステムはオープンAPIアーキテクチャを採用しており、既存のERP・会計システム（SAP、MISA、Fast等）、POS、ECモール、物流システムと双方向でシームレスにデータ連携できます。",
      },
      {
        q: "システム導入にかかる期間の目安はどのくらいですか？",
        a: "プロジェクトの規模や契約モデルによって異なります。DXBizの業界別コアモジュールを活用する場合、最短2〜4週間で初期モジュールを本番稼働させることが可能です。大規模なフルスクラッチ開発の場合は、明確なマイルストーンに分けて段階的にリリースします。",
      },
      {
        q: "品質管理および情報セキュリティ（機密保持）はどのように担保されますか？",
        a: "ご相談段階から秘密保持契約（NDA）を締結いたします。システムにはロールベースアクセス制御（RBAC）、操作ログ監査（Audit Log）、データ暗号化を標準実装し、厳格なQAテストを経て納品します。",
      },
      {
        q: "本番リリース後の保守・運用サポート体制について教えてください。",
        a: "本番稼働後も専任のエンジニアチームが継続的にサポートいたします。障害対応やパフォーマンス監視に加え、事業拡大に合わせた機能追加・改修にも柔軟に対応します。",
      },
    ],
  };

  const deliverables = deliverablesByLocale[lang];
  const faqs = faqsByLocale[lang];

  const copy = {
    vi: {
      bannerTitle: "Mô hình Làm việc & Quy trình",
      bannerSub: "Chuẩn mực chất lượng, linh hoạt theo nhu cầu doanh nghiệp",
      home: "Trang chủ",
      deliverablesLabel: "KẾT QUẢ BÀN GIAO",
      advantageEyebrow: "GIÁ TRỊ KHÁC BIỆT",
      faqTitle: "Câu hỏi thường gặp",
    },
    en: {
      bannerTitle: "Working Models & Process",
      bannerSub: "Standardized quality, flexible engagement models",
      home: "Home",
      deliverablesLabel: "KEY DELIVERABLES",
      advantageEyebrow: "COMPETITIVE ADVANTAGE",
      faqTitle: "Frequently asked questions",
    },
    ja: {
      bannerTitle: "開発体制・導入プロセス",
      bannerSub: "国際標準の品質管理と、企業ニーズに合わせた柔軟な協業モデル",
      home: "ホーム",
      deliverablesLabel: "主な成果物",
      advantageEyebrow: "DXBizの優位性",
      faqTitle: "よくあるご質問",
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
          <span className="font-semibold text-white">{dict.nav.features}</span>
        </div>
      </section>

      {/* Part 1: 3 Working Models */}
      <section className="py-20 lg:py-28 bg-white border-b border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mb-14">
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0c48d8]">
              01 / {t.modelsTitle}
            </span>
            <h2 className="vnext-h2 mt-2">
              {t.modelsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {t.models.map((model, idx) => (
              <div
                key={model.name}
                className={`p-8 sm:p-10 rounded-[12px] border border-neutral-200 flex flex-col justify-between gap-10 ${
                  idx === 1 ? "bg-[#f6f7f9]" : "bg-white"
                }`}
              >
                <div>
                  <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#0c48d8]">
                    {model.badge}
                  </span>
                  <h3 className="font-headline text-[22px] sm:text-[24px] font-semibold text-[#1a1a1a] mt-2 mb-4">
                    {model.name}
                  </h3>
                  <p className="text-[15px] text-neutral-600 leading-relaxed">{model.desc}</p>
                </div>

                <div className="pt-5 border-t border-neutral-200 flex items-center justify-between gap-4">
                  <span className="text-[13px] font-medium text-neutral-500">{model.time}</span>
                  <ContactButton className="group inline-flex items-center gap-2 text-[14px] font-semibold text-[#0c48d8] hover:text-[#0835a6] transition-colors cursor-pointer">
                    <span>{dict.nav.contact}</span>
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
            ))}
          </div>
        </div>
      </section>

      {/* Part 2: 4-Stage Implementation Process */}
      <section className="py-20 lg:py-28 bg-[#f6f7f9] border-b border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mb-14">
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0c48d8]">
              02 / {t.roadmapTitle}
            </span>
            <h2 className="vnext-h2 mt-2">
              {t.roadmapTitle}
            </h2>
          </div>

          <div className="border-t border-neutral-300 divide-y divide-neutral-300">
            {t.items.map((item, idx) => (
              <div
                key={item.title}
                className="py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-3">
                  <span className="text-[13px] font-bold text-[#0c48d8]">
                    0{idx + 1} / {item.step}
                  </span>
                  <h3 className="font-headline text-[21px] font-semibold text-[#1a1a1a] mt-2">
                    {item.title}
                  </h3>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-[15px] text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="lg:col-span-4 bg-white rounded-[12px] border border-neutral-200 p-5">
                  <span className="block text-[11.5px] font-semibold uppercase tracking-[0.08em] text-neutral-400 mb-3">
                    {copy.deliverablesLabel}
                  </span>
                  <ul className="flex flex-col gap-2">
                    {(deliverables[idx] ?? []).map((d) => (
                      <li key={d} className="flex items-baseline gap-2.5 text-[13.5px] text-neutral-800">
                        <span className="text-[#0c48d8]">—</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part 3: Value Comparison */}
      <section className="py-20 lg:py-28 bg-white border-b border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-3xl mb-14">
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0c48d8]">
              03 / {copy.advantageEyebrow}
            </span>
            <h2 className="vnext-h2 mt-2">
              {t.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {t.comparison.map((col, idx) => (
              <div
                key={col.type}
                className={`p-8 sm:p-10 rounded-[12px] border border-neutral-200 flex flex-col justify-between ${
                  col.highlighted ? "bg-[#0b0d14] text-white border-[#0b0d14]" : "bg-white text-[#1a1a1a]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span
                      className={`text-[12px] font-semibold uppercase tracking-[0.08em] ${
                        col.highlighted ? "text-white/70" : "text-neutral-400"
                      }`}
                    >
                      0{idx + 1} / {col.verdict}
                    </span>
                  </div>

                  <h3
                    className={`font-headline text-[21px] sm:text-[23px] font-semibold mb-7 leading-snug ${
                      col.highlighted ? "text-white" : "text-[#1a1a1a]"
                    }`}
                  >
                    {col.type}
                  </h3>

                  <ul className="flex flex-col gap-4 border-t border-current/15 pt-6">
                    {col.points.map((pt) => (
                      <li key={pt} className="flex items-baseline gap-3 text-[14.5px] leading-relaxed">
                        <span className={col.highlighted ? "text-white" : "text-neutral-400"}>
                          —
                        </span>
                        <span className={col.highlighted ? "text-white/85" : "text-neutral-600"}>
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part 4: FAQ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0c48d8]">
              04 / FAQ
            </span>
            <h2 className="vnext-h2 mt-2">
              {copy.faqTitle}
            </h2>
          </div>

          <div className="lg:col-span-8">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      <CTA dict={dict} />
    </>
  );
}
