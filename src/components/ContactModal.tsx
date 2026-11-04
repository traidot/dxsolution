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

  const handleClose = useCallback(() => {
    setStatus("idle");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

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
    "w-full h-11 rounded-[4px] border border-neutral-300 bg-white px-3.5 text-[14.5px] text-[#1a1a1a] placeholder:text-neutral-400 focus:border-[#0c48d8] focus:ring-2 focus:ring-[#0c48d8]/15 focus:outline-none transition-all duration-150";
  const labelClass = "block text-[13px] font-semibold text-neutral-800 mb-1.5";

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal={isOpen}
      aria-hidden={!isOpen}
      aria-label={dict.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content - Sharp 6px */}
      <div
        className={`relative w-full sm:max-w-lg max-h-[92dvh] overflow-y-auto bg-white rounded-t-[8px] sm:rounded-[6px] shadow-2xl p-6 sm:p-8 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-4 sm:scale-95"
        }`}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label={dict.close}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-[3px] text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[4px] bg-emerald-100 text-emerald-600 mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-headline text-[22px] font-bold text-[#1a1a1a]">
              {dict.successTitle}
            </h3>
            <p className="mt-2 text-[15px] text-neutral-600 leading-relaxed max-w-sm mx-auto">
              {dict.successDesc}
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-6 px-6 py-2.5 rounded-[4px] bg-[#0c48d8] text-white text-[14px] font-semibold hover:bg-[#0835a6] transition-colors cursor-pointer"
            >
              {dict.close}
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6 pr-8">
              <h3 className="font-headline text-[22px] font-bold text-[#1a1a1a]">
                {dict.title}
              </h3>
              <p className="mt-1.5 text-[14px] text-neutral-500 leading-relaxed">
                {dict.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="modal-name" className={labelClass}>
                  {dict.name} <span className="text-[#0c48d8]">*</span>
                </label>
                <input
                  id="modal-name"
                  name="name"
                  type="text"
                  required
                  placeholder={dict.namePlaceholder}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="modal-phone" className={labelClass}>
                  {dict.phone} <span className="text-[#0c48d8]">*</span>
                </label>
                <input
                  id="modal-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder={dict.phonePlaceholder}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="modal-company" className={labelClass}>
                  {dict.company} <span className="text-neutral-400 font-normal">({dict.optional})</span>
                </label>
                <input
                  id="modal-company"
                  name="company"
                  type="text"
                  placeholder={dict.companyPlaceholder}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="modal-message" className={labelClass}>
                  {dict.message} <span className="text-neutral-400 font-normal">({dict.optional})</span>
                </label>
                <textarea
                  id="modal-message"
                  name="message"
                  rows={3}
                  placeholder={dict.messagePlaceholder}
                  className="w-full rounded-[4px] border border-neutral-300 bg-white px-3.5 py-2.5 text-[14.5px] text-[#1a1a1a] placeholder:text-neutral-400 focus:border-[#0c48d8] focus:ring-2 focus:ring-[#0c48d8]/15 focus:outline-none transition-all duration-150"
                />
              </div>

              {/* Honeypot field */}
              <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

              {status === "error" && (
                <div className="rounded-[4px] bg-red-50 p-3 text-[13.5px] text-red-600 border border-red-200">
                  {dict.error}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full h-11 bg-[#0c48d8] text-white rounded-[4px] font-semibold text-[14.5px] hover:bg-[#0835a6] disabled:opacity-60 transition-all duration-150 shadow-xs cursor-pointer"
                >
                  {status === "sending" ? dict.submitting : dict.submit}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
