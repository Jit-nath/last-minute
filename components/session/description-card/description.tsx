"use client";

import { Button } from "@/components/ui/button";
import { saveLink } from "@/app/actions/saved-links";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";

export default function VideoDetails({
  title,
  description,
  channel,
  views,
  uploadDate,
  videoId,
  thumbnailUrl,
}: {
  title: string;
  description: string;
  channel: string;
  views: number;
  uploadDate: string;
  videoId?: string;
  thumbnailUrl?: string;
}) {
  const handleSave = async () => {
    // Construct URL from videoId if possible, or pass it in.
    // Assuming videoId is passed or we have the current page URL.
    // For now using a placeholder URL or props.

    // In a real app we'd get the current video URL.
    // The previous code had hardcoded values, so I'll try to be generic.
    // `session.tsx` renders this, so I should pass the URL there.

    const url = videoId
      ? `https://www.youtube.com/watch?v=${videoId}`
      : window.location.href; // Fallback

    try {
      await saveLink(url, title, thumbnailUrl);
      toast.success("Video saved to your list");
    } catch {
      toast.error("Failed to save video");
    }
  };

  return (
    <div className="bg-secondary text-primary-foreground p-4 rounded-lg">
      <div className="flex justify-between items-start">
        {/* Title */}
        <h2 className="text-lg font-semibold">{title}</h2>
        <Button
          variant="secondary"
          size="sm"
          className="gap-2"
          onClick={handleSave}
          title="Save to list"
        >
          <Bookmark className="h-4 w-4" />
          Save Video
        </Button>
      </div>

      {/* Channel and meta */}
      <div className="text-sm text-primary-foreground flex gap-4 mt-1">
        <span>{channel}</span>
        <span>{views} views</span>
        <span>{uploadDate}</span>
      </div>

      {/* Description */}
      <p className="text-secondary-foreground mt-3 whitespace-pre-line text-sm">
        {description}
      </p>
    </div>
  );
}
