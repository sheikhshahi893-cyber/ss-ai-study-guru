import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface FormattedResponseProps {
  rawText: string;
  isStreaming?: boolean;
}

export const FormattedResponse: React.FC<FormattedResponseProps> = ({ rawText, isStreaming }) => {
  const [copiedBlockIdx, setCopiedBlockIdx] = useState<number | null>(null);

  if (!rawText || rawText.trim() === "") {
    return (
      <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
        <span>Generating answer...</span>
      </div>
    );
  }

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedBlockIdx(idx);
    setTimeout(() => setCopiedBlockIdx(null), 2000);
  };

  // Lightweight, 100% crash-proof inline parser for bold, links, and code
  const renderInlineStyles = (str: string) => {
    if (!str) return null;

    // Fast split by bold **text**
    const boldParts = str.split(/(\*\*.*?\*\*)/g);
    return boldParts.map((bPart, bIdx) => {
      if (bPart.startsWith("**") && bPart.endsWith("**") && bPart.length >= 4) {
        return (
          <strong key={`b-${bIdx}`} className="font-bold text-slate-950">
            {bPart.slice(2, -2)}
          </strong>
        );
      }

      // Check for markdown links: [Title](url) or bracketed domains [domain.com]
      const linkParts = bPart.split(/(\[[^\]]+\](?:\([^\)]+\))?)/g);
      return linkParts.map((lPart, lIdx) => {
        // [Title](https://...)
        const mdLinkMatch = lPart.match(/^\[([^\]]+)\]\((https?:\/\/[^\)]+)\)$/);
        if (mdLinkMatch) {
          return (
            <a
              key={`link-${bIdx}-${lIdx}`}
              href={mdLinkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline font-semibold inline-flex items-center gap-0.5"
            >
              {mdLinkMatch[1]}
            </a>
          );
        }

        // Bracketed domain [jkbose.nic.in]
        const bracketDomainMatch = lPart.match(/^\[([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s\]]*)?)\]$/);
        if (bracketDomainMatch) {
          const domain = bracketDomainMatch[1];
          const url = domain.startsWith("http") ? domain : `https://${domain}`;
          return (
            <a
              key={`bdom-${bIdx}-${lIdx}`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline font-semibold inline-flex items-center gap-0.5"
            >
              {domain}
            </a>
          );
        }

        // Fast split by inline code `code`
        const codeParts = lPart.split(/(`[^`]+`)/g);
        return codeParts.map((cPart, cIdx) => {
          if (cPart.startsWith("`") && cPart.endsWith("`") && cPart.length > 2) {
            return (
              <code key={`c-${bIdx}-${lIdx}-${cIdx}`} className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-100 text-amber-900 font-mono text-xs border border-slate-200">
                {cPart.slice(1, -1)}
              </code>
            );
          }
          return <React.Fragment key={`t-${bIdx}-${lIdx}-${cIdx}`}>{cPart}</React.Fragment>;
        });
      });
    });
  };

  // Parse code blocks vs regular text blocks
  const parts = rawText.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-3 font-sans text-sm sm:text-base text-slate-900 leading-relaxed">
      {parts.map((part, partIdx) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          const firstLineEnd = part.indexOf("\n");
          const lang = firstLineEnd > 3 ? part.slice(3, firstLineEnd).trim() : "code";
          const codeContent = firstLineEnd !== -1 ? part.slice(firstLineEnd + 1, -3).trim() : part.slice(3, -3).trim();

          return (
            <div key={partIdx} className="my-3 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-sm text-left">
              <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400 font-mono">
                <span>{lang || "code"}</span>
                <button
                  onClick={() => copyCode(codeContent, partIdx)}
                  className="flex items-center gap-1 hover:text-amber-400 transition cursor-pointer text-[11px]"
                >
                  {copiedBlockIdx === partIdx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 text-xs sm:text-sm font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                <code>{codeContent}</code>
              </pre>
            </div>
          );
        }

        const lines = part.split("\n");

        return (
          <div key={partIdx} className="space-y-2">
            {lines.map((line, idx) => {
              const trimmed = line.trim();
              if (!trimmed) {
                return <div key={idx} className="h-1" />;
              }

              // Headings (###, ##, #)
              if (trimmed.startsWith("### ")) {
                return (
                  <h4 key={idx} className="text-base font-bold text-slate-950 pt-2 pb-0.5 border-b border-slate-100">
                    {renderInlineStyles(trimmed.slice(4))}
                  </h4>
                );
              }
              if (trimmed.startsWith("## ")) {
                return (
                  <h3 key={idx} className="text-lg font-extrabold text-amber-950 pt-3 pb-1 border-b border-slate-200">
                    {renderInlineStyles(trimmed.slice(3))}
                  </h3>
                );
              }
              if (trimmed.startsWith("# ")) {
                return (
                  <h2 key={idx} className="text-xl font-black text-amber-950 pt-3 pb-1">
                    {renderInlineStyles(trimmed.slice(2))}
                  </h2>
                );
              }

              // Horizontal Rule (---)
              if (trimmed === "---" || trimmed === "***") {
                return <hr key={idx} className="my-2 border-slate-200" />;
              }

              // Blockquotes (> text)
              if (trimmed.startsWith("> ")) {
                return (
                  <blockquote key={idx} className="pl-3 py-1 my-1 border-l-4 border-amber-500 bg-amber-50/50 rounded-r-lg text-slate-800 italic text-sm">
                    {renderInlineStyles(trimmed.slice(2))}
                  </blockquote>
                );
              }

              // Bullet points (•, -, *)
              if (trimmed.startsWith("•") || trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                const contentWithoutBullet = trimmed.replace(/^[•\-\*]\s*/, "");
                return (
                  <div key={idx} className="flex items-start gap-2 pl-1 sm:pl-2 text-slate-900">
                    <span className="text-amber-600 font-bold select-none text-base leading-tight">•</span>
                    <div className="flex-1">
                      {renderInlineStyles(contentWithoutBullet)}
                    </div>
                  </div>
                );
              }

              // Numbered lists (1. 2. 3.)
              const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
              if (numMatch) {
                return (
                  <div key={idx} className="flex items-start gap-2 pl-1 sm:pl-2 text-slate-900">
                    <span className="font-bold text-amber-700 min-w-[20px] select-none text-sm">
                      {numMatch[1]}.
                    </span>
                    <div className="flex-1">
                      {renderInlineStyles(numMatch[2])}
                    </div>
                  </div>
                );
              }

              // Standard line
              return (
                <div key={idx} className="text-slate-900 leading-relaxed">
                  {renderInlineStyles(line)}
                </div>
              );
            })}
          </div>
        );
      })}

      {isStreaming && (
        <span className="inline-block w-2 h-4 ml-1 bg-amber-500 animate-pulse align-middle rounded-xs" />
      )}
    </div>
  );
};

