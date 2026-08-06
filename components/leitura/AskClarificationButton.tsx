"use client";

export default function AskClarificationButton() {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    document
      .getElementById("duvida")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <a
      href="#duvida"
      onClick={handleClick}
      className="rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-zinc-400 transition hover:border-[#88B39A]/40 hover:text-[#F5F5F3]"
    >
      Tirar dúvida
    </a>
  );
}
