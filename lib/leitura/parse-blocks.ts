export type Block =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "paragraph"; text: string };

// Transforma o texto em Markdown leve numa lista de blocos
export function parseBlocks(raw: string): Block[] {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];

  let listBuffer: string[] = [];
  let paragraphBuffer: string[] = [];

  function flushList() {
    if (listBuffer.length > 0) {
      blocks.push({ type: "list", items: listBuffer });
      listBuffer = [];
    }
  }

  function flushParagraph() {
    if (paragraphBuffer.length > 0) {
      blocks.push({ type: "paragraph", text: paragraphBuffer.join(" ") });
      paragraphBuffer = [];
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line === "") {
      flushList();
      flushParagraph();
      continue;
    }

    if (line.startsWith("### ")) {
      flushList();
      flushParagraph();
      blocks.push({ type: "h3", text: line.slice(4) });
    } else if (line.startsWith("## ")) {
      flushList();
      flushParagraph();
      blocks.push({ type: "h2", text: line.slice(3) });
    } else if (line.startsWith("# ")) {
      flushList();
      flushParagraph();
      blocks.push({ type: "h1", text: line.slice(2) });
    } else if (line.startsWith("> ")) {
      flushList();
      flushParagraph();
      blocks.push({ type: "quote", text: line.slice(2) });
    } else if (line.startsWith("- ")) {
      flushParagraph();
      listBuffer.push(line.slice(2));
    } else {
      flushList();
      paragraphBuffer.push(line);
    }
  }

  flushList();
  flushParagraph();

  return blocks;
}

// Converte **negrito** numa lista de segmentos (para renderização)
export function parseInline(text: string): { text: string; bold: boolean }[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter((p) => p !== "");
  return parts.map((part) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return { text: part.slice(2, -2), bold: true };
    }
    return { text: part, bold: false };
  });
}