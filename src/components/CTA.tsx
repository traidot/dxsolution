"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

type Status = "idle" | "sending" | "success" | "error";

export default function CTA({ dict }: { dict: Dictionary }) {
  const t = dict.cta;
  const c = dict.contact;
  const f = dict.footer;

  const [selectedServices, setSelectedServices] = useState<string[]>([t.services[0]]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>(t.industries[0]);
  const [status, setStatus] = useState<Status>("idle");

  function toggleService(service: string) {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());

    const prefix = [
      selectedServices.length > 0 ? `[Services: ${selectedServices.join(", ")}]` : "",
      selectedIndustry ? `[Industry: ${selectedIndustry}]` : "",
    ]
      .filter(Boolean)
      .join(" ");

    const userNote = typeof raw.message === "string" ? raw.message.trim() : "";
    const combinedMessage = [prefix, userNote].filter(Boolean).join(" — ");

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...raw,
          message: combinedMessage,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full h-11 rounded-[6px] border border-neutral-300 bg-white px-3.5 text-[14.5px] text-[#1a1a1a] placeholder:text-neutral-400 focus:border-[#0c48d8] focus:outline-none transition-colors";

  return (
    <section id="consultation" className="py-20 lg:py-28 bg-[#f6f7f9] border-t border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading + Direct Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="vnext-h2 font-bold">
                {t.title}
              </h2>
              <p className="mt-4 text-[17px] text-neutral-700 leading-relaxed font-normal">
                {t.subtitle}
              </p>
            </div>

            <div className="mt-10 border-t border-neutral-300 divide-y divide-neutral-300">
              <div className="py-5 flex items-start gap-4">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] bg-[#0c48d8]/10 text-[#0c48d8]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <div>
                  <span className="block text-[12px] font-semibold uppercase tracking-wider text-neutral-400">
                    {f.serviceOf}
                  </span>
                  <a
                    href="https://dxsolution.vn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-headline text-[16px] font-semibold text-[#1a1a1a] hover:text-[#0c48d8] transition-colors"
                  >
                    dxsolution.vn — DXS
                  </a>
                </div>
              </div>

              {t.commitments.map((item, idx) => (
                <div key={item.title} className="py-5 flex items-start gap-4">
                  <span className="text-[13px] font-bold text-[#0c48d8] mt-0.5 tabular-nums">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="font-headline text-[15.5px] font-semibold text-[#1a1a1a]">
                      {item.title}
                    </h3>
                    <p className="text-[14px] text-neutral-600 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Chip Selection Form — rounded-[12px] card + rounded-[6px] controls */}
          <div className="lg:col-span-7 bg-white rounded-[12px] border border-neutral-200 p-7 sm:p-10">
            {status === "success" ? (
              <div className="py-14 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-[6px] bg-[#0c48d8] text-white mb-4">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-headline text-[22px] font-semibold text-[#1a1a1a]">
                  {c.successTitle}
                </h3>
                <p className="mt-2 text-[15px] text-neutral-600 max-w-md mx-auto">
                  {c.successDesc}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 h-11 px-7 rounded-[6px] bg-[#0b0d14] text-white text-[14px] font-medium hover:bg-[#0c48d8] transition-colors cursor-pointer"
                >
                  {c.close}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* 1. Service Chips */}
                <div>
                  <label className="block font-headline text-[14px] font-semibold text-[#1a1a1a] mb-3">
                    {t.serviceLabel}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {t.services.map((service) => {
                      const active = selectedServices.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          aria-pressed={active}
                          className={`px-3.5 py-2 rounded-[6px] text-[13px] font-medium border transition-colors cursor-pointer ${
                            active
                              ? "bg-[#0c48d8] text-white border-[#0c48d8]"
                              : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-900"
                          }`}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Industry Domain Chips */}
                <div>
                  <label className="block font-headline text-[14px] font-semibold text-[#1a1a1a] mb-3">
                    {t.industryLabel}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {t.industries.map((ind) => {
                      const active = selectedIndustry === ind;
                      return (
                        <button
                          key={ind}
                          type="button"
                          onClick={() => setSelectedIndustry(ind)}
                          aria-pressed={active}
                          className={`px-3.5 py-2 rounded-[6px] text-[13px] font-medium border transition-colors cursor-pointer ${
                            active
                              ? "bg-[#0b0d14] text-white border-[#0b0d14]"
                              : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-900"
                          }`}
                        >
                          {ind}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label
                      htmlFor="cta-name"
                      className="block text-[13px] font-semibold text-neutral-800 mb-1.5"
                    >
                      {c.name} <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="cta-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder={c.namePlaceholder}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cta-phone"
                      className="block text-[13px] font-semibold text-neutral-800 mb-1.5"
                    >
                      {c.phone} <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="cta-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder={c.phonePlaceholder}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cta-company"
                    className="block text-[13px] font-semibold text-neutral-800 mb-1.5"
                  >
                    {c.company}{" "}
                    <span className="font-normal text-neutral-400">({c.optional})</span>
                  </label>
                  <input
                    id="cta-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder={c.companyPlaceholder}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="cta-message"
                    className="block text-[13px] font-semibold text-neutral-800 mb-1.5"
                  >
                    {c.message}{" "}
                    <span className="font-normal text-neutral-400">({c.optional})</span>
                  </label>
                  <textarea
                    id="cta-message"
                    name="message"
                    rows={3}
                    placeholder={c.messagePlaceholder}
                    className="w-full rounded-[6px] border border-neutral-300 bg-white p-3.5 text-[14.5px] text-[#1a1a1a] placeholder:text-neutral-400 focus:border-[#0c48d8] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <p role="alert" className="text-[13.5px] text-red-600">
                    {c.error}
                  </p>
                )}

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-[12.5px] text-neutral-500">{t.note}</span>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group h-12 px-7 rounded-[6px] bg-[#0c48d8] text-white text-[15px] font-medium flex items-center justify-center gap-2.5 hover:bg-[#0835a6] transition-colors disabled:opacity-60 cursor-pointer shrink-0"
                  >
                    <span>{status === "sending" ? c.submitting : c.submit}</span>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
