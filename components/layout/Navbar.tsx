import Container from "@/components/ui/Container";

export default function Navbar() {
  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <Container className="flex h-24 items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3 text-[#F5F5F3] transition-opacity hover:opacity-80">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C08552" strokeWidth="1.4" aria-hidden="true">
            <circle cx="12" cy="12" r="9.5" />
            <circle cx="12" cy="12" r="3.4" />
            <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" />
          </svg>
          <span className="text-[1.25rem] font-medium tracking-[-0.005em]" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
            Análise Ponto Cego
          </span>
        </a>

        <a href="/jornada" className="hidden rounded-[0.5rem] bg-[#7C8F6A] px-6 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-white transition hover:bg-[#67795A] md:inline-flex" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
          Quero minha análise
        </a>

        <a href="#comecar" aria-label="Abrir menu" className="flex h-12 w-12 items-center justify-center rounded-[0.45rem] border border-[#88B39A]/35 bg-black/20 text-[#F5F5F3] md:hidden">
          <span className="relative block h-5 w-6">
            <span className="absolute left-0 top-0 h-[2px] w-6 bg-[#F5F5F3]" />
            <span className="absolute left-0 top-1/2 h-[2px] w-6 -translate-y-1/2 bg-[#F5F5F3]" />
            <span className="absolute bottom-0 left-0 h-[2px] w-6 bg-[#F5F5F3]" />
          </span>
        </a>
      </Container>
    </header>
  );
}