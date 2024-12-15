import  { useState,useEffect } from "react";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const [htmlPreview, setHtmlPreview] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleMarkdownChange = async (event) => {
    const text = event.target.value;
    setMarkdown(text);

    try {
      const response = await axios.post("http://localhost:4000/convert", {
        markdown: text,
      });
      setHtmlPreview(response.data.html);
    } catch (error) {
      console.error("Error in fetching the preview", error);
    }
  };

useEffect(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) setIsDarkMode(savedTheme === "dark");
}, []);

const toggleTheme = () => {
  const newTheme = !isDarkMode ? "dark" : "light";
  setIsDarkMode(!isDarkMode);
  localStorage.setItem("theme", newTheme);
};
  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={toggleTheme}
        style={{
          padding: "10px",
          backgroundColor: isDarkMode ? "#555" : "#eee",
          color: isDarkMode ? "#fff" : "#000",
          border: "none",
          borderRadius: "5px",
          marginBottom: "20px",
          display: "flex",
        }}
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <h1 style={{ color: isDarkMode ? "#fff" : "green" }}>Markdown Editor</h1>

      <div style={{ display: "flex", gap: "20px", height: "80vh" }}>
        
        {/* Markdown Editor */}
        <div
          style={{
            width: "50%",
            height: "100%",
            position: "relative",
            backgroundColor: isDarkMode ? "#2d2d2d" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
            border: `1px solid ${isDarkMode ? "#555" : "#ddd"}`,
          }}
        >
          <textarea
            value={markdown}
            onChange={handleMarkdownChange}
            placeholder="Start typing on your own personal markdown editor..."
            style={{
              width: "100%",
              height: "100%",
              padding: "10px",
              fontSize: "16px",
              lineHeight: "1.5",
              backgroundColor: "transparent",
              color: "inherit",
              border: "none",
              resize: "none",
              zIndex: 1,
              position: "relative",
            }}
          ></textarea>

      
          <SyntaxHighlighter
            language="markdown"
            style={darcula}
            customStyle={{
              width: "100%",
              height: "100%",
              margin: 0,
              padding: "10px",
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
              overflow: "hidden",
              whiteSpace: "pre-wrap",
              background: "transparent",
              color: "inherit",
              opacity: "0.8",
            }}
          >
            {markdown}
          </SyntaxHighlighter>
        </div>

        {/* Live Preview */}
        <div
          style={{
            width: "50%",
            padding: "10px",
            backgroundColor: isDarkMode ? "#222" : "#f9f9f9",
            color: isDarkMode ? "#fff" : "#000",
            border: `1px solid ${isDarkMode ? "#555" : "#ddd"}`,
            overflow: "auto",
            height: "100%",
          }}
        >
          <h2>Live Preview</h2>
          <div
            dangerouslySetInnerHTML={{ __html: htmlPreview }}
            style={{ height: "100%", overflow: "auto" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
