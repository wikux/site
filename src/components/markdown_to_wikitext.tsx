"use client";

import {
  useDeferredValue,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import { Check, ClipboardCopy, FileUp } from "lucide-react";
import { markdown_to_wikitext } from "@/lib/markdown_to_wikitext";

const sample_markdown = `# Welcome

This is **bold**, *italic*, and \`inline code\`.

## Lists

- First item
- Second with a [link](https://www.mediawiki.org)
  - Nested item

1. Numbered one
2. Numbered two

## Code

\`\`\`python
def hello():
    print("Hello, wiki")
\`\`\`

## Table

| Skin | Mobile |
| --- | --- |
| Vector | Good |
| Minerva | Excellent |

> A short quote.
`;

const accepted_extensions = [".md", ".markdown", ".txt"];

function is_accepted_file(file: File): boolean {
  const name = file.name.toLowerCase();
  return accepted_extensions.some((ext) => name.endsWith(ext));
}

export function MarkdownToWikitext() {
  const input_id = useId();
  const file_input_ref = useRef<HTMLInputElement>(null);
  const [markdown, set_markdown] = useState(sample_markdown);
  const [copied, set_copied] = useState(false);
  const [dragging, set_dragging] = useState(false);
  const [file_error, set_file_error] = useState<string | null>(null);

  const deferred_markdown = useDeferredValue(markdown);
  const wikitext = markdown_to_wikitext(deferred_markdown);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => set_copied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy_wikitext() {
    try {
      await navigator.clipboard.writeText(wikitext);
      set_copied(true);
    } catch {
      set_copied(false);
    }
  }

  function read_file(file: File) {
    if (!is_accepted_file(file)) {
      set_file_error("Use a .md, .markdown, or .txt file.");
      return;
    }
    set_file_error(null);
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      set_markdown(text);
    };
    reader.readAsText(file);
  }

  function on_file_change(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) read_file(file);
    event.target.value = "";
  }

  function on_drop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    set_dragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) read_file(file);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => file_input_ref.current?.click()}
          className="inline-flex items-center gap-2 border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wikux-accent cursor-pointer"
        >
          <FileUp className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
          Open file
        </button>
        <input
          ref={file_input_ref}
          type="file"
          accept=".md,.markdown,.txt,text/markdown,text/plain"
          className="sr-only"
          onChange={on_file_change}
        />
        <button
          type="button"
          onClick={copy_wikitext}
          className="inline-flex items-center gap-2 border border-foreground bg-foreground px-3 py-2 text-sm font-medium text-background transition-colors hover:bg-wikux-yellow hover:text-on-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wikux-accent cursor-pointer"
        >
          {copied ? (
            <Check className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <ClipboardCopy
              className="size-3.5"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          )}
          {copied ? "Copied" : "Copy wikitext"}
        </button>
        {file_error ? (
          <p className="text-sm text-muted" role="alert">
            {file_error}
          </p>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section
          className={`flex min-h-[28rem] flex-col border bg-surface ${
            dragging ? "border-wikux-accent" : "border-border"
          }`}
          onDragEnter={(event) => {
            event.preventDefault();
            set_dragging(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            set_dragging(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            if (event.currentTarget.contains(event.relatedTarget as Node)) {
              return;
            }
            set_dragging(false);
          }}
          onDrop={on_drop}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <label
              htmlFor={input_id}
              className="font-display text-sm font-medium text-foreground"
            >
              Markdown
            </label>
            <span className="text-xs text-muted">Paste or drop a file</span>
          </div>
          <textarea
            id={input_id}
            value={markdown}
            onChange={(event) => {
              set_file_error(null);
              set_markdown(event.target.value);
            }}
            spellCheck={false}
            className="min-h-0 flex-1 resize-none bg-transparent px-4 py-3 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted focus-visible:outline-none"
            placeholder="Paste Markdown here…"
          />
        </section>

        <section className="flex min-h-[28rem] flex-col border border-border bg-surface">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 className="font-display text-sm font-medium text-foreground">
              Wikitext
            </h2>
            <span className="text-xs text-muted">MediaWiki source</span>
          </div>
          <textarea
            value={wikitext}
            readOnly
            spellCheck={false}
            aria-label="Converted wikitext"
            className="min-h-0 flex-1 resize-none bg-transparent px-4 py-3 font-mono text-sm leading-relaxed text-foreground focus-visible:outline-none"
          />
        </section>
      </div>

      <p className="max-w-3xl text-sm leading-relaxed text-muted">
        Best-effort conversion for GitHub-flavored Markdown. Complex HTML,
        templates, or wiki-specific markup may need a quick manual pass after
        pasting into your wiki.
      </p>
    </div>
  );
}
