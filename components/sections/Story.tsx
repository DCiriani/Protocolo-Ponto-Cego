"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const GOLD = "#72704E";
const CREAM = "#DBD1BD";
const BG = "#0C0B0A";

export default function Story() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 45%"],
  });

  // Blocos de texto: fade + sobe (tudo termina em ~0.88 do progresso)
  const b1 = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const b2 = useTransform(scrollYProgress, [0.18, 0.28], [0, 1]);
  const b3 = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const b4 = useTransform(scrollYProgress, [0.66, 0.78], [0, 1]);

  const y1 = useTransform(scrollYProgress, [0, 0.1], [24, 0]);
  const y2 = useTransform(scrollYProgress, [0.18, 0.28], [24, 0]);
  const y3 = useTransform(scrollYProgress, [0.4, 0.5], [24, 0]);
  const y4 = useTransform(scrollYProgress, [0.66, 0.78], [24, 0]);

  const circle = useTransform(scrollYProgress, [0, 0.1], [0, 0.6]);

  // Setas: revelação direcional via clip-path
  const clip1 = useTransform(
    scrollYProgress,
    [0.1, 0.18],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );
  const clip2 = useTransform(
    scrollYProgress,
    [0.28, 0.4],
    ["inset(0% 0% 0% 100%)", "inset(0% 0% 0% 0%)"]
  );
  const clipU3 = useTransform(
    scrollYProgress,
    [0.5, 0.56],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );
  const clip3 = useTransform(
    scrollYProgress,
    [0.56, 0.66],
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]
  );
  const clipU4 = useTransform(
    scrollYProgress,
    [0.78, 0.88],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden pt-4 pb-6 md:pt-6 md:pb-8 ${cormorant.className}`}
      style={{
        backgroundColor: BG,
        backgroundImage:
  "radial-gradient(circle at 6% 0%, rgba(122,101,67,0.06), rgba(58,47,32,0.025) 25%, transparent 42%)",
      }}
    >
      {/* Grão cobrindo a seção inteira (sem emenda com o conteúdo) */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <filter id="story-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="4"
            stitchTiles="stitch"
            result="n"
          />
          <feColorMatrix
            in="n"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.12 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#story-grain)" />
      </svg>

      <div className="relative mx-auto w-full max-w-[430px] px-4 md:max-w-[540px]">
        <svg
          viewBox="0 70 380 520"
          className="w-full"
          aria-label="Existem histórias que se repetem. Mudam os rostos. Muda o cenário. Mas algo continua acontecendo do mesmo jeito."
        >
          <defs>
            <filter id="story-rough">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.015"
                numOctaves="2"
                seed="9"
                result="n"
              />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="1.5" />
            </filter>
          </defs>

          {/* Círculo rascunhado */}
          <motion.g
  style={{ opacity: circle }}
  stroke="#45402d"
  fill="none"
  filter="url(#story-rough)"
  strokeLinecap="round"
>
  <ellipse cx="102" cy="184" rx="98" ry="88" strokeWidth="1.4" />
  <ellipse
    cx="101"
    cy="186"
    rx="94"
    ry="84"
    strokeWidth="1.1"
    opacity="0.7"
    transform="rotate(-3 101 186)"
  />
  <ellipse
    cx="104"
    cy="183"
    rx="100"
    ry="86"
    strokeWidth="0.9"
    opacity="0.5"
    transform="rotate(2 104 183)"
  />
</motion.g>

          {/* Bloco 1 (menor, todo dentro do círculo) */}
          <motion.g style={{ opacity: b1, y: y1 }}>
  <text x="42" y="164" fontSize="39" fontWeight="600" fill={CREAM}>
    Existem
  </text>
  <text x="39" y="201" fontSize="39" fontWeight="600" fill={CREAM}>
    histórias
  </text>
  <text
    x="38"
    y="230"
    fontSize="14"
    letterSpacing="2.2"
    fontWeight="600"
    fill={GOLD}
  >
    QUE SE REPETEM
  </text>
</motion.g>

          {/* Seta 1 (vetorizada da arte) */}
          <motion.path
            style={{ clipPath: clip1 }}
            fill={GOLD}
            d="M234.8 200.8 L233.9 200.8 L232.9 198.9 L241.3 190.8 L240.2 189.8 L207.7 189.4 L206.7 188.3 L210.7 186.4 L228.0 186.0 L229.3 186.8 L240.7 186.8 L241.7 185.8 L232.9 178.6 L233.1 177.5 L234.8 176.7 L245.7 184.7 L248.1 187.9 L247.0 190.6 L243.2 192.7 L234.8 200.8 Z"
          />

          {/* Bloco 2 */}
          <motion.g style={{ opacity: b2, y: y2 }}>
            <text x="256" y="183" fontSize="30" fontWeight="600" fill={CREAM}>
              Mudam
            </text>
            <text x="256" y="213" fontSize="30" fontWeight="600" fill={CREAM}>
              os rostos
            </text>
          </motion.g>

          {/* Seta 2: desce e vira à esquerda (vetorizada da arte) */}
          <motion.path
            style={{ clipPath: clip2 }}
            fill={GOLD}
            d="M206.5 359.1 L192.3 348.3 L193.0 345.6 L206.0 335.5 L207.9 336.5 L207.5 337.8 L199.5 344.5 L200.6 345.6 L292.2 345.6 L300.2 342.6 L302.9 339.9 L306.3 332.7 L307.2 326.4 L307.2 239.4 L308.6 238.3 L309.7 243.2 L310.1 256.7 L310.1 317.5 L308.9 333.1 L307.2 338.2 L304.2 342.4 L298.1 346.9 L293.9 348.1 L292.6 347.7 L285.0 349.0 L200.1 349.0 L199.1 350.0 L207.5 356.8 L207.5 358.0 L206.5 359.1 Z"
          />

          {/* Bloco 3 */}
          <motion.g style={{ opacity: b3, y: y3 }}>
            <text x="72" y="352" fontSize="32" fontWeight="600" fill={CREAM}>
              Muda o
            </text>
            <text x="72" y="384" fontSize="32" fontWeight="600" fill={CREAM}>
              cenário
            </text>
          </motion.g>

          {/* Sublinhado "cenário" (vetorizado da arte) */}
          <motion.g style={{ clipPath: clipU3 }} fill={GOLD}>
            <path d="M87.0 403.9 L77.7 403.9 L77.5 402.8 L86.1 402.2 L92.5 400.5 L125.4 397.9 L161.9 398.2 L149.5 398.8 L148.2 400.1 L130.9 400.5 L87.0 403.9 Z" />
            <path d="M76 399 Q118 393.5 160 396.5 L160 398 Q118 395.5 76 401 Z" />
          </motion.g>

          {/* Seta 3: desce (vetorizada da arte) */}
          <motion.path
            style={{ clipPath: clip3 }}
            fill={GOLD}
            d="M122.4 466.3 L119.9 465.9 L118.4 463.2 L109.6 453.9 L109.6 452.2 L111.0 451.6 L119.1 460.0 L120.1 459.0 L120.1 415.5 L121.2 414.0 L121.8 419.3 L123.1 422.2 L123.1 459.0 L124.1 460.0 L131.3 452.0 L132.6 452.0 L133.2 453.5 L124.3 464.9 L122.4 466.3 Z"
          />

          {/* Bloco 4 */}
          <motion.g style={{ opacity: b4, y: y4 }}>
            <text
              x="68"
              y="500"
              fontSize="19"
              letterSpacing="0.3"
              fill={GOLD}
            >
              Mas algo continua acontecendo
            </text>
            <text
              x="38"
              y="544"
              fontSize="40"
              fontWeight="700"
              letterSpacing="1"
              fill={CREAM}
            >
              DO MESMO JEITO
            </text>
          </motion.g>

          {/* Sublinhado final: traço único contínuo (estilo do de "cenário") */}
          <motion.g style={{ clipPath: clipU4 }} fill={GOLD}>
            <path d="M40 567 Q118 559 196 561.5 Q272 563 344 566 L343.6 568.8 Q272 565.8 196 564.3 Q118 561.8 41 569.8 Z" />
            <path d="M52 573.5 Q150 566.5 250 569 L249.7 570.8 Q150 568.3 53 575.2 Z" />
          </motion.g>
        </svg>
      </div>
    </section>
  );
}
