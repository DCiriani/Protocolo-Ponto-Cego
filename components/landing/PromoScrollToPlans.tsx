"use client";

import { useEffect } from "react";

export default function PromoScrollToPlans() {
  useEffect(() => {
    const section = document.getElementById("planos");

    if (!section) return;

    const nextUrl = `${window.location.pathname}${window.location.search}#planos`;
    window.history.replaceState(null, "", nextUrl);

    requestAnimationFrame(() => {
      section.scrollIntoView({ block: "start" });
    });
  }, []);

  return null;
}
