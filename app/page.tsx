import SiteHeader from "@/components/landing/SiteHeader";
import Hero from "@/components/landing/Hero";
import Mirror from "@/components/landing/Mirror";
import Stats from "@/components/landing/Stats";
import Author from "@/components/landing/Author";
import Method from "@/components/landing/Method";
import Parts from "@/components/landing/Parts";
import Example from "@/components/landing/Example";
import Steps from "@/components/landing/Steps";
import Testimonials from "@/components/landing/Testimonials";
import Quiz from "@/components/landing/Quiz";
import Pricing from "@/components/landing/Pricing";
import ForWhom from "@/components/landing/ForWhom";
import Faq from "@/components/landing/Faq";
import FinalCta from "@/components/landing/FinalCta";
import Reveal from "@/components/landing/Reveal";
import { isPonto20Coupon } from "@/lib/promotions";

type HomeProps = {
  searchParams: Promise<{
    cupom?: string | string[];
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const couponValue = Array.isArray(params.cupom)
    ? params.cupom[0]
    : params.cupom;
  const promoActive = isPonto20Coupon(couponValue);

  return (
    <main>
      <SiteHeader />
      <Hero promoActive={promoActive} />
      <Mirror />
      <Stats />
      <Author />
      <Method />
      <Parts />
      <Example />
      <Steps />
      <Testimonials />
      <Quiz />
      <Pricing promoActive={promoActive} />
      <ForWhom />
      <Faq />
      <FinalCta promoActive={promoActive} />
      <Reveal />
    </main>
  );
}
