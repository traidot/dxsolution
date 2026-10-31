import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import ContactButton from "./ContactButton";

export default function Hero({ dict, lang = "vi" }: { dict: Dictionary; lang?: Locale }) {
  const t = dict.hero;

  const bottomLinksByLocale: Record<Locale, { label: string; href: string }[]> = {
    vi: [
      { label: "Phát triển Phần mềm", href: `/${lang}/solutions#core-software` },
      { label: "Giải pháp Doanh nghiệp & Tự động hóa", href: `/${lang}/solutions#core-software` },
      { label: "AI & Học máy", href: `/${lang}/solutions#ai-native` },
      { label: "Điện toán đám mây & DevOps", href: `/${lang}/solutions#core-software` },
      { label: "Hiện đại hóa hệ thống", href: `/${lang}/process` },
    ],
    en: [
      { label: "Software Development", href: `/${lang}/solutions#core-software` },
      { label: "Enterprise Solutions & Automation", href: `/${lang}/solutions#core-software` },
      { label: "AI & Machine Learning", href: `/${lang}/solutions#ai-native` },
      { label: "Cloud & DevOps", href: `/${lang}/solutions#core-software` },
      { label: "System Modernization", href: `/${lang}/process` },
    ],
    ja: [
      { label: "ソフトウェア開発", href: `/${lang}/solutions#core-software` },
      { label: "業務システム・自動化", href: `/${lang}/solutions#core-software` },
      { label: "AI・機械学習", href: `/${lang}/solutions#ai-native` },
      { label: "クラウド・DevOps", href: `/${lang}/solutions#core-software` },
      { label: "システムモダナイゼーション", href: `/${lang}/process` },
    ],
  };

  const heroTitleLight =
    lang === "vi" ? "Bước ngoặt" : lang === "ja" ? "ビジネス変革を牽引する" : "Breakthrough in";
  const heroTitleBold =
    lang === "vi"
      ? "chuyển đổi số"
      : lang === "ja"
        ? "デジタルトランスフォーメーション"
        : "digital transformation";

  const bottomLinks = bottomLinksByLocale[lang];

  return (
    <section className="relative min-h-[100dvh] bg-[#0b0d14] text-white flex flex-col justify-between overflow-hidden pt-[76px]">
      {/* Architectural dark backdrop — flat solid scrim, no gradient */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-[#0b0d14]/82" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-5 md:px-10 my-auto py-20 lg:py-28">
        <div className="max-w-4xl">
          <h1 className="mb-3">
            <span className="vnext-hero-title-light block">{heroTitleLight}</span>
            <span className="vnext-hero-title-bold text-white block mt-1">{heroTitleBold}</span>
          </h1>

          <p className="mt-4 mb-9 text-[17px] sm:text-[19px] font-light text-white/75 leading-[1.6] max-w-2xl">
            {t.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <ContactButton className="group h-12 px-6 rounded-[6px] bg-[#0c48d8] text-white text-[15px] font-medium inline-flex items-center gap-2.5 hover:bg-[#0835a6] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer">
              <span>{t.ctaPrimary}</span>
              <svg
                width="13"
                height="13"
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
            </ContactButton>

            <Link
              href={`/${lang}/solutions`}
              className="group h-12 px-6 rounded-[6px] bg-white/15 text-white text-[15px] font-medium inline-flex items-center gap-2.5 hover:bg-white/25 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <span>{t.ctaSecondary}</span>
              <svg
                width="13"
                height="13"
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
          </div>
        </div>
      </div>

      {/* Bottom Service Strip */}
      <div className="relative z-10 border-t border-white/10 bg-[#0b0d14]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {bottomLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative h-[64px] lg:h-[78px] px-5 flex items-center justify-center text-center text-[15px] lg:text-[16px] font-medium text-white/65 hover:text-white hover:bg-white/[0.04] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-[#0c48d8] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] origin-left" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
