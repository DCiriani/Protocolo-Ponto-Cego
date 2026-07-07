import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import Story from "@/components/sections/Story";
import Why from "@/components/sections/Why";
import Process from "@/components/sections/Process";
import Transformations from "@/components/sections/Transformations";
import About from "@/components/sections/About";
import Receive from "@/components/sections/Receive";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050705] text-[#F5F5F3]">
      <Navbar />
      <Hero />
      <Story />
      <Why />
      <Process />
      <Transformations />
      <About />
      <Receive />
      <FAQ />
      <FinalCTA />
    </main>
  );
}