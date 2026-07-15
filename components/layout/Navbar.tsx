import Container from "@/components/ui/Container";

export default function Navbar() {
  return (
    <header className="absolute left-0 top-0 z-50 w-full border-b border-white/10 bg-[#050705]/35 backdrop-blur-[2px]">
      <Container className="flex h-24 items-center justify-between">
        <a
          href="#inicio"
          className="font-satoshi text-[0.9rem] font-bold uppercase tracking-[0.58em] text-[#F5F5F3] transition-opacity hover:opacity-80"
        >
          Ponto Cego
        </a>

        <a
          href="/jornada"
          className="hidden rounded-[0.55rem] border border-[#88B39A]/45 px-6 py-3 font-satoshi text-sm font-semibold text-[#F5F5F3] transition hover:bg-[#88B39A]/10 md:inline-flex"
        >
          Quero minha análise
        </a>

        <a
          href="#comecar"
          aria-label="Abrir menu"
          className="flex h-12 w-12 items-center justify-center rounded-[0.45rem] border border-[#88B39A]/35 bg-black/20 text-[#F5F5F3] md:hidden"
        >
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