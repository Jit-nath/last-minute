"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CirclePlus, List, Rows2, GripVertical, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { isYouTubeUrl, Title, Thumb } from "@/lib/youtube";
import { useSession } from "@/context/session";

interface VideoItem {
  id: string;
  link: string;
}

interface SortableVideoCardProps {
  id: string;
  link: string;
  layout: "default" | "compact";
  onRemove: () => void;
  isDragging?: boolean;
}

function SortableVideoCard({
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

  const [title, setTitle] = useState<string>("Loading...");
  const [thumbnail, setThumbnail] = useState<string>("");

  useEffect(() => {
    async function load() {
      const fetchedTitle = await Title(link);
      const fetchedThumb = Thumb(link);
      setTitle(fetchedTitle || "Untitled");
      setThumbnail(fetchedThumb || "");
    }
    load();
  }, [link]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  const isCompact = layout === "compact";

  if (isCompact) {
    return (
      <div ref={setNodeRef} style={style} className="mb-1">
        <Card
          className={`shadow hover:shadow-lg transition-shadow duration-200 rounded-lg py-0 bg-muted/50 hover:bg-muted ${
            isDragging ? "border-2 border-primary" : ""
          }`}
        >
          <CardContent className="flex items-center justify-between p-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div
                className="cursor-grab touch-none active:cursor-grabbing flex-shrink-0"
                {...attributes}
                {...listeners}
              >
                <GripVertical className="h-4 w-4 text-gray-400" />
              </div>
              <div className="relative w-16 h-12 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
                {thumbnail && (
                  <Image
                    src={thumbnail}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium leading-tight">{title}</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
              aria-label="Remove video"
              className="flex-shrink-0 ml-2 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} className="mb-1">
      <Card
        className={`flex flex-col px-2 space-y-3 shadow hover:shadow-lg transition rounded-lg py-2 bg-muted/50 hover:bg-muted ${
          isDragging ? "border-2 border-primary" : ""
        }`}
      >
        <CardContent className="relative p-0">
          <div className="flex items-start gap-2 mb-2">
            <div
              className="cursor-grab touch-none active:cursor-grabbing mt-1"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="relative w-full h-48 rounded-md overflow-hidden bg-gray-200">
            {thumbnail && (
              <Image
                src={thumbnail}
                alt={title}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="mt-2 text-lg font-semibold">{title}</div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            aria-label="Remove video"
            className="absolute top-2 right-2 hover:text-red-600"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function VideoCardOverlay({
  link,
  layout,
}: {
  link: string;
  layout: "default" | "compact";
}) {
  const [title, setTitle] = useState<string>("Loading...");
  const [thumbnail, setThumbnail] = useState<string>("");

  useEffect(() => {
    async function load() {
      const fetchedTitle = await Title(link);
      const fetchedThumb = Thumb(link);
      setTitle(fetchedTitle || "Untitled");
      setThumbnail(fetchedThumb || "");
    }
    load();
  }, [link]);

  const isCompact = layout === "compact";

  if (isCompact) {
    return (
      <Card className="shadow hover:shadow-lg transition-shadow duration-200 rounded-lg py-0 bg-muted/50 hover:bg-muted">
        <CardContent className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <GripVertical className="h-4 w-4 text-gray-400" />
            </div>
            <div className="relative w-16 h-12 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
              {thumbnail && (
                <Image
                  src={thumbnail}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium leading-tight">{title}</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Remove video"
            className="flex-shrink-0 ml-2 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col px-2 space-y-3 shadow hover:shadow-lg transition rounded-lg py-2 bg-muted/50 hover:bg-muted">
      <CardContent className="relative p-0">
        <div className="flex items-start gap-2 mb-2">
          <div className="mt-1">
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="relative w-full h-48 rounded-md overflow-hidden bg-gray-200">
          {thumbnail && (
            <Image src={thumbnail} alt={title} fill className="object-cover" />
          )}
        </div>
        <div className="mt-2 text-lg font-semibold">{title}</div>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Remove video"
          className="absolute top-2 right-2 hover:text-red-600"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </CardContent>
    </Card>
  );
}

export default function DraggableVideoSidebar() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [layout, setLayout] = useState<"default" | "compact">("default");
  const [activeId, setActiveId] = useState<string | null>(null);
  const { sessionInfo, setSessionInfo } = useSession();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddVideo = () => {
    if (inputValue.trim()) {
      try {
        // Validate URL
        new URL(inputValue);
        // Check if it's a YouTube URL
        if (!isYouTubeUrl(inputValue)) {
          throw new Error("We only support YouTube videos");
        }

        // Create new video item with unique ID
        const newVideo: VideoItem = {
          id: Date.now().toString(),
          link: inputValue,
        };

        // Create the new videos array
        const newVideos = [...videos, newVideo];
        setVideos(newVideos);

        // Update session with just the links
        const newVideoLinks = newVideos.map((video) => video.link);
        setSessionInfo({
          ...sessionInfo,
          videoLinks: newVideoLinks,
        });

        setInputValue("");
      } catch (e) {
        toast.warning(
          (e as Error).message || "Please enter a valid YouTube URL"
        );
      }
    }
  };

  const handleRemoveVideo = (id: string) => {
    const newVideos = videos.filter((video) => video.id !== id);
    setVideos(newVideos);

    // Update session with just the links
    const newVideoLinks = newVideos.map((video) => video.link);
    setSessionInfo({
      ...sessionInfo,
      videoLinks: newVideoLinks,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddVideo();
    }
  };

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setVideos((videos) => {
        const oldIndex = videos.findIndex((video) => video.id === active.id);
        const newIndex = videos.findIndex((video) => video.id === over.id);

        const newVideos = arrayMove(videos, oldIndex, newIndex);

        // Update session with reordered links
        const newVideoLinks = newVideos.map((video) => video.link);
        setSessionInfo({
          ...sessionInfo,
          videoLinks: newVideoLinks,
        });

        return newVideos;
      });
    }

    setActiveId(null);
  }

  const activeVideo = activeId
    ? videos.find((video) => video.id === activeId)
    : null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 w-full py-2">
        <Input
          placeholder="Paste video link"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-card"
        />
        <Button className="rounded-lg cursor-pointer" onClick={handleAddVideo}>
          <CirclePlus />
        </Button>
      </div>

      <div className="flex justify-between w-full pl-1">
        <span className="text-sm font-medium mt-1">
          {videos.length} video{videos.length !== 1 ? "s" : ""}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            setLayout(layout === "default" ? "compact" : "default")
          }
          className="flex gap-1 items-center"
        >
          {layout === "compact" ? (
            <Rows2 className="h-4 w-4 text-card-foreground" />
          ) : (
            <List className="h-4 w-4 text-card-foreground" />
          )}
        </Button>
      </div>

      <ScrollArea className="h-full w-full mt-2 overflow-y-auto">
        {videos.length > 0 ? (
          <div className="space-y-1">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
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
                    onRemove={() => handleRemoveVideo(video.id)}
                  />
                ))}
              </SortableContext>

              <DragOverlay>
                {activeVideo ? (
                  <VideoCardOverlay link={activeVideo.link} layout={layout} />
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
        ) : (
          <div className="text-center text-gray-500 p-4 flex items-center justify-center h-32">
            No videos added yet
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
