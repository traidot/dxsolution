import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["vi", "en", "ja"] as const;
const defaultLocale = "vi";

function getLocale(request: NextRequest): string {
  const accept = request.headers.get("accept-language")?.toLowerCase() ?? "";
  if (accept.startsWith("ja")) return "ja";
  return accept.startsWith("en") ? "en" : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Run on everything except Next internals, API routes, and files with an extension.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
