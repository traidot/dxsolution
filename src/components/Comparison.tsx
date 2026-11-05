import type { Dictionary, Locale } from "@/i18n/dictionaries";
import Reveal from "./Reveal";
import ContactButton from "./ContactButton";

export default function Comparison({ dict, lang = "vi" }: { dict: Dictionary; lang?: Locale }) {
  const t = dict.comparison;

  return (
    <section id="comparison" className="py-20 lg:py-28 bg-[#f6f7f9] border-y border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        {/* Section Header */}
        <Reveal className="max-w-3xl mb-14 lg:mb-20">
          <span className="text-[12px] font-mono font-bold text-[#0c48d8] tracking-[0.14em] uppercase block mb-3">
            {t.eyebrow}
          </span>
          <h2 className="vnext-h2">
            {lang === "vi" ? (
              <>
                Tại sao doanh nghiệp chọn{" "}
                <span className="font-bold text-[#0c48d8]">
                  giải pháp thiết kế chuyên biệt thay vì SaaS đóng hộp?
                </span>
              </>
            ) : lang === "ja" ? (
              <>
                なぜ先進企業は{" "}
                <span className="font-bold text-[#0c48d8]">
                  汎用SaaSではなくオーダーメイド基盤を選ぶのか？
                </span>
              </>
            ) : (
              <>
                Why choose{" "}
                <span className="font-bold text-[#0c48d8]">
                  bespoke software over generic SaaS?
                </span>
              </>
            )}
          </h2>
          <p className="mt-4 text-[16px] text-neutral-600 font-normal leading-relaxed">
            {t.subtitle}
          </p>
        </Reveal>

        {/* Comparison Table Grid - Sharp 6px & 4px */}
        <Reveal delay={80} className="overflow-x-auto">
          <div className="min-w-[760px] rounded-[6px] border border-neutral-300 bg-white shadow-xs overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 border-b border-neutral-200 bg-neutral-100/70 text-[13px] font-bold uppercase tracking-wider text-neutral-700">
              <div className="col-span-4 p-5 sm:p-6 border-r border-neutral-200 flex items-center">
                {t.columns.feature}
              </div>
              <div className="col-span-4 p-5 sm:p-6 border-r border-neutral-200 flex items-center text-neutral-500">
                {t.columns.saas}
              </div>
              <div className="col-span-4 p-5 sm:p-6 bg-[#0c48d8]/[0.04] text-[#0c48d8] flex items-center justify-between">
                <span>{t.columns.dxbiz}</span>
                <span className="text-[11px] font-mono font-bold bg-[#0c48d8] text-white px-2 py-0.5 rounded-[2px] uppercase">
                  CHUYÊN BIỆT
                </span>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-neutral-200">
              {t.rows.map((row, index) => (
                <div
                  key={row.title}
                  className="grid grid-cols-12 hover:bg-neutral-50/50 transition-colors duration-150"
                >
                  {/* Criteria */}
                  <div className="col-span-4 p-5 sm:p-6 border-r border-neutral-200 flex flex-col justify-center">
                    <span className="text-[11.5px] font-mono font-bold text-neutral-400 uppercase tracking-widest mb-1">
                      0{index + 1}
                    </span>
                    <h3 className="font-headline text-[15.5px] sm:text-[16px] font-bold text-[#1a1a1a]">
                      {row.title}
                    </h3>
                  </div>

                  {/* Generic SaaS */}
                  <div className="col-span-4 p-5 sm:p-6 border-r border-neutral-200 flex items-start gap-3 bg-neutral-50/30">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] bg-neutral-200 text-neutral-600 text-[10px] font-mono font-bold">
                      ✕
                    </span>
                    <p className="text-[13.5px] text-neutral-600 leading-relaxed">
                      {row.saas}
                    </p>
                  </div>

                  {/* DXBiz Tailored Software */}
                  <div className="col-span-4 p-5 sm:p-6 bg-[#0c48d8]/[0.02] flex items-start gap-3">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] bg-[#0c48d8] text-white text-[11px] font-mono font-bold shadow-xs">
                      ✓
                    </span>
                    <p className="text-[13.5px] text-[#1a1a1a] font-medium leading-relaxed">
                      {row.dxbiz}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Bottom Banner - Sharp 4px */}
        <Reveal delay={120} className="mt-12 p-6 sm:p-8 rounded-[4px] border border-neutral-300 bg-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-[4px] bg-[#0c48d8]/10 text-[#0c48d8] flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <div>
              <h4 className="font-headline text-[16px] font-bold text-[#1a1a1a]">
                {lang === "vi" ? "Cần khảo sát quy trình và thiết kế phần mềm chuyên biệt cho doanh nghiệp bạn?" : lang === "ja" ? "貴社専用の業務システム設計・個別ヒアリングをご希望ですか？" : "Need a custom operational workflow audit and bespoke software blueprint?"}
              </h4>
              <p className="text-[14px] text-neutral-500 mt-0.5">
                {lang === "vi" ? "Chuyên gia DXBiz sẽ trực tiếp trao đổi và đề xuất gói phân hệ chuẩn xác trong 24 giờ." : lang === "ja" ? "DXBizのソリューション専門家が24時間以内に直接ヒアリングし、最適な構成をご提案します。" : "DXBiz solution architects will audit your workflows and propose a tailored scope within 24h."}
              </p>
            </div>
          </div>
          <ContactButton className="inline-flex items-center justify-center px-5 py-2.5 bg-[#0c48d8] text-white rounded-[4px] font-semibold text-[13.5px] hover:bg-[#0835a6] transition-all duration-150 shrink-0 cursor-pointer shadow-xs">
            {lang === "vi" ? "Nhận tư vấn giải pháp chuyên biệt" : lang === "ja" ? "個別相談・お見積りを申し込む" : "Request Bespoke Consultation"}
          </ContactButton>
        </Reveal>
      </div>
    </section>
  );
}
