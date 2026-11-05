import type { Dictionary, Locale } from "@/i18n/dictionaries";
import Reveal from "./Reveal";

export default function Features({ dict, lang = "vi" }: { dict: Dictionary; lang?: Locale }) {
  const t = dict.features;

  const statsTopByLocale: Record<Locale, { number: string; label: string }[]> = {
    vi: [
      { number: "100%", label: "Khớp chuẩn nghiệp vụ thực tế" },
      { number: "4 Nhóm", label: "Phân hệ nghiệp vụ chuyên sâu" },
      { number: "-65%", label: "Giảm thời gian xử lý tác vụ thủ công" },
      { number: "0 Phí ẩn", label: "Không giới hạn tài khoản nhân viên" },
    ],
    en: [
      { number: "100%", label: "Tailored around real workflows" },
      { number: "4 Pillars", label: "Specialized tailor-made business modules" },
      { number: "-65%", label: "Reduction in manual operational tasks" },
      { number: "0 Hidden Fees", label: "Unlimited employee user accounts" },
    ],
    ja: [
      { number: "100%", label: "現場プロセスへの完全適合" },
      { number: "4 大領域", label: "基幹業務を網羅する専用モジュール" },
      { number: "65%削減", label: "手作業・定型業務の工数削減" },
      { number: "追加費用0", label: "全社員が利用可能なライセンス体系" },
    ],
  };

  const statsBottomByLocale: Record<Locale, { number: string; label: string }[]> = {
    vi: [
      { number: "2–4 tuần", label: "Thời gian đưa phân hệ vào vận hành thực tế" },
      { number: "15+", label: "Nền tảng tích hợp dữ liệu mở hai chiều" },
      { number: "24/7", label: "Đồng hành hỗ trợ kỹ thuật và vận hành" },
    ],
    en: [
      { number: "2–4 wks", label: "Deployment lead time to live operations" },
      { number: "15+", label: "Two-way open API integrated platforms" },
      { number: "24/7", label: "Ongoing operational technical support" },
    ],
    ja: [
      { number: "2–4週間", label: "要件定義から実運用開始までのリードタイム" },
      { number: "15+", label: "双方向オープンAPI外部連携プラットフォーム" },
      { number: "24/7", label: "専任チームによる安心の運用・技術サポート" },
    ],
  };

  const statsTop = statsTopByLocale[lang] || statsTopByLocale.vi;
  const statsBottom = statsBottomByLocale[lang] || statsBottomByLocale.vi;

  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        {/* Part 1: "Con số tự chứng minh" — hairline grid, solid corporate typography */}
        <Reveal className="mb-20 lg:mb-28">
          <span className="text-[12px] font-mono font-bold text-[#0c48d8] tracking-[0.14em] uppercase block mb-3">
            {lang === "vi" ? "HIỆU QUẢ VẬN HÀNH" : lang === "ja" ? "運用実績とパフォーマンス" : "OPERATIONAL PERFORMANCE"}
          </span>
          <h2 className="vnext-h2 mb-12 lg:mb-16">
            {lang === "vi" ? (
              <>
                <span className="font-bold text-[#0c48d8]">Con số</span> tự chứng minh
              </>
            ) : lang === "ja" ? (
              <>
                実績を証明する<span className="font-bold text-[#0c48d8]">指標と数値</span>
              </>
            ) : (
              <>
                <span className="font-bold text-[#0c48d8]">Numbers</span> that speak for themselves
              </>
            )}
          </h2>

          <div className="border-t border-b border-neutral-200 bg-neutral-200">
            {/* Top 4 Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 mb-px">
              {statsTop.map((s) => (
                <div
                  key={s.label}
                  className="bg-white py-8 lg:py-11 px-6 lg:px-8 transition-colors duration-200 hover:bg-neutral-50/70"
                >
                  <div className="font-headline text-[34px] sm:text-[44px] lg:text-[48px] font-bold tracking-[-0.02em] text-[#1a1a1a] leading-none tabular-nums">
                    {s.number}
                  </div>
                  <div className="mt-3 text-[14px] text-neutral-500 font-normal leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom 3 Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200">
              {statsBottom.map((s) => (
                <div
                  key={s.label}
                  className="bg-white py-8 lg:py-11 px-6 md:px-8 transition-colors duration-200 hover:bg-neutral-50/70"
                >
                  <div className="font-headline text-[34px] sm:text-[44px] lg:text-[48px] font-bold tracking-[-0.02em] text-[#0c48d8] leading-none tabular-nums">
                    {s.number}
                  </div>
                  <div className="mt-3 text-[14px] text-neutral-500 font-normal leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Part 2: 3 Core Architecture Pillars - Sharp 4px */}
        <Reveal delay={90} className="mb-20">
          <div className="max-w-3xl mb-12">
            <span className="text-[12px] font-mono font-bold text-[#0c48d8] tracking-[0.14em] uppercase block mb-3">
              {t.eyebrow}
            </span>
            <h2 className="vnext-h2">{t.title}</h2>
            <p className="mt-4 text-[16px] text-neutral-600 font-normal leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.items.map((item, index) => (
              <div
                key={item.title}
                className="p-7 rounded-[4px] border border-neutral-300 bg-[#fbfcfd] hover:border-neutral-400 hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[12px] font-mono font-bold text-[#0c48d8] tracking-widest uppercase">
                    0{index + 1}
                  </span>
                  <h3 className="font-headline text-[17.5px] font-bold text-[#1a1a1a] mt-2.5 mb-2.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-neutral-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Part 3: Principles Box — Sharp 6px & 4px */}
        <Reveal delay={120}>
          <div className="p-8 sm:p-9 rounded-[6px] border border-neutral-200 bg-[#f6f7f9]">
            <div className="max-w-2xl mb-7">
              <h3 className="font-headline text-[19px] sm:text-[21px] font-bold text-[#1a1a1a]">
                {t.principles.title}
              </h3>
              <p className="text-[14.5px] text-neutral-600 mt-1.5 leading-relaxed">
                {t.principles.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {t.principles.list.map((p) => (
                <div
                  key={p.name}
                  className="p-4 rounded-[4px] border border-neutral-200 bg-white hover:border-[#0c48d8]/40 transition-colors duration-150"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#0c48d8]" />
                    <h4 className="font-headline text-[14.5px] font-bold text-[#1a1a1a]">
                      {p.name}
                    </h4>
                  </div>
                  <p className="text-[13px] text-neutral-500 leading-relaxed">
                    {p.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
