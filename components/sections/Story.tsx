"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

const phrases = [
  "Existem histórias que se repetem.",
  "Mudam os rostos.",
  "Muda o cenário.",
  "O roteiro permanece.",
];

export default function Story() {
  return (
    <section className="relative bg-[#0A0A0A]">
      {phrases.map((phrase, index) => (
        <div
          key={phrase}
          className="relative flex min-h-[84svh] items-center overflow-hidden border-t border-white/[0.04] md:min-h-screen"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(136,179,154,0.08),transparent_38%)]" />

          <Container className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-5xl"
            >
              <span className="mb-8 block text-xs uppercase tracking-[0.35em] text-zinc-600 md:text-sm">
                0{index + 1}
              </span>

              <h2 className="text-[3.1rem] font-semibold leading-[0.95] tracking-[-0.07em] text-[#F5F5F3] sm:text-[3.8rem] md:text-[clamp(4rem,8vw,9rem)]">
                {phrase}
              </h2>
            </motion.div>
          </Container>
        </div>
      ))}
    </section>
  );
}