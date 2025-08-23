import React from "react";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css"; // Editor styles
import "@uiw/react-markdown-preview/markdown.css"; // Preview styles

const textSample = `# Welcome to the Markdown Editor!

This is a sample of the **React Markdown Editor**.

## ✨ Features
- Real-time preview
- Custom styling support
- Code highlighting
- Auto focus at the end of the text

## 📦 Sample Code

\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`

## 🔗 Links

Visit [uiwjs/react-md-editor](https://github.com/uiwjs/react-md-editor) for more information.
`;

export default function App() {
  const [value, setValue] = React.useState(textSample);
  return (
    <div className="container" data-color-mode="light">
      <MDEditor
        autoFocus
        value={value}
        autoFocusEnd
        visibleDragbar={false}
        onChange={(val) => setValue(val ?? "")}
      />
    </div>
  );
}
