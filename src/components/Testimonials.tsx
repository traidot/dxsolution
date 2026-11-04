import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import Reveal from "./Reveal";
import ContactButton from "./ContactButton";

const CASE_IMAGES = [
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80",
];

const CASE_METRICS = ["-80% Đối soát", "100% Dòng tiền", "100% Bảo mật"];

export default function Testimonials({ dict, lang = "vi" }: { dict: Dictionary; lang?: Locale }) {
  const t = dict.testimonials;

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#0b0d14] text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Title & Overview */}
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="text-[12px] font-mono font-bold text-[#0c48d8] tracking-[0.14em] uppercase block mb-3">
              {t.eyebrow}
            </span>
            <h2 className="vnext-h2-dark">
              {lang === "vi" ? (
                <>
                  Năng lực triển khai{" "}
                  <span className="font-bold text-white">
                    được khách hàng công nhận
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
              <ContactButton className="group inline-flex items-center gap-3 text-[13.5px] font-semibold uppercase tracking-[0.08em] text-white hover:text-white/80 transition-colors duration-300 cursor-pointer">
                <span className="h-[1.5px] w-10 bg-[#0c48d8] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-14" />
                <span>{lang === "vi" ? "NHẬN TƯ VẤN TRIỂN KHAI" : "REQUEST CONSULTATION"}</span>
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
              </ContactButton>
            </div>
          </Reveal>

          {/* Right Column: Case / Testimonial Cards - Sharp 4px */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {t.items.map((item, index) => {
              const metricValue = CASE_METRICS[index] ?? "+40%";
              const imgUrl = CASE_IMAGES[index % CASE_IMAGES.length];

              return (
                <Reveal key={item.projectTitle || item.role} delay={index * 80}>
                  <div className="group block rounded-[4px] overflow-hidden border border-white/12 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.05] transition-all duration-300">
                    <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-900 relative">
                      <img
                        src={imgUrl}
                        alt={item.projectTitle || item.role}
                        className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d14] via-[#0b0d14]/40 to-transparent pointer-events-none" />

                      {/* Top Metric Badge - Sharp 2px */}
                      <div className="absolute top-4 right-4 px-2.5 py-1 rounded-[2px] bg-[#0c48d8] text-white font-mono text-[12px] font-bold shadow-xs">
                        {item.metricLabel || metricValue}
                      </div>

                      {/* Bottom Project Title */}
                      <div className="absolute bottom-4 left-5 right-5">
                        <span className="text-[11px] font-mono font-bold tracking-widest text-[#0c48d8] uppercase">
                          DỰ ÁN TRIỂN KHAI 0{index + 1}
                        </span>
                        <h4 className="font-headline text-[18px] sm:text-[20px] font-bold text-white mt-0.5">
                          {item.projectTitle}
                        </h4>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7">
                      <blockquote className="text-[15px] text-white/80 font-light leading-relaxed italic">
                        "{item.quote}"
                      </blockquote>

                      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[13px] text-white/50">
                        <span className="font-medium text-white/70">{item.role}</span>
                        <span className="flex items-center gap-1 text-amber-400 font-mono text-[11px]">
                          ★★★★★
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
