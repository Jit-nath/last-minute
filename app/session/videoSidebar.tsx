"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import VideoCard from "./video_card";
import { CirclePlus, List, Rows2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { isYouTubeUrl } from "@/lib/youtube";
import { useSession } from "@/context/session";

export default function VideoSidebar() {
  const [videos, setVideos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [layout, setLayout] = useState<"default" | "compact">("default");
  const { sessionInfo, setSessionInfo } = useSession();

  const handleAddVideo = () => {
    if (inputValue.trim()) {
      try {
        // Validate URL
        new URL(inputValue);
        // Check if it's a YouTube URL
        if (!isYouTubeUrl(inputValue)) {
          throw new Error("We only support YouTube videos");
        }

        // Create the new videos array
        const newVideos = [...videos, inputValue];

        setVideos(newVideos);
        setSessionInfo({
          ...sessionInfo,
          videoLinks: newVideos,
        });

        setInputValue("");
      } catch (e) {
        toast.warning(
          (e as Error).message || "Please enter a valid YouTube URL"
        );
      }
    }
    console.log(sessionInfo.videoLinks);
  };

  const handleRemoveVideo = (index: number) => {
    const newVideos = videos.filter((_, i) => i !== index);
    setVideos(newVideos);
    setSessionInfo({
      ...sessionInfo,
      videoLinks: newVideos,
    });
    console.log(sessionInfo.videoLinks);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddVideo();
    }
  };

  return (
    <div className="flex flex-col h-full ">
      <div className="flex gap-2 w-full py-2 ">
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
            {videos.map((link, index) => (
              <VideoCard
                key={link + index}
                link={link}
                layout={layout}
                onRemove={() => handleRemoveVideo(index)}
              />
            ))}
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
