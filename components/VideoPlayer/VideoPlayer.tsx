"use client";
import { getYouTubeEmbedUrl } from "@/lib/youtube";

interface VideoPlayerProps {
  videoUrl: string;
  className?: string;
}

export default function VideoPlayer({
  videoUrl,
  className = "",
}: VideoPlayerProps) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  if (!embedUrl) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg ${className}`}
      >
        <div className="text-center p-8">
          <p className="text-gray-500 dark:text-gray-400">No video selected</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            Select a video from the sidebar to start watching
          </p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={embedUrl}
      title="YouTube Video Player"
      loading="lazy"
      allowFullScreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      className={`aspect-video border rounded-lg ${className}`}
    />
  );
}
