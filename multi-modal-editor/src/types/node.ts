export type NodeType =
  | "paragraph"
  | "heading"
  | "list"
  | "list-item"
  | "bold"
  | "italic"
  | "underline"
  | "mention"
  | "inline-component"
  | "quote"
  | "code-block"
  | "callout";

export interface BaseNode {
  id: string;
  type: NodeType;
  children?: RichTextNode[];
  text?: string;
  props?: Record<string, any>;
}

export type RichTextNode = BaseNode;
