function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Process headers first and create IDs
  const headerMatches: Array<{ level: number; text: string; id: string }> = [];

  // H2 headers
  html = html.replace(/^## (.*$)/gim, (match, text) => {
    const id = slugify(text);
    headerMatches.push({ level: 2, text, id });
    return `<h2 id="${id}" class="text-3xl md:text-4xl font-serif font-semibold text-[#2C2416] mt-16 mb-6 pt-8 border-t border-[#D4C4B0]/30 scroll-mt-24">${text}</h2>`;
  });

  // H3 headers
  html = html.replace(/^### (.*$)/gim, (match, text) => {
    const id = slugify(text);
    headerMatches.push({ level: 3, text, id });
    return `<h3 id="${id}" class="text-2xl font-serif font-semibold text-[#2C2416] mt-10 mb-4 scroll-mt-24">${text}</h3>`;
  });

  // H1 headers (usually only one at the top)
  html = html.replace(
    /^# (.*$)/gim,
    '<h1 class="text-4xl md:text-5xl font-serif font-bold text-[#2C2416] mb-8">$1</h1>'
  );

  // Bold
  html = html.replace(
    /\*\*(.*?)\*\*/gim,
    '<strong class="font-semibold text-[#2C2416]">$1</strong>'
  );

  // Italic (but not bold)
  html = html.replace(
    /(?<!\*)\*([^*]+?)\*(?!\*)/gim,
    '<em class="text-[#5A4A3A]">$1</em>'
  );

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/gim,
    '<a href="$2" class="text-[#2C2416] underline hover:text-[#8B7355] transition-colors duration-300">$1</a>'
  );

  // Process lists - handle unordered lists
  const lines = html.split("\n");
  let inList = false;
  let listItems: string[] = [];
  const processedLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const listMatch = line.match(/^[\-\*] (.+)$/);

    if (listMatch) {
      if (!inList) {
        inList = true;
        listItems = [];
      }
      // Process inline formatting in list items
      let itemText = listMatch[1]
        .replace(
          /\*\*(.*?)\*\*/gim,
          '<strong class="font-semibold text-[#2C2416]">$1</strong>'
        )
        .replace(
          /(?<!\*)\*([^*]+?)\*(?!\*)/gim,
          '<em class="text-[#5A4A3A]">$1</em>'
        );
      listItems.push(
        `<li class="ml-6 mb-3 text-[#5A4A3A] leading-relaxed">${itemText}</li>`
      );
    } else {
      if (inList && listItems.length > 0) {
        processedLines.push(
          `<ul class="list-disc space-y-2 my-6">${listItems.join("")}</ul>`
        );
        listItems = [];
        inList = false;
      }
      processedLines.push(line);
    }
  }

  if (inList && listItems.length > 0) {
    processedLines.push(
      `<ul class="list-disc space-y-2 my-6">${listItems.join("")}</ul>`
    );
  }

  html = processedLines.join("\n");

  // Process paragraphs - split by double newlines but preserve existing HTML
  const paragraphs = html.split(/\n\n+/);
  html = paragraphs
    .map((para) => {
      const trimmed = para.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<")) return trimmed; // Already HTML
      if (trimmed.match(/^[\-\*]/)) return trimmed; // List items
      return `<p class="mb-6 text-[#5A4A3A] leading-relaxed text-lg">${trimmed}</p>`;
    })
    .filter((p) => p)
    .join("\n");

  return html;
}
