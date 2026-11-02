import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import Reveal from "./Reveal";

const CASE_IMAGES = [
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
];

const CASE_METRICS = ["+42%", "99.8%", "+50%"];

export default function Testimonials({ dict, lang = "vi" }: { dict: Dictionary; lang?: Locale }) {
  const t = dict.testimonials;
  const exploreProjectsLabel =
    lang === "vi"
      ? "KHÁM PHÁ CÁC DỰ ÁN"
      : lang === "ja"
        ? "導入実績をすべて見る"
        : "VIEW PROVEN TRACK RECORD";

  return (
    <section
      id="cases"
      className="py-20 lg:py-28 bg-[#0b0d14] text-white overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Sticky Column — solid white/blue text, no gradient */}
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28">
            <h2 className="vnext-h2-dark">
              {lang === "vi" ? (
                <>
                  Năng lực triển khai{" "}
                  <span className="font-bold text-white">
                    được khách hàng công nhận
                  </span>
                </>
              ) : lang === "ja" ? (
                <>
                  お客様に評価される{" "}
                  <span className="font-bold text-white">
                    確かなシステム実装力
                  </span>
                </>
              ) : (
                <>
                  Implementation capability{" "}
                  <span className="font-bold text-white">
                    recognized by clients
                  </span>
                </>
              )}
            </h2>

            <p className="mt-5 text-[15.5px] text-white/65 font-light leading-relaxed">
              {t.subtitle}
            </p>

            <div className="mt-10">
              <Link
                href={`/${lang}/cases`}
                className="group inline-flex items-center gap-3 text-[13.5px] font-semibold uppercase tracking-[0.08em] text-white hover:text-white/80 transition-colors duration-300"
              >
                <span className="h-[1.5px] w-10 bg-[#0c48d8] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-14" />
                <span>{exploreProjectsLabel}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
          </Reveal>

          {/* Right Column: Project Cards */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {t.items.map((item, index) => {
              const metricValue = CASE_METRICS[index] ?? "+40%";
              const imgUrl = CASE_IMAGES[index % CASE_IMAGES.length];

              return (
                <Reveal key={item.projectTitle} delay={index * 80}>
                  <Link
                    href={`/${lang}/cases`}
                    className="group block rounded-[12px] overflow-hidden border border-white/12 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.05] hover:-translate-y-0.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-900 relative">
                      <img
                        src={imgUrl}
                        alt={item.projectTitle}
                        className="w-full h-full object-cover opacity-85 group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                      <div className="absolute bottom-4 right-4 rounded-[6px] bg-[#0b0d14] border border-white/15 px-4 py-2 flex items-baseline gap-2.5">
                        <span className="font-headline text-[20px] font-bold text-white tabular-nums">
                          {metricValue}
                        </span>
                        <span className="text-[12px] text-white/75">{item.metricLabel}</span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8">
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 text-[12px] font-medium rounded-[6px] bg-white/10 text-white">
                            {item.domain}
                          </span>
                          <span className="px-3 py-1 text-[12px] rounded-[6px] text-white/70 border border-white/15">
                            {item.solutionTag}
                          </span>
                        </div>

                        <span className="shrink-0 w-9 h-9 rounded-[6px] border border-white/15 flex items-center justify-center text-white/60 group-hover:border-[#0c48d8] group-hover:bg-[#0c48d8] group-hover:text-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 14 14"
                            fill="none"
                            className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
                        </span>
                      </div>

                      <h3 className="font-headline text-[20px] sm:text-[22px] font-semibold text-white leading-snug mb-2.5">
                        {item.projectTitle}
                      </h3>

                      <p className="text-[14.5px] text-white/65 font-light leading-relaxed">
                        {item.quote}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
