"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const storyImages = [
  {
    src: "/images/story-01.png",
    alt: "Existem histórias que se repetem",
    position: "object-[52%_center]",
  },
  {
    src: "/images/story-02.png",
    alt: "Mudam os rostos",
    position: "object-[55%_center]",
  },
  {
    src: "/images/story-03.png",
    alt: "Muda o cenário",
    position: "object-[42%_center]",
  },
  {
    src: "/images/story-04.png",
    alt: "Mas algo continua acontecendo do mesmo jeito",
    position: "object-[50%_center]",
  },
];

export default function Story() {
  return (
    <section className="relative overflow-hidden bg-[#050705] text-[#F5F5F3]">
      {storyImages.map((image, index) => (
        <motion.div
          key={image.src}
          initial={{ opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.05,
          }}
          className="relative min-h-[68svh] overflow-hidden md:min-h-[82svh]"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className={`object-cover ${image.position}`}
            priority={index === 0}
          />

          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050705] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050705] to-transparent" />
        </motion.div>
      ))}
    </section>
  );
}