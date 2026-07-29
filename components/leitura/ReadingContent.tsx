import { Fragment } from "react";

type Block =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "paragraph"; text: string };

// Converte **negrito** em <strong>, preservando o resto do texto
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-[#F5F5F3] print:text-black">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

// Transforma o texto em Markdown leve numa lista de blocos
function parseBlocks(raw: string): Block[] {
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

export default function ReadingContent({ text }: { text: string }) {
  const blocks = parseBlocks(text);

  return (
    <div className="space-y-6 print:space-y-4">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h1":
            return (
              <h2
                key={i}
                className="pt-2 font-[family-name:var(--font-bodoni)] text-3xl uppercase tracking-[0.04em] text-[#88B39A] md:text-4xl print:text-2xl print:text-black"
              >
                {block.text}
              </h2>
            );

          case "h2":
            return (
              <h3
                key={i}
                className="border-l-2 border-[#88B39A] pl-4 pt-6 text-xl font-semibold tracking-[-0.01em] text-[#F5F5F3] md:text-2xl print:pt-4 print:text-lg print:text-black"
              >
                {block.text}
              </h3>
            );

          case "h3":
            return (
              <h4
                key={i}
                className="pt-4 text-lg font-semibold text-[#88B39A] print:text-base print:text-zinc-800"
              >
                {block.text}
              </h4>
            );

          case "quote":
            return (
              <p
                key={i}
                className="border-l-2 border-[#88B39A]/50 pl-5 text-lg italic leading-8 text-[#88B39A] print:text-base print:text-zinc-700"
              >
                {renderInline(block.text)}
              </p>
            );

          case "list":
            return (
              <ul key={i} className="space-y-2 pl-1">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-lg leading-8 text-zinc-300 print:text-base print:leading-7 print:text-black"
                  >
                    <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#88B39A] print:bg-black" />
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            );

          default:
            return (
              <p
                key={i}
                className="text-lg leading-9 text-zinc-300 md:text-xl md:leading-10 print:text-base print:leading-8 print:text-black"
              >
                {renderInline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}