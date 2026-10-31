import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";

const ECOSYSTEM_ITEMS = [
  { name: "SAPO", role: "POS & Omnichannel" },
  { name: "KIOTVIET", role: "Retail POS" },
  { name: "MISA AMIS", role: "ERP & Accounting" },
  { name: "GIAO HÀNG NHANH", role: "Logistics API" },
  { name: "VIETQR", role: "Payment Gateway" },
  { name: "ZALO OA / ZNS", role: "Customer Engagement" },
];

export default function Partners({ dict }: { dict: Dictionary }) {
  const isVi = dict.nav.switchLanguage === "Đổi ngôn ngữ";
  const lang = isVi ? "vi" : "en";

  return (
    <section id="partners" className="border-b border-neutral-200 bg-white">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-3 py-6 lg:py-8 lg:pr-8 lg:border-r border-b lg:border-b-0 border-neutral-200 flex flex-col justify-center">
          <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-500">
            {isVi ? "ĐƯỢC TIN CHỌN & LIÊN THÔNG" : "TRUSTED & INTEGRATED"}
          </span>
          <div className="font-headline text-[16px] font-bold text-[#1a1a1a] mt-1">
            {isVi ? "Hệ sinh thái phần mềm doanh nghiệp" : "Enterprise Software Ecosystem"}
          </div>
        </div>

        <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y lg:divide-y-0 divide-neutral-200">
          {ECOSYSTEM_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={`/${lang}/solutions#ecosystem`}
              className="group py-5 px-4 flex flex-col justify-center hover:bg-neutral-50 transition-colors"
            >
              <span className="font-headline text-[13.5px] font-bold tracking-[0.03em] text-neutral-800 group-hover:text-[#0c48d8] transition-colors">
                {item.name}
              </span>
              <span className="text-[12px] text-neutral-400 mt-0.5">{item.role}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
