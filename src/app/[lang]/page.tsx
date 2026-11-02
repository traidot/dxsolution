import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Products from "@/components/Products";
import Solutions from "@/components/Solutions";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <Hero dict={dict} lang={lang} />
      <Partners dict={dict} lang={lang} />
      <Products dict={dict} lang={lang} />
      <Solutions dict={dict} lang={lang} />
      <Features dict={dict} lang={lang} />
      <Testimonials dict={dict} lang={lang} />
      <CTA dict={dict} />
    </>
  );
}
