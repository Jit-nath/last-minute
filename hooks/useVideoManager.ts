import { useState } from "react";
import { toast } from "sonner";
import { isYouTubeUrl } from "@/lib/youtube";
import { useSession } from "@/context/session";
import type { VideoItem } from "@/types/video";

export function useVideoManager() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const { sessionInfo, setSessionInfo } = useSession();

  const updateSession = (newVideos: VideoItem[]) => {
    const newVideoLinks = newVideos.map((video) => video.link);
    setSessionInfo({
      ...sessionInfo,
      videoLinks: newVideoLinks,
    });
  };

  const handleAddVideo = () => {
    if (!inputValue.trim()) return;

    try {
      new URL(inputValue); // Validate URL

      if (!isYouTubeUrl(inputValue)) {
        throw new Error("We only support YouTube videos");
      }

      const newVideo: VideoItem = {
        id: Date.now().toString(),
        link: inputValue,
      };

      const newVideos = [...videos, newVideo];
      setVideos(newVideos);
      updateSession(newVideos);
      setInputValue("");
    } catch (e) {
      toast.warning((e as Error).message || "Please enter a valid YouTube URL");
    }
  };

  const handleRemoveVideo = (id: string) => {
    const newVideos = videos.filter((video) => video.id !== id);
    setVideos(newVideos);
    updateSession(newVideos);
  };

  const handleReorderVideos = (newVideos: VideoItem[]) => {
    setVideos(newVideos);
    updateSession(newVideos);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddVideo();
    }
  };

  return {
    videos,
    inputValue,
    setInputValue,
    handleAddVideo,
    handleRemoveVideo,
    handleReorderVideos,
    handleKeyDown,
  };
}
