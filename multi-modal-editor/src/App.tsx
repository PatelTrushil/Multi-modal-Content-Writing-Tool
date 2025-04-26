import { useState } from "react";
import Toolbar from "./components/Toolbar";
import Editor from "./components/Editor";

function App() {
  const [history, setHistory] = useState<string[]>(["<p><br /></p>"]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const handleInput = (html: string) => {
    const newHistory = [...history.slice(0, historyIndex + 1), html];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <Toolbar onUndo={undo} onRedo={redo} />
      <Editor html={history[historyIndex]} onInput={handleInput} />
    </div>
  );
}

export default App;
