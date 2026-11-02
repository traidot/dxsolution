import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/dictionaries";

const ECOSYSTEM_ITEMS = [
  { name: "SAPO", role: "POS & Omnichannel" },
  { name: "KIOTVIET", role: "Retail POS" },
  { name: "MISA AMIS", role: "ERP & Accounting" },
  { name: "GIAO HÀNG NHANH", role: "Logistics API" },
  { name: "VIETQR", role: "Payment Gateway" },
  { name: "ZALO OA / ZNS", role: "Customer Engagement" },
];

export default function Partners({ dict: _dict, lang = "vi" }: { dict: Dictionary; lang?: Locale }) {
  const eyebrow =
    lang === "vi"
      ? "ĐƯỢC TIN CHỌN & LIÊN THÔNG"
      : lang === "ja"
        ? "連携・導入実績"
        : "TRUSTED & INTEGRATED";

  const title =
    lang === "vi"
      ? "Hệ sinh thái phần mềm doanh nghiệp"
      : lang === "ja"
        ? "主要エンタープライズ連携エコシステム"
        : "Enterprise Software Ecosystem";

  return (
    <section id="partners" className="border-b border-neutral-200 bg-white">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-3 py-6 lg:py-8 lg:pr-8 lg:border-r border-b lg:border-b-0 border-neutral-200 flex flex-col justify-center">
          <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-500">
            {eyebrow}
          </span>
          <div className="font-headline text-[16px] font-bold text-[#1a1a1a] mt-1">
            {title}
          </div>
        </div>

        <div className="lg:col-span-9 bg-neutral-200 gap-px grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 shadow-sm">
          {ECOSYSTEM_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={`/${lang}/solutions#ecosystem`}
              className="group py-5 px-4 flex flex-col justify-center bg-white hover:bg-neutral-50/90 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              <span className="font-headline text-[13.5px] font-bold tracking-[0.03em] text-neutral-800 group-hover:text-[#0c48d8] transition-colors duration-300">
                {item.name}
              </span>
              <span className="text-[12px] text-neutral-400 mt-0.5 group-hover:text-neutral-500 transition-colors duration-300">{item.role}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
