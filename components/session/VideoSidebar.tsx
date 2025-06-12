"use client";
//react
import { useState } from "react";
//hooks
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { useVideoManager } from "@/hooks/useVideoManager";
// components
import { VideoInput } from "@/components/session/VideoInput/VideoInput";
import { VideoControls } from "@/components/session/VideoControls/VideoControls";
import { VideoList } from "@/components/session/VideoList/VideoList";
//types
import type { LayoutType } from "@/types/video";
import type { DragEndEvent } from "@dnd-kit/core";

export default function VideoSidebar() {
  const [layout, setLayout] = useState<LayoutType>("default");

  const {
    videos,
    inputValue,
    setInputValue,
    handleAddVideo,
    handleRemoveVideo,
    handleReorderVideos,
    handleKeyDown,
  } = useVideoManager();

  const { sensors, handleDragEnd } = useDragAndDrop();

  const onDragEnd = (event: DragEndEvent) => {
    handleDragEnd(event, videos, handleReorderVideos);
  };

  const toggleLayout = () => {
    setLayout(layout === "default" ? "compact" : "default");
  };

  return (
    <div className="flex flex-col h-full">
      <VideoInput
        value={inputValue}
        onChange={setInputValue}
        onAdd={handleAddVideo}
        onKeyDown={handleKeyDown}
      />

      <VideoControls
        videoCount={videos.length}
        layout={layout}
        onLayoutToggle={toggleLayout}
      />

      <VideoList
        videos={videos}
        layout={layout}
        sensors={sensors}
        onDragEnd={onDragEnd}
        onRemoveVideo={handleRemoveVideo}
      />
    </div>
  );
}
