import type { Metadata } from "next";
import { Be_Vietnam_Pro, Poppins, JetBrains_Mono, Plus_Jakarta_Sans, Noto_Sans_JP } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary, hasLocale, locales } from "@/i18n/dictionaries";
import { ContactProvider } from "@/components/ContactModal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-jp",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-brand",
  weight: ["700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={`light ${beVietnamPro.variable} ${notoSansJP.variable} ${poppins.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="bg-white text-[#1a1a1a] selection:bg-[#0c48d8]/15 min-h-full flex flex-col">
        <ContactProvider dict={dict.contact}>
          <Header nav={dict.nav} lang={lang} />
          <main className="flex-1 page-enter">{children}</main>
          <Footer dict={dict} lang={lang} />
        </ContactProvider>
      </body>
    </html>
  );
}
