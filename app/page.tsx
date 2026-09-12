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

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <Mirror />
      <Stats />
      <Author />
      <Method />
      <Parts />
      <Example />
      <Steps />
      <Testimonials />
      <Quiz />
      <Pricing />
      <ForWhom />
      <Faq />
      <FinalCta />
      <Reveal />
    </main>
  );
}
