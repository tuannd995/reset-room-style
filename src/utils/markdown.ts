function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/** Escape HTML for use in code blocks */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Process inline markdown (bold, italic, link, images). Inline code is handled via placeholders. */
function processInline(html: string): string {
  return html
    .replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-semibold text-[#2C2416]">$1</strong>'
    )
    .replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em class="text-[#5A4A3A]">$1</em>')
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="link text-[#2C2416] hover:text-[#8B7355] transition-colors duration-300">$1</a>'
    )
    .replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      (_, alt, src) =>
        `<img src="${(src as string).replace(
          /"/g,
          "&quot;"
        )}" alt="${escapeHtml(
          (alt as string) || ""
        )}" class="rounded-lg max-h-80 object-contain inline" loading="lazy" />`
    );
}

export function markdownToHtml(markdown: string): string {
  if (!markdown?.trim()) return "";

  const codeBlocks: string[] = [];
  const inlineCodeBlocks: string[] = [];

  // 1. Extract fenced code blocks (```...```) to avoid processing inside them
  let html = markdown.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
    const idx = codeBlocks.length;
    const escaped = escapeHtml(code.trim());
    codeBlocks.push(
      `<pre class="my-6 p-4 rounded-lg bg-[#2C2416] text-[#F5F3F0] overflow-x-auto text-sm"><code class="font-mono">${escaped}</code></pre>`
    );
    return `\n\n{{CODE_BLOCK_${idx}}}\n\n`;
  });

  // 2. Extract inline code so we don't break it with other replaces
  html = html.replace(/`([^`]+)`/g, () => {
    const idx = inlineCodeBlocks.length;
    const match = RegExp.lastMatch;
    const inner = match.slice(1, -1);
    inlineCodeBlocks.push(
      `<code class="px-1.5 py-0.5 rounded bg-[#F5F3F0] text-[#2C2416] text-sm font-mono">${escapeHtml(
        inner
      )}</code>`
    );
    return `{{INLINE_CODE_${idx}}}`;
  });

  const lines = html.split("\n");
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Restore code block placeholders when we see them
    if (trimmed.startsWith("{{CODE_BLOCK_")) {
      const num = parseInt(trimmed.replace(/\D/g, ""), 10);
      if (!Number.isNaN(num) && codeBlocks[num]) {
        out.push(codeBlocks[num]);
      }
      i++;
      continue;
    }

    // H1
    const h1 = line.match(/^# (.+)$/);
    if (h1) {
      out.push(
        `<h1 class="text-4xl md:text-5xl font-serif font-bold text-[#2C2416] mb-8">${processInline(
          h1[1]
        )}</h1>`
      );
      i++;
      continue;
    }

    // H2
    const h2 = line.match(/^## (.+)$/);
    if (h2) {
      const id = slugify(h2[1].replace(/<[^>]+>/g, "").trim());
      out.push(
        `<h2 id="${id}" class="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-16 mb-6 pt-8 border-t border-[#D4C4B0]/30 scroll-mt-24">${processInline(
          h2[1]
        )}</h2>`
      );
      i++;
      continue;
    }

    // H3
    const h3 = line.match(/^### (.+)$/);
    if (h3) {
      const id = slugify(h3[1].replace(/<[^>]+>/g, "").trim());
      out.push(
        `<h3 id="${id}" class="text-2xl font-serif font-semibold text-[#2C2416] mt-10 mb-4 scroll-mt-24">${processInline(
          h3[1]
        )}</h3>`
      );
      i++;
      continue;
    }

    // Unordered list
    const ulMatch = line.match(/^[\-\*] (.+)$/);
    if (ulMatch) {
      const items: string[] = [];
      while (i < lines.length && /^[\-\*] (.+)$/.test(lines[i])) {
        const m = lines[i].match(/^[\-\*] (.+)$/)!;
        items.push(
          `<li class="ml-6 mb-3 text-[#5A4A3A] leading-relaxed">${processInline(
            m[1]
          )}</li>`
        );
        i++;
      }
      out.push(`<ul class="list-disc space-y-2 my-6">${items.join("")}</ul>`);
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^\d+\. (.+)$/);
    if (olMatch) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. (.+)$/.test(lines[i])) {
        const m = lines[i].match(/^\d+\. (.+)$/)!;
        items.push(
          `<li class="ml-6 mb-3 text-[#5A4A3A] leading-relaxed list-decimal">${processInline(
            m[1]
          )}</li>`
        );
        i++;
      }
      out.push(
        `<ol class="list-decimal space-y-2 my-6 pl-6">${items.join("")}</ol>`
      );
      continue;
    }

    // Images: ![alt](url)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      const alt = escapeHtml(imgMatch[1]);
      const src = imgMatch[2].replace(/"/g, "&quot;");
      out.push(
        `<figure class="my-6"><img src="${src}" alt="${alt}" class="rounded-lg w-full max-w-2xl mx-auto" loading="lazy" /><figcaption class="text-center text-sm text-[#8B7355] mt-2">${
          alt || ""
        }</figcaption></figure>`
      );
      i++;
      continue;
    }

    // Blockquote: > line(s)
    const bqMatch = line.match(/^> ?(.*)$/);
    if (bqMatch) {
      const bqLines: string[] = [];
      while (i < lines.length && /^> ?(.*)$/.test(lines[i])) {
        const m = lines[i].match(/^> ?(.*)$/)!;
        bqLines.push(processInline(m[1]));
        i++;
      }
      out.push(
        `<blockquote class="border-l-4 border-[#d4c4b0] pl-6 py-2 my-6 text-[#5a4a3a] italic bg-[#f5f3f0] rounded-r-lg">${bqLines.join(
          "<br />"
        )}</blockquote>`
      );
      continue;
    }

    // Empty line: paragraph boundary
    if (trimmed === "") {
      i++;
      continue;
    }

    // Paragraph: collect consecutive non-block lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^#+\s/.test(lines[i]) &&
      !/^[\-\*] /.test(lines[i]) &&
      !/^\d+\. /.test(lines[i]) &&
      !/^> ?/.test(lines[i]) &&
      !lines[i].trim().startsWith("{{CODE_BLOCK_") &&
      !/^!\[.*\]\(.*\)$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      const paraContent = processInline(paraLines.join("\n").trim());
      out.push(
        `<p class="mb-6 text-[#5A4A3A] leading-relaxed text-lg">${paraContent}</p>`
      );
      continue;
    }

    i++;
  }

  // Restore inline code placeholders in output
  let result = out.join("\n");
  inlineCodeBlocks.forEach((replacement, idx) => {
    result = result.replace(`{{INLINE_CODE_${idx}}}`, replacement);
  });

  return result;
}
