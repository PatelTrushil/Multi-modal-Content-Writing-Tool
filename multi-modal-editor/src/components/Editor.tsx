import React, { useRef, useEffect, useState } from "react";
import "../styles/editor.css";

interface EditorProps {
  html: string;
  onInput: (html: string) => void;
}

const mentionsList = ["john", "jane", "doe"];

const Editor: React.FC<EditorProps> = ({ html, onInput }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [mentionPosition, setMentionPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== html) {
      editorRef.current.innerHTML = html;
    }
  }, [html]);

  const updateMentionPosition = () => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0).cloneRange();
    range.collapse(true);

    const tempSpan = document.createElement("span");
    tempSpan.textContent = "\u200b"; // Zero width space
    range.insertNode(tempSpan);

    const rect = tempSpan.getBoundingClientRect();
    setMentionPosition({
      top: rect.top + window.scrollY + 20, // slight adjust downward
      left: rect.left + window.scrollX,
    });

    tempSpan.parentNode?.removeChild(tempSpan);
  };

  const handleInput = () => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (!selection || !selection.anchorNode) return;

    const textBeforeCursor = selection.anchorNode.textContent?.slice(0, selection.anchorOffset) ?? "";
    const atIndex = textBeforeCursor.lastIndexOf("@");

    if (atIndex !== -1) {
      const query = textBeforeCursor.slice(atIndex + 1);
      setMentionQuery(query);
      setShowMentions(true);
      updateMentionPosition();
    } else {
      setShowMentions(false);
    }

    onInput(editorRef.current.innerHTML);
  };

  const insertMention = (name: string) => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const node = selection.anchorNode;
    if (!node) return;

    const text = node.textContent || "";
    const atIndex = text.lastIndexOf("@");

    if (atIndex !== -1) {
      const beforeAt = text.slice(0, atIndex);
      const afterQuery = text.slice(range.startOffset);
      const newText = beforeAt + "@" + name + " " + afterQuery;

      node.textContent = newText;

      const newRange = document.createRange();
      const newOffset = (beforeAt + "@" + name + " ").length;
      newRange.setStart(node, newOffset);
      newRange.setEnd(node, newOffset);

      selection.removeAllRanges();
      selection.addRange(newRange);

      setShowMentions(false);
      onInput(editorRef.current!.innerHTML);
    }
  };

  const filteredMentions = mentionsList.filter((name) =>
    name.toLowerCase().startsWith(mentionQuery.toLowerCase())
  );

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={editorRef}
        className="editor"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        role="textbox"
        aria-label="Rich Text Editor"
      />
      {showMentions && filteredMentions.length > 0 && (
        <ul
          className="mention-dropdown"
          style={{
            position: "absolute",
            top: mentionPosition.top,
            left: mentionPosition.left,
            backgroundColor: "white",
            border: "1px solid gray",
            borderRadius: "4px",
            listStyle: "none",
            margin: 0,
            padding: "5px",
            zIndex: 1000,
            minWidth: "120px",
          }}
        >
          {filteredMentions.map((name) => (
            <li
              key={name}
              style={{ padding: "5px", cursor: "pointer" }}
              onMouseDown={(e) => {
                e.preventDefault();
                insertMention(name);
              }}
            >
              @{name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Editor;
