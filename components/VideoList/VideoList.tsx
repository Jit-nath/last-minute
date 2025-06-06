import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SortableVideoCard } from "@/components/VideoCard/SortableVideoCard";
import type { VideoItem, LayoutType } from "@/types/video";

interface VideoListProps {
  videos: VideoItem[];
  layout: LayoutType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sensors: any[];
  onDragEnd: (event: DragEndEvent) => void;
  onRemoveVideo: (id: string) => void;
}

export function VideoList({
  videos,
  layout,
  sensors,
  onDragEnd,
  onRemoveVideo,
}: VideoListProps) {
  if (videos.length === 0) {
    return (
      <ScrollArea className="h-full w-full mt-2 overflow-y-auto">
        <div className="text-center text-gray-500 p-4 flex items-center justify-center h-32">
          No videos added yet
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="h-full w-full mt-2 overflow-y-auto">
      <div className="space-y-1">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext
            items={videos.map((video) => video.id)}
            strategy={verticalListSortingStrategy}
          >
            {videos.map((video) => (
              <SortableVideoCard
                key={video.id}
                id={video.id}
                link={video.link}
                layout={layout}
                onRemove={() => onRemoveVideo(video.id)}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </ScrollArea>
  );
}
