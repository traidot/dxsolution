"use client";

import { useState } from "react";

export interface FaqItem {
  q: string;
  a: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-t border-neutral-200 divide-y divide-neutral-200">
      {items.map((f, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={f.q} className="py-5 sm:py-6">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="group w-full text-left flex items-center justify-between gap-6 cursor-pointer"
            >
              <div className="flex items-baseline gap-4">
                <span
                  className={`text-[13px] font-bold tabular-nums transition-colors duration-300 ${
                    isOpen ? "text-[#0c48d8]" : "text-neutral-400 group-hover:text-[#0c48d8]"
                  }`}
                >
                  0{idx + 1}
                </span>
                <h3
                  className={`font-headline text-[18px] sm:text-[20px] font-semibold transition-colors duration-300 ${
                    isOpen ? "text-[#0c48d8]" : "text-[#1a1a1a] group-hover:text-[#0c48d8]"
                  }`}
                >
                  {f.q}
                </h3>
              </div>

              <span
                className={`shrink-0 w-9 h-9 rounded-[6px] border flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isOpen
                    ? "border-[#0c48d8] bg-[#0c48d8] text-white"
                    : "border-neutral-200 text-neutral-500 group-hover:border-[#0c48d8] group-hover:text-[#0c48d8]"
                }`}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className={`transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 4.5L6 8L9.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pt-3 pl-8 pr-6 text-[15px] text-neutral-600 leading-relaxed">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

