/* eslint-disable @typescript-eslint/no-unused-vars */
// _components/TextEditor.tsx
"use client";

import { useEffect } from "react";
import { ListItemNode, ListNode } from "@lexical/list";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ParagraphNode, TextNode } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";

import { TooltipProvider } from "@/components/ui/tooltip";
import { editorTheme } from "@/components/editor/themes/editor-theme";
import { BlockFormatDropDown } from "@/components/editor/plugins/toolbar/block-format-toolbar-plugin";
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin";
import { FormatParagraph } from "@/components/editor/plugins/toolbar/block-format/format-paragraph";
import { FormatNumberedList } from "@/components/editor/plugins/toolbar/block-format/format-numbered-list";
import { FormatHeading } from "@/components/editor/plugins/toolbar/block-format/format-heading";
import { FormatBulletedList } from "@/components/editor/plugins/toolbar/block-format/format-bulleted-list";
import { FormatCheckList } from "@/components/editor/plugins/toolbar/block-format/format-check-list";
import { FormatQuote } from "@/components/editor/plugins/toolbar/block-format/format-quote";
import { ElementFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/element-format-toolbar-plugin";
import { ContentEditable } from "@/components/editor/editor-ui/content-editable";
import { FontFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/font-format-toolbar-plugin";
import { FontSizeToolbarPlugin } from "@/components/editor/plugins/toolbar/font-size-toolbar-plugin";

const placeholder = "Start typing...";

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes: [
    HeadingNode,
    ParagraphNode,
    TextNode,
    QuoteNode,
    ListNode,
    ListItemNode,
  ],
  onError: (error: Error) => console.error(error),
};

type RichTextEditorDemoProps = {
  onChange: (html: string) => void;
};

export function RichTextEditorDemo({ onChange }: RichTextEditorDemoProps) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <TooltipProvider>
        <Plugins onChange={onChange} />
      </TooltipProvider>
    </LexicalComposer>
  );
}

type PluginsProps = {
  onChange: (html: string) => void;
};

function Plugins({ onChange }: PluginsProps) {
  const [editor] = useLexicalComposerContext();

  // Subscribe to editor updates
  useEffect(() => {
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const html = $generateHtmlFromNodes(editor);
        onChange(html);
      });
    });
    return () => unregister();
  }, [editor, onChange]);

  return (
    <div className="relative bg-background w-full overflow-hidden rounded-lg border">
      {/* Toolbar */}
      <ToolbarPlugin>
        {({ blockType }) => (
          <div className="sticky top-0 z-10 flex flex-wrap gap-2 overflow-auto border-b p-1 bg-background">
            <BlockFormatDropDown>
              <FormatParagraph />
              <FormatHeading levels={["h1", "h2", "h3"]} />
              <FormatNumberedList />
              <FormatBulletedList />
              <FormatCheckList />
              <FormatQuote />
            </BlockFormatDropDown>

            <FontFormatToolbarPlugin format="bold" />
            <FontFormatToolbarPlugin format="italic" />
            <FontFormatToolbarPlugin format="underline" />
            <FontFormatToolbarPlugin format="strikethrough" />

            <FontSizeToolbarPlugin />
            <ElementFormatToolbarPlugin />
          </div>
        )}
      </ToolbarPlugin>

      {/* Editor */}
      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              placeholder={placeholder}
              className="ContentEditable__root relative block h-72 overflow-auto px-4 py-3 focus:outline-none"
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <ListPlugin />
        <CheckListPlugin />
        <TabIndentationPlugin />
      </div>
    </div>
  );
}
