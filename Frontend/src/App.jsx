import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import './App.css';
import axios from 'axios';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { EditorView } from '@codemirror/view';


function App() {
  const [code ,setCode] = useState("Write Your Code Here...");
  const [Result, setResult] = useState("");
  const [loading, setLoading] = useState(false); // Button loading state

  // sending the code to the backend
  const getAiResponse = async () => {
    setLoading(true); // Disable button
    try {
     const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/ai/get-review`, { code });
   setResult(response.data);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResult("⚠️ Something went wrong while fetching the AI response.");
    } finally {
      setLoading(false); // Enable button again
    }
  }

  return (
    <div className="App">
      <h1 className="title">✨ Smart Code Maker & Checker✨</h1>
       <p className="subtitle">Enter your code or a coding request — get smart suggestions, improvements, and polished output.✨💕</p>
      <div className="editor-container">
        <div className="left-panel">
          <h2 className="panel-heading">💻 Code Playground</h2>
       <CodeMirror
       height='50vh'
  value={code}
  extensions={[
    javascript(),
    EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        const editor = update.view;
        const height = editor.contentDOM.scrollHeight;
        editor.dom.style.height = height + 'px';
      }
    }),
  ]}
  onChange={setCode}
  basicSetup={{ lineNumbers: true }}
  theme="light"
/>

          <button className="run-btn" onClick={getAiResponse} disabled={loading}>
            {loading ? "⏳ Thinking..." : "▶ Run ✨"}
          </button>
        </div>
        <div className="right-panel">
          <h2 className="panel-heading">💗 AI Magic Results</h2>
          <pre className="output-box">
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {Result || "Your AI-generated code review will appear here!"}
            </Markdown>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
