import Container from "@/components/ui/Container";

export default function Navbar() {
  return (
    <header className="absolute left-0 top-0 z-50 w-full border-b border-white/10">
      <Container className="flex h-24 items-center justify-between">
        <a
          href="#inicio"
          className="group flex items-center gap-5 transition-opacity hover:opacity-80"
        >
          <span className="h-8 w-8 rounded-full border border-[#88B39A]" />

          <span className="font-satoshi text-[0.85rem] font-bold uppercase tracking-[0.55em] text-[#F5F5F3]">
            Ponto Cego
          </span>
        </a>

        <a
          href="/checkout"
          className="hidden font-satoshi text-sm font-semibold text-[#F5F5F3] transition hover:text-[#88B39A] md:inline-flex"
        >
          Começar análise →
        </a>

        <a
          href="#comecar"
          aria-label="Ir para começar"
          className="flex h-12 w-12 items-center justify-center md:hidden"
        >
          <span className="relative block h-5 w-8">
            <span className="absolute left-0 top-0 h-[2px] w-8 bg-[#88B39A]" />
            <span className="absolute left-0 top-1/2 h-[2px] w-8 -translate-y-1/2 bg-[#88B39A]" />
            <span className="absolute bottom-0 left-0 h-[2px] w-8 bg-[#88B39A]" />
          </span>
        </a>
      </Container>
    </header>
  );
}