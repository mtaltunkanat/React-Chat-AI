import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs"; // SyntaxHighlighter stili
import "./CodeBlock.css"; // CSS dosyasını dahil ediyoruz

const CodeBlock = ({ code, language = "bash" }) => {
  return (
    <div className="code-block-container">
      <SyntaxHighlighter language={language} style={github}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
