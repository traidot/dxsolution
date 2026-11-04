import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/dictionaries";

const ECOSYSTEM_ITEMS = [
  { name: "SAPO", role: "POS & Bán lẻ" },
  { name: "MISA AMIS", role: "Kế toán & Thuế" },
  { name: "GHN", role: "Logistics API" },
  { name: "VIETQR", role: "Ngân hàng số & QR" },
  { name: "HĐ ĐIỆN TỬ", role: "VNPT / Viettel / MISA" },
  { name: "ZALO OA", role: "CSKH & Ký số" },
];

export default function Partners({ dict, lang = "vi" }: { dict: Dictionary; lang?: Locale }) {
  const t = dict.partners;
  const eyebrow = t.eyebrow || (lang === "vi" ? "ĐƯỢC TIN CHỌN & LIÊN THÔNG" : "TRUSTED & INTEGRATED");
  const title = t.title || (lang === "vi" ? "Hệ sinh thái liên thông doanh nghiệp" : "Enterprise Integration Ecosystem");

  return (
    <section id="partners" className="border-b border-neutral-200 bg-white">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Column: Heading */}
        <div className="lg:col-span-3 py-6 lg:py-8 lg:pr-8 lg:border-r border-b lg:border-b-0 border-neutral-200 flex flex-col justify-center">
          <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-500">
            {eyebrow}
          </span>
          <div className="font-headline text-[16px] font-bold text-[#1a1a1a] mt-1">
            {title}
          </div>
        </div>

        {/* Right Column: Hairline Grid */}
        <div className="lg:col-span-9 bg-neutral-200 gap-px grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 shadow-xs">
          {ECOSYSTEM_ITEMS.map((item) => (
            <Link
              key={item.name}
              href="#systems"
              className="group py-5 px-4 flex flex-col justify-center bg-white hover:bg-neutral-50/90 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              <span className="font-headline text-[13.5px] font-bold tracking-[0.03em] text-neutral-800 group-hover:text-[#0c48d8] transition-colors duration-300">
                {item.name}
              </span>
              <span className="text-[12px] text-neutral-400 mt-0.5 group-hover:text-neutral-500 transition-colors duration-300">
                {item.role}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
