"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSession } from "@/context/session";
import { useVideoData } from "@/hooks/useVideoData";
import { VideoCardCompact } from "./VideoCardCompact";
import { VideoCardDefault } from "./VideoCardDefault";
import type { SortableVideoCardProps } from "@/types/video";

export function SortableVideoCard({
  id,
  link,
  layout,
  onRemove,
}: SortableVideoCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const { title, thumbnail, isLoading, error } = useVideoData(link);
  const { sessionInfo, setSessionInfo } = useSession();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  const handleCardClick = () => {
    setSessionInfo({
      ...sessionInfo,
      lastPlayed: link,
    });
  };

  const dragHandleProps = { ...attributes, ...listeners };

  const commonProps = {
    id,
    link,
    title: error ? "Error loading video" : title,
    thumbnail,
    onRemove,
    dragHandleProps,
    style,
    isDragging,
    onCardClick: handleCardClick,
    nodeRef: setNodeRef,
  };

  if (layout === "compact") {
    return <VideoCardCompact {...commonProps} />;
  }

  return <VideoCardDefault {...commonProps} />;
}
