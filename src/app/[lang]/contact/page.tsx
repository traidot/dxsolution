import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/i18n/dictionaries";
import CTA from "@/components/CTA";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  const slaStepsByLocale: Record<
    Locale,
    { code: string; title: string; desc: string }[]
  > = {
    vi: [
      {
        code: "01 / TIẾP NHẬN THÔNG TIN",
        title: "Phản hồi trong 24 giờ làm việc",
        desc: "Bộ phận tư vấn liên hệ xác nhận nhu cầu, lĩnh vực hoạt động và quy mô hệ thống của doanh nghiệp.",
      },
      {
        code: "02 / PHÂN TÍCH & TƯ VẤN",
        title: "Trao đổi cùng Chuyên gia Giải pháp",
        desc: "Đánh giá hiện trạng quy trình nghiệp vụ, phân tích bài toán kỹ thuật và định hướng kiến trúc hệ thống.",
      },
      {
        code: "03 / ĐỀ XUẤT GIẢI PHÁP",
        title: "Xây dựng Lộ trình & Dự toán",
        desc: "Bàn giao bản đề xuất giải pháp tổng thể, mô hình làm việc phù hợp và kế hoạch triển khai chi tiết.",
      },
    ],
    en: [
      {
        code: "01 / INITIAL INTAKE",
        title: "Response within 24 business hours",
        desc: "Our consulting team reaches out to confirm your requirements, industry vertical, and current system landscape.",
      },
      {
        code: "02 / CONSULTATION",
        title: "Discussion with Solution Architects",
        desc: "We review your operational workflows, technical requirements, and target architecture.",
      },
      {
        code: "03 / SOLUTION PROPOSAL",
        title: "Roadmap & Budget Estimation",
        desc: "Receive a structured solution proposal, recommended working model, and phased rollout schedule.",
      },
    ],
    ja: [
      {
        code: "01 / お問い合わせ受付",
        title: "1営業日（24時間）以内の初回ご連絡",
        desc: "担当コンサルタントよりご連絡し、貴社の業界、現状のシステム環境、およびご相談内容を確認いたします。",
      },
      {
        code: "02 / ヒアリング・技術相談",
        title: "ソリューションアーキテクトによる要件整理",
        desc: "現状の業務フローと技術的課題を分析し、最適なシステム構成と開発アプローチをご提案いたします。",
      },
      {
        code: "03 / ご提案・お見積り",
        title: "導入ロードマップと概算見積のご提示",
        desc: "システム構成案、推奨する契約・開発モデル、段階的な導入スケジュールおよびお見積書をご提示いたします。",
      },
    ],
  };

  const slaSteps = slaStepsByLocale[lang];
  const copy = {
    vi: {
      bannerTitle: "Liên hệ",
      bannerSub: "Đồng hành cùng đối tác công nghệ uy tín và đáng tin cậy",
      home: "Trang chủ",
    },
    en: {
      bannerTitle: "Contact Us",
      bannerSub: "Partner with a trusted technology provider",
      home: "Home",
    },
    ja: {
      bannerTitle: "お問い合わせ",
      bannerSub: "信頼できるテクノロジーパートナーとともにDXを推進",
      home: "ホーム",
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
          </div>

          {/* 3-Step Consultation Process Strip */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 rounded-[12px] overflow-hidden border border-white/15 divide-y md:divide-y-0 md:divide-x divide-white/15">
            {slaSteps.map((s) => (
              <div key={s.code} className="p-6 bg-white/[0.02]">
                <span className="text-[11.5px] font-semibold text-white/60">
                  {s.code}
                </span>
                <h2 className="font-headline text-[18px] font-semibold text-white mt-1.5 mb-1.5">
                  {s.title}
                </h2>
                <p className="text-[14px] font-light text-white/65 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-[1400px] w-full mx-auto px-5 md:px-10 pt-8 flex items-center justify-end gap-2 text-[14px] font-light text-white/60">
          <Link href={`/${lang}`} className="hover:text-white transition-colors">
            {copy.home}
          </Link>
          <span>/</span>
          <span className="font-semibold text-white">{dict.nav.contact}</span>
        </div>
      </section>

      <CTA dict={dict} />
    </>
  );
}
