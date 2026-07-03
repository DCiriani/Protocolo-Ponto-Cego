import Container from "@/components/ui/Container";

export default function Navbar() {
  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <Container className="flex h-20 items-center justify-between">
        <a
          href="#inicio"
          className="group flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <span className="h-4 w-4 rounded-full border border-[#88B39A] transition group-hover:border-[#F5F5F3]" />

          <span className="text-[13px] font-semibold uppercase tracking-[0.28em] text-[#F5F5F3]">
            PONTO CEGO
          </span>
        </a>

        <a
          href="/checkout"
          className="hidden items-center gap-2 text-sm font-medium text-[#F5F5F3] transition hover:text-[#88B39A] sm:inline-flex"
        >
          Começar análise
          <span aria-hidden="true">→</span>
        </a>
      </Container>
    </header>
  );
}