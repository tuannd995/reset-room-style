"use client";

import { markdownToHtml } from "@/utils/markdown";
import { useMemo, useState } from "react";

interface MarkdownEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
  disabled?: boolean;
}

export default function MarkdownEditor({
  value = "",
  onChange,
  placeholder = "Write your content in **Markdown**…",
  minHeight = 320,
  disabled = false,
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  const htmlPreview = useMemo(() => markdownToHtml(value || ""), [value]);

  return (
    <div className="border border-[#D4C4B0] rounded-lg overflow-hidden bg-white">
      <div className="flex border-b border-[#D4C4B0] bg-[#FAF8F6]">
        <button
          type="button"
          onClick={() => setActiveTab("write")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "write"
              ? "bg-white text-[#2C2416] border-b-2 border-[#2C2416] -mb-px"
              : "text-[#5A4A3A] hover:text-[#2C2416]"
          }`}
        >
          Write
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("preview")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "preview"
              ? "bg-white text-[#2C2416] border-b-2 border-[#2C2416] -mb-px"
              : "text-[#5A4A3A] hover:text-[#2C2416]"
          }`}
        >
          Preview
        </button>
        <span className="ml-2 py-2 text-xs text-[#8B7355] self-center">
          Markdown supported: **bold**, *italic*, [link](url), ```code```,
          lists, headers
        </span>
      </div>
      {activeTab === "write" ? (
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full p-4 font-mono text-sm text-[#2C2416] placeholder:text-[#8B7355] resize-y focus:outline-none focus:ring-0 border-0"
          style={{ minHeight }}
          spellCheck
        />
      ) : (
        <div
          className="p-4 overflow-auto prose prose-lg max-w-none text-[#5A4A3A]"
          style={{ minHeight }}
          dangerouslySetInnerHTML={{
            __html:
              htmlPreview ||
              "<p class='text-[#8B7355]'>Nothing to preview.</p>",
          }}
        />
      )}
    </div>
  );
}
