import { getMarkRange, Range, useEditor } from "@tiptap/react";
import type { EditorView } from "prosemirror-view";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import TipTapImage from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { useState } from "react";

interface Options {
  placeholder?: string;
}

const useEditorConfig = (options?: Options) => {
  const [selectionRange, setSelectionRange] = useState<Range>();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: "",
        },
      }),
      Placeholder.configure({
        placeholder: options?.placeholder || "Type something",
      }),
      Youtube.configure({
        width: 840,
        height: 472.5,
        HTMLAttributes: {
          class: "mx-auto rounded",
        },
      }),
      TipTapImage.configure({
        HTMLAttributes: {
          class: "mx-auto",
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    editorProps: {
      handleClick(view: EditorView, pos: number, event: MouseEvent) {
        const { state } = view;
        const selectionRange = getMarkRange(
          state.doc.resolve(pos),
          state.schema.marks.link
        );
        if (selectionRange) setSelectionRange(selectionRange);
      },
      attributes: {
        class:
          "prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full",
      },
    },
  });

  return { editor, selectionRange };
};

export default useEditorConfig;
