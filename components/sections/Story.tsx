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
    offset: ["start 70%", "end 20%"],
  });

  // Blocos de texto: fade + sobe
  const b1 = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const b2 = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const b3 = useTransform(scrollYProgress, [0.42, 0.52], [0, 1]);
  const b4 = useTransform(scrollYProgress, [0.74, 0.86], [0, 1]);

  const y1 = useTransform(scrollYProgress, [0, 0.1], [24, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.3], [24, 0]);
  const y3 = useTransform(scrollYProgress, [0.42, 0.52], [24, 0]);
  const y4 = useTransform(scrollYProgress, [0.74, 0.86], [24, 0]);

  const circle = useTransform(scrollYProgress, [0, 0.1], [0, 0.6]);

  // Setas (shapes vetorizados da arte): revelação direcional via clip-path
  // seta1 aponta pra direita -> revela da esquerda pra direita
  const clip1 = useTransform(
    scrollYProgress,
    [0.11, 0.2],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );
  // seta2 desce e vira pra esquerda -> revela da direita pra esquerda
  const clip2 = useTransform(
    scrollYProgress,
    [0.31, 0.42],
    ["inset(0% 0% 0% 100%)", "inset(0% 0% 0% 0%)"]
  );
  // sublinhado "cenário" -> esquerda pra direita
  const clipU3 = useTransform(
    scrollYProgress,
    [0.53, 0.6],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );
  // seta3 desce -> revela de cima pra baixo
  const clip3 = useTransform(
    scrollYProgress,
    [0.6, 0.73],
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]
  );
  // sublinhado final -> esquerda pra direita
  const clipU4 = useTransform(
    scrollYProgress,
    [0.87, 1],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden py-20 md:py-28 ${cormorant.className}`}
      style={{ backgroundColor: BG }}
    >
      <div className="relative mx-auto w-full max-w-[430px] px-4 md:max-w-[560px]">
        <svg
          viewBox="0 0 380 676"
          className="w-full"
          aria-label="Existem histórias que se repetem. Mudam os rostos. Muda o cenário. Mas algo continua acontecendo do mesmo jeito."
        >
          <defs>
            <filter id="story-grain" x="0" y="0" width="100%" height="100%">
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
            <radialGradient id="story-glow" cx="8%" cy="4%" r="40%">
              <stop offset="0%" stopColor="#7a6543" stopOpacity="0.55" />
              <stop offset="45%" stopColor="#3a2f20" stopOpacity="0.18" />
              <stop offset="100%" stopColor={BG} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Fundo: carvão + glow dourado + grão */}
          <rect width="380" height="676" fill={BG} />
          <rect width="380" height="676" fill="url(#story-glow)" />
          <rect width="380" height="676" filter="url(#story-grain)" />

          {/* Círculo rascunhado */}
          <motion.g
            style={{ opacity: circle }}
            stroke="#45402d"
            fill="none"
            filter="url(#story-rough)"
            strokeLinecap="round"
          >
            <ellipse cx="116" cy="182" rx="90" ry="84" strokeWidth="1.4" />
            <ellipse
              cx="115"
              cy="184"
              rx="87"
              ry="80"
              strokeWidth="1.1"
              opacity="0.7"
              transform="rotate(-3 115 184)"
            />
            <ellipse
              cx="118"
              cy="181"
              rx="92"
              ry="82"
              strokeWidth="0.9"
              opacity="0.5"
              transform="rotate(2 118 181)"
            />
          </motion.g>

          {/* Bloco 1 */}
          <motion.g style={{ opacity: b1, y: y1 }}>
            <text x="56" y="168" fontSize="40" fontWeight="600" fill={CREAM}>
              Existem
            </text>
            <text x="56" y="205" fontSize="40" fontWeight="600" fill={CREAM}>
              histórias
            </text>
            <text
              x="58"
              y="230"
              fontSize="13.5"
              letterSpacing="2.6"
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
            <text x="262" y="185" fontSize="34" fontWeight="600" fill={CREAM}>
              Mudam
            </text>
            <text x="262" y="218" fontSize="34" fontWeight="600" fill={CREAM}>
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
            <text x="72" y="355" fontSize="34" fontWeight="600" fill={CREAM}>
              Muda o
            </text>
            <text x="72" y="388" fontSize="34" fontWeight="600" fill={CREAM}>
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
              y="502"
              fontSize="19"
              letterSpacing="0.3"
              fill={GOLD}
            >
              Mas algo continua acontecendo
            </text>
            <text
              x="36"
              y="546"
              fontSize="41"
              fontWeight="700"
              letterSpacing="1"
              fill={CREAM}
            >
              DO MESMO JEITO
            </text>
          </motion.g>

          {/* Sublinhado final (vetorizado da arte) */}
          <motion.g style={{ clipPath: clipU4 }} fill={GOLD}>
            <path d="M43.1 579.9 L41.6 579.7 L49.8 576.1 L60.8 572.7 L78.1 568.9 L104.3 565.1 L133.4 562.2 L155.4 560.9 L178.6 560.9 L187.7 562.0 L176.9 561.8 L176.1 562.6 L141.9 563.9 L112.7 566.8 L70.9 573.2 L43.1 579.9 Z" />
            <path d="M92.0 579.5 L89.7 579.3 L100.9 575.7 L121.6 571.1 L150.7 567.3 L201.0 566.4 L203.5 567.7 L228.4 568.5 L243.0 570.0 L218.3 568.9 L179.0 568.9 L156.2 570.6 L154.1 570.2 L119.5 574.4 L101.3 577.8 L98.0 577.8 L92.0 579.5 Z" />
            <path d="M188 562 Q265 558.5 340 564 L339.5 566.5 Q265 561.5 190 565 Z" />
          </motion.g>
        </svg>
      </div>
    </section>
  );
}
