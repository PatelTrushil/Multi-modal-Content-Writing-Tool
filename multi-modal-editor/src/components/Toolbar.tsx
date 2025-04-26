import React from "react";
import "../styles/toolbar.css";

interface ToolbarProps {
  onUndo: () => void;
  onRedo: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onUndo, onRedo }) => {
  
  const applyStyle = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
  };

  const clearFormatting = () => {
    const editor = document.querySelector(".editor") as HTMLDivElement;
    if (editor) {
      editor.innerHTML = "<p><br /></p>";
    }
  };

  return (
    <div className="toolbar">
      <button onClick={onUndo}>Undo</button>
      <button onClick={onRedo}>Redo</button>

      <select onChange={(e) => applyStyle("fontName", e.target.value)}>
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
      </select>

      <select onChange={(e) => applyStyle("fontSize", e.target.value)}>
        <option value="3">11</option>
        <option value="4">14</option>
        <option value="5">18</option>
        <option value="6">24</option>
      </select>

      <button onClick={() => applyStyle("bold")}><b>B</b></button>
      <button onClick={() => applyStyle("italic")}><i>I</i></button>
      <button onClick={() => applyStyle("underline")}><u>U</u></button>
      <button onClick={() => applyStyle("strikeThrough")}>S</button>

      <button onClick={() => applyStyle("subscript")}>X<sub>2</sub></button>
      <button onClick={() => applyStyle("superscript")}>X<sup>2</sup></button>

      <button onClick={() => applyStyle("insertUnorderedList")}>• List</button>
      <button onClick={() => applyStyle("insertOrderedList")}>1. List</button>

      <button onClick={() => applyStyle("formatBlock", "blockquote")}>❝</button>
      <button onClick={() => applyStyle("formatBlock", "h1")}>H1</button>
      <button onClick={() => applyStyle("formatBlock", "h2")}>H2</button>

      <select onChange={(e) => applyStyle("foreColor", e.target.value)}>
        <option value="">Text Color</option>
        <option value="black">Black</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="purple">Purple</option>
      </select>

      <select onChange={(e) => applyStyle("hiliteColor", e.target.value)}>
        <option value="">Highlight</option>
        <option value="yellow">Yellow</option>
        <option value="lightgreen">Light Green</option>
        <option value="lightblue">Light Blue</option>
        <option value="pink">Pink</option>
      </select>

      <button onClick={clearFormatting}>Clear</button>
    </div>
  );
};

export default Toolbar;
