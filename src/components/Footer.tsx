import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/dictionaries";

const GROUP_PATHS = ["solutions", "industries", "process"];

export default function Footer({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const t = dict.footer;
  const companyLabel = lang === "vi" ? "DXS Việt Nam" : "DXS Vietnam";

  return (
    <footer className="w-full bg-[#090d16] text-white border-t border-white/10">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 py-16 px-5 md:px-10 max-w-[1400px] mx-auto">
        <div className="col-span-2 flex flex-col gap-4 max-w-sm">
          <Link href={`/${lang}`} className="flex items-center gap-3" aria-label={dict.nav.home}>
            <Image src="/dxs-mark.svg" alt="" width={34} height={34} className="h-8 w-8" />
            <span className="font-headline text-[22px] leading-none font-extrabold tracking-tight">
              <span className="text-[#4d8dff]">DX</span>
              <span className="text-white">S</span>
            </span>
          </Link>
          <p className="font-headline text-[14px] font-semibold text-white/90">{t.slogan}</p>
          <p className="text-[14px] text-white/55 leading-relaxed">{t.tagline}</p>
          <p className="text-[13.5px] text-white/55 pt-1">
            {t.serviceOf}:{" "}
            <a
              href="https://dxsolution.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-headline font-semibold text-white hover:text-[#4d8dff] transition-colors"
            >
              {companyLabel}
            </a>
          </p>
        </div>

        {t.groups.map((group, idx) => {
          const subpath = GROUP_PATHS[idx] ?? "contact";
          const href = `/${lang}/${subpath}`;
          return (
            <div key={group.title}>
              <h4 className="font-headline text-[12px] font-bold uppercase tracking-[0.14em] text-white/45 mb-5">
                {group.title}
              </h4>
              <div className="flex flex-col gap-3">
                {group.links.map((label) => (
                  <Link
                    key={label}
                    href={href}
                    className="text-[14px] text-white/70 hover:text-white transition-colors w-fit"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 px-5 md:px-10 max-w-[1400px] mx-auto">
          <p className="text-[13px] text-white/45">{t.copyright}</p>
          <div className="flex items-center gap-6">
            <Link
              href={`/${lang}/contact`}
              className="text-[13px] text-white/60 hover:text-white transition-colors"
            >
              {dict.nav.contact}
            </Link>
            <a
              href="https://dxsolution.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-white/55 hover:text-white transition-colors"
            >
              dxsolution.vn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
