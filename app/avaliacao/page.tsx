import type { Metadata } from "next";
import Link from "next/link";
import Quiz from "@/components/landing/Quiz";
import Reveal from "@/components/landing/Reveal";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Avaliação preliminar · Ponto Cego",
  description:
    "Descubra em 5 perguntas qual padrão pode estar por trás das suas brigas, términos ou dificuldade em manter um relacionamento.",
};

export default function AvaliacaoPage() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          Ponto Cego<span>.</span>
        </Link>
      </header>

      <div className={styles.content}>
        <Quiz pricingHref="/#planos" />
      </div>

      <Reveal />
    </main>
  );
}
