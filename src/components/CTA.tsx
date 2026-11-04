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
      selectedServices.length > 0 ? `[Phân hệ: ${selectedServices.join(", ")}]` : "",
      selectedIndustry ? `[Ngành: ${selectedIndustry}]` : "",
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
    "w-full h-11 rounded-[4px] border border-neutral-300 bg-white px-3.5 text-[14.5px] text-[#1a1a1a] placeholder:text-neutral-400 focus:border-[#0c48d8] focus:ring-2 focus:ring-[#0c48d8]/15 focus:outline-none transition-all duration-150";

  return (
    <section id="consultation" className="py-20 lg:py-28 bg-[#f6f7f9] border-t border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading + Commitments + Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[12px] font-mono font-bold text-[#0c48d8] tracking-[0.14em] uppercase block mb-3">
                {t.eyebrow}
              </span>
              <h2 className="vnext-h2 font-bold text-balance">{t.title}</h2>
              <p className="mt-4 text-[16px] text-neutral-600 leading-relaxed font-normal">
                {t.subtitle}
              </p>
            </div>

            <div className="mt-10 border-t border-neutral-300 divide-y divide-neutral-300">
              <div className="py-5 flex items-start gap-4">
                <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-[3px] bg-[#0c48d8]/10 text-[#0c48d8]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <div>
                  <span className="block text-[11.5px] font-mono font-semibold uppercase tracking-wider text-neutral-400">
                    {f.serviceOf}
                  </span>
                  <a
                    href="https://dxsolution.vn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-headline text-[15.5px] font-semibold text-[#1a1a1a] hover:text-[#0c48d8] transition-colors"
                  >
                    dxsolution.vn — DXSolution
                  </a>
                </div>
              </div>

              {t.commitments.map((item, idx) => (
                <div key={item.title} className="py-5 flex items-start gap-4">
                  <span className="text-[12.5px] font-mono font-bold text-[#0c48d8] mt-0.5 tabular-nums">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="font-headline text-[15px] font-bold text-[#1a1a1a]">
                      {item.title}
                    </h3>
                    <p className="text-[13.5px] text-neutral-500 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Consultation Request Form */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-[6px] border border-neutral-300 shadow-xs">
            {status === "success" ? (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[4px] bg-emerald-100 text-emerald-600 mb-4">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-headline text-[22px] font-bold text-[#1a1a1a]">
                  {c.successTitle}
                </h3>
                <p className="mt-2 text-[15px] text-neutral-600 max-w-md mx-auto leading-relaxed">
                  {c.successDesc}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 inline-flex items-center justify-center px-6 py-2.5 rounded-[4px] border border-neutral-300 text-[14px] font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Multi-Select Modules of Interest */}
                <div>
                  <label className="block text-[12px] font-mono font-bold uppercase tracking-wider text-neutral-700 mb-2.5">
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
                          className={`text-[12.5px] font-medium px-3 py-1.5 rounded-[3px] border transition-all duration-150 cursor-pointer whitespace-nowrap ${
                            active
                              ? "bg-[#0c48d8] text-white border-[#0c48d8] shadow-xs"
                              : "bg-white text-neutral-600 border-neutral-300 hover:border-neutral-400 hover:text-neutral-900"
                          }`}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Industry Selector */}
                <div>
                  <label className="block text-[12px] font-mono font-bold uppercase tracking-wider text-neutral-700 mb-2.5">
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
                          className={`text-[12.5px] font-medium px-3 py-1.5 rounded-[3px] border transition-all duration-150 cursor-pointer whitespace-nowrap ${
                            active
                              ? "bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-xs"
                              : "bg-white text-neutral-600 border-neutral-300 hover:border-neutral-400 hover:text-neutral-900"
                          }`}
                        >
                          {ind}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Text Input Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label htmlFor="cta-name" className="block text-[13px] font-semibold text-neutral-700 mb-1.5">
                      {c.name} <span className="text-[#0c48d8]">*</span>
                    </label>
                    <input
                      id="cta-name"
                      name="name"
                      type="text"
                      required
                      placeholder={c.namePlaceholder}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="cta-phone" className="block text-[13px] font-semibold text-neutral-700 mb-1.5">
                      {c.phone} <span className="text-[#0c48d8]">*</span>
                    </label>
                    <input
                      id="cta-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder={c.phonePlaceholder}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cta-company" className="block text-[13px] font-semibold text-neutral-700 mb-1.5">
                    {c.company} <span className="text-neutral-400 font-normal">({c.optional})</span>
                  </label>
                  <input
                    id="cta-company"
                    name="company"
                    type="text"
                    placeholder={c.companyPlaceholder}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="cta-message" className="block text-[13px] font-semibold text-neutral-700 mb-1.5">
                    {c.message} <span className="text-neutral-400 font-normal">({c.optional})</span>
                  </label>
                  <textarea
                    id="cta-message"
                    name="message"
                    rows={3}
                    placeholder={c.messagePlaceholder}
                    className="w-full rounded-[4px] border border-neutral-300 bg-white px-3.5 py-2.5 text-[14.5px] text-[#1a1a1a] placeholder:text-neutral-400 focus:border-[#0c48d8] focus:ring-2 focus:ring-[#0c48d8]/15 focus:outline-none transition-all duration-150"
                  />
                </div>

                {/* Honeypot anti-spam field */}
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                {status === "error" && (
                  <div className="rounded-[4px] bg-red-50 p-3 text-[13.5px] text-red-600 border border-red-200">
                    {c.error}
                  </div>
                )}

                {/* Bottom Action Bar — With shrink-0 and whitespace-nowrap so button never breaks */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="whitespace-nowrap shrink-0 inline-flex items-center justify-center px-7 py-3 bg-[#0c48d8] text-white rounded-[4px] font-semibold text-[14px] hover:bg-[#0835a6] disabled:opacity-60 transition-all duration-150 shadow-xs cursor-pointer"
                  >
                    {status === "sending" ? c.submitting : t.primary}
                  </button>
                  <span className="text-[12.5px] text-neutral-500 leading-snug">
                    {t.note}
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
