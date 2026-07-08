"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Story() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 20%"],
  });

  const layer1Opacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const layer2Opacity = useTransform(scrollYProgress, [0.18, 0.34], [0, 1]);
  const layer3Opacity = useTransform(scrollYProgress, [0.4, 0.56], [0, 1]);
  const layer4Opacity = useTransform(scrollYProgress, [0.62, 0.82], [0, 1]);

  const layer1Y = useTransform(scrollYProgress, [0, 0.12], [28, 0]);
  const layer2Y = useTransform(scrollYProgress, [0.18, 0.34], [28, 0]);
  const layer3Y = useTransform(scrollYProgress, [0.4, 0.56], [28, 0]);
  const layer4Y = useTransform(scrollYProgress, [0.62, 0.82], [28, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050705] py-20 text-[#F5F5F3] md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,rgba(190,170,110,0.18),transparent_34%)]" />

      <div className="relative mx-auto aspect-[9/16] w-full max-w-[430px] overflow-hidden md:max-w-[720px]">
        <Image
          src="/images/story-bg.png"
          alt=""
          fill
          priority
          className="object-cover"
        />

        <motion.div
          style={{ opacity: layer1Opacity, y: layer1Y }}
          className="absolute inset-0"
        >
          <Image
            src="/images/story-layer-01.png"
            alt="Existem histórias que se repetem"
            fill
            className="object-contain"
          />
        </motion.div>

        <motion.div
          style={{ opacity: layer2Opacity, y: layer2Y }}
          className="absolute inset-0"
        >
          <Image
            src="/images/story-layer-02.png"
            alt="Mudam os rostos"
            fill
            className="object-contain"
          />
        </motion.div>

        <motion.div
          style={{ opacity: layer3Opacity, y: layer3Y }}
          className="absolute inset-0"
        >
          <Image
            src="/images/story-layer-03.png"
            alt="Muda o cenário"
            fill
            className="object-contain"
          />
        </motion.div>

        <motion.div
          style={{ opacity: layer4Opacity, y: layer4Y }}
          className="absolute inset-0"
        >
          <Image
            src="/images/story-layer-04.png"
            alt="Mas algo continua acontecendo do mesmo jeito"
            fill
            className="object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}