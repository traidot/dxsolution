import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/dictionaries";

export default function Features({ dict, lang = "vi" }: { dict: Dictionary; lang?: Locale }) {
  const t = dict.features;

  const statsTopByLocale: Record<Locale, { number: string; label: string }[]> = {
    vi: [
      { number: "10+", label: "Lĩnh vực ngành nghề chuyên sâu" },
      { number: "50+", label: "Dự án phần mềm & chuyển đổi số" },
      { number: "-65%", label: "Giảm thời gian xử lý thủ công" },
      { number: "99.8%", label: "Độ chính xác dữ liệu vận hành" },
    ],
    en: [
      { number: "10+", label: "Specialized industry verticals" },
      { number: "50+", label: "Software & DX projects delivered" },
      { number: "-65%", label: "Reduction in manual processing" },
      { number: "99.8%", label: "Operational data accuracy" },
    ],
    ja: [
      { number: "10+", label: "専門領域・対応業界" },
      { number: "50+", label: "システム開発・DX推進実績" },
      { number: "-65%", label: "手作業・管理工数の削減" },
      { number: "99.8%", label: "業務データの整合性・精度" },
    ],
  };

  const statsBottomByLocale: Record<Locale, { number: string; label: string }[]> = {
    vi: [
      { number: "2–4 tuần", label: "Thời gian đưa phân hệ vào vận hành" },
      { number: "15+", label: "Nền tảng tích hợp dữ liệu hai chiều" },
      { number: "24/7", label: "Hỗ trợ kỹ thuật & vận hành hệ thống" },
    ],
    en: [
      { number: "2–4 wks", label: "Time to launch core module" },
      { number: "15+", label: "Two-way integrated platforms" },
      { number: "24/7", label: "Technical & operations support" },
    ],
    ja: [
      { number: "2〜4週間", label: "コアモジュールの初期稼働期間" },
      { number: "15+", label: "双方向API連携プラットフォーム" },
      { number: "24/7", label: "技術サポート・システム監視体制" },
    ],
  };

  const statsTop = statsTopByLocale[lang];
  const statsBottom = statsBottomByLocale[lang];
  const viewProcessLabel =
    lang === "vi"
      ? "XEM QUY TRÌNH & MÔ HÌNH"
      : lang === "ja"
        ? "開発体制・プロセスを見る"
        : "VIEW PROCESS & MODELS";

  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        {/* Part 1: "Con số tự chứng minh" — solid color, no gradient */}
        <div className="mb-20 lg:mb-28">
          <h2 className="vnext-h2 mb-12 lg:mb-16">
            {lang === "vi" ? (
              <>
                <span className="font-bold text-[#0c48d8]">Con số</span> tự chứng minh
              </>
            ) : lang === "ja" ? (
              <>
                <span className="font-bold text-[#0c48d8]">数字</span>が証明する実績
              </>
            ) : (
              <>
                <span className="font-bold text-[#0c48d8]">Numbers</span> that speak for themselves
              </>
            )}
          </h2>

          <div className="border-t border-neutral-200">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200 border-b border-neutral-200">
              {statsTop.map((s) => (
                <div key={s.label} className="py-8 lg:py-11 lg:px-8 first:lg:pl-0 last:lg:pr-0">
                  <div className="font-headline text-[36px] sm:text-[46px] lg:text-[52px] font-bold tracking-[-0.02em] text-[#1a1a1a] leading-none tabular-nums">
                    {s.number}
                  </div>
                  <div className="mt-3 text-[15px] text-neutral-500 font-normal leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200 border-b border-neutral-200">
              {statsBottom.map((s) => (
                <div key={s.label} className="py-8 lg:py-11 md:px-8 first:md:pl-0 last:md:pr-0">
                  <div className="font-headline text-[36px] sm:text-[46px] lg:text-[52px] font-bold tracking-[-0.02em] text-[#0c48d8] leading-none tabular-nums">
                    {s.number}
                  </div>
                  <div className="mt-3 text-[15px] text-neutral-500 font-normal leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Part 2: Working Models */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <h3 className="vnext-h2">
              {lang === "vi" ? (
                <>
                  Mô hình <span className="font-bold text-[#0c48d8]">làm việc</span>
                </>
              ) : lang === "ja" ? (
                <>
                  柔軟な <span className="font-bold text-[#0c48d8]">開発・協業モデル</span>
                </>
              ) : (
                <>
                  Working <span className="font-bold text-[#0c48d8]">models</span>
                </>
              )}
            </h3>
            <p className="mt-4 text-[15.5px] text-neutral-600 font-normal leading-relaxed">
              {t.subtitle}
            </p>
            <div className="mt-8">
              <Link
                href={`/${lang}/process`}
                className="group inline-flex items-center gap-3 text-[13.5px] font-semibold uppercase tracking-[0.08em] text-[#1a1a1a] hover:text-[#0c48d8] transition-colors"
              >
                <span className="h-[1.5px] w-10 bg-[#0c48d8] transition-all duration-200 group-hover:w-14" />
                <span>{viewProcessLabel}</span>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 rounded-[12px] overflow-hidden border border-neutral-200 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
            {t.items.map((item, idx) => (
              <div
                key={item.title}
                className={`p-7 sm:p-8 flex flex-col justify-between gap-4 ${
                  idx >= 2 ? "sm:border-t sm:border-neutral-200" : ""
                }`}
              >
                <div>
                  <span className="text-[13px] font-medium text-[#0c48d8]">
                    {item.step}
                  </span>
                  <h4 className="font-headline text-[19px] font-semibold text-[#1a1a1a] mt-2 mb-2.5">
                    {item.title}
                  </h4>
                  <p className="text-[14.5px] text-neutral-500 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
