import vi from "./vi.json";
import en from "./en.json";
import ja from "./ja.json";

export const locales = ["vi", "en", "ja"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export type Dictionary = typeof vi;

const dictionaries: Record<Locale, Dictionary> = { vi, en, ja };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.vi;
}
