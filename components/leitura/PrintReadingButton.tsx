"use client";

export default function PrintReadingButton() {
  function handlePrint() {
    window.print();
  }

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="print:hidden rounded-full bg-[#88B39A] px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#9fcaad]"
    >
      Imprimir / salvar em PDF
    </button>
  );
}