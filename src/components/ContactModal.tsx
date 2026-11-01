"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Dictionary } from "@/i18n/dictionaries";

type ContactDict = Dictionary["contact"];
type Status = "idle" | "sending" | "success" | "error";

const ContactContext = createContext<{ open: () => void } | null>(null);

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact must be used within ContactProvider");
  return ctx;
}

export function ContactProvider({
  dict,
  children,
}: {
  dict: ContactDict;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ContactContext.Provider value={{ open }}>
      {children}
      <ContactModal dict={dict} isOpen={isOpen} onClose={close} />
    </ContactContext.Provider>
  );
}

function ContactModal({
  dict,
  isOpen,
  onClose,
}: {
  dict: ContactDict;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!isOpen) return;
    setStatus("idle");
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full h-11 rounded-[6px] border border-neutral-300 bg-white px-3.5 text-[14.5px] text-[#1a1a1a] placeholder:text-neutral-400 focus:border-[#0c48d8] focus:outline-none transition-colors duration-200";
  const labelClass = "block text-[13px] font-semibold text-neutral-800 mb-1.5";

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal={isOpen}
      aria-hidden={!isOpen}
      aria-label={dict.title}
    >
      <div
        className="absolute inset-0 bg-neutral-950/60 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`relative w-full sm:max-w-lg max-h-[92dvh] overflow-y-auto bg-white rounded-t-[12px] sm:rounded-[12px] border border-neutral-200 shadow-2xl p-7 sm:p-10 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-3 scale-[0.98]"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          tabIndex={isOpen ? 0 : -1}
          aria-label={dict.close}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-[6px] text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="flex flex-col items-center text-center gap-4 py-10">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-[6px] bg-[#0c48d8] text-white">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="font-headline text-[22px] font-semibold text-[#1a1a1a]">
              {dict.successTitle}
            </h2>
            <p className="text-[15px] text-neutral-600 max-w-sm">{dict.successDesc}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 h-11 px-8 rounded-[6px] bg-[#0b0d14] text-white text-[14px] font-medium hover:bg-[#0c48d8] transition-colors cursor-pointer"
            >
              {dict.close}
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-headline text-[24px] font-semibold text-[#1a1a1a] mb-2 pr-8">
              {dict.title}
            </h2>
            <p className="text-[14.5px] text-neutral-600 mb-7 leading-relaxed">{dict.subtitle}</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div>
                <label htmlFor="contact-name" className={labelClass}>
                  {dict.name} <span className="text-red-600">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  tabIndex={isOpen ? 0 : -1}
                  autoComplete="name"
                  placeholder={dict.namePlaceholder}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className={labelClass}>
                  {dict.phone} <span className="text-red-600">*</span>
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  required
                  tabIndex={isOpen ? 0 : -1}
                  autoComplete="tel"
                  placeholder={dict.phonePlaceholder}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="contact-company" className={labelClass}>
                  {dict.company}{" "}
                  <span className="font-normal text-neutral-400">({dict.optional})</span>
                </label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  tabIndex={isOpen ? 0 : -1}
                  autoComplete="organization"
                  placeholder={dict.companyPlaceholder}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className={labelClass}>
                  {dict.message}{" "}
                  <span className="font-normal text-neutral-400">({dict.optional})</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={3}
                  tabIndex={isOpen ? 0 : -1}
                  placeholder={dict.messagePlaceholder}
                  className="w-full rounded-[6px] border border-neutral-300 bg-white p-3.5 text-[14.5px] text-[#1a1a1a] placeholder:text-neutral-400 focus:border-[#0c48d8] focus:outline-none transition-colors duration-200 resize-none"
                />
              </div>

              {status === "error" && (
                <p role="alert" className="text-[13.5px] text-red-600">
                  {dict.error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                tabIndex={isOpen ? 0 : -1}
                className="mt-2 w-full h-12 rounded-[6px] bg-[#0c48d8] text-white text-[15px] font-medium hover:bg-[#0835a6] transition-colors duration-300 disabled:opacity-60 cursor-pointer"
              >
                {status === "sending" ? dict.submitting : dict.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
