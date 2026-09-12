"use client";

import { useEffect } from "react";

/**
 * Ativa a animação reveal-on-scroll em qualquer elemento com a classe `reveal`
 * (do tokens.module.css). Basta montar uma vez na página.
 */
export default function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
