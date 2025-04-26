import { useState } from "react";
import { RichTextNode } from "../types/node";

export const useEditorState = () => {
  const [nodes, setNodes] = useState<RichTextNode[]>([]);
  const [history, setHistory] = useState<{
    past: RichTextNode[][];
    present: RichTextNode[];
    future: RichTextNode[][];
  }>({
    past: [],
    present: [],
    future: [],
  });

  const updateContent = (newNodes: RichTextNode[]) => {
    setHistory((prev) => ({
      past: [...prev.past, prev.present],
      present: newNodes,
      future: [],
    }));
    setNodes(newNodes);
  };

  return {
    nodes,
    updateContent,
  };
};
