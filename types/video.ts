export interface VideoItem {
  id: string;
  link: string;
}

export interface SortableVideoCardProps {
  id: string;
  link: string;
  layout: "default" | "compact";
  onRemove: () => void;
  isDragging?: boolean;
}

export type LayoutType = "default" | "compact";
