"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

const phrases = [
  "Existem histórias que se repetem",
  "Mudam os rostos",
  "Muda o cenário",
  "Mas algo continua acontecendo do mesmo jeito",
];

export default function Story() {
  return (
    <section className="relative bg-[#0A0A0A]">
      {phrases.map((phrase) => (
        <div
          key={phrase}
          className="relative flex min-h-[18svh] items-center overflow-hidden border-t border-white/[0.04] md:min-h-[20svh]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(136,179,154,0.04),transparent_55%)]" />

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
              <h2 className="font-satoshi text-[2.65rem] font-semibold leading-[1.04] tracking-[-0.018em] text-[#F5F5F3] sm:text-[3.2rem] md:text-[clamp(3.4rem,6.5vw,6.8rem)]">
                {phrase}
              </h2>
            </motion.div>
          </Container>
        </div>
      ))}
    </section>
  );
}

