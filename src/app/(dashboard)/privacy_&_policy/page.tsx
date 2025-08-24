// app/page.tsx or pages/index.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RichTextEditorDemo } from "./_components/TextEditor";

export default function Home() {
  const [editorHtml, setEditorHtml] = useState("");

  return (
    <div className="p-4 space-y-4">
      <RichTextEditorDemo onChange={setEditorHtml} />

      <Button>View Editor HTML</Button>

      {/* Live preview */}
      <div className="mt-4 p-2 border rounded">
        <h3 className="font-bold">Editor HTML Preview:</h3>
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: editorHtml }}
        />
      </div>
    </div>
  );
}
