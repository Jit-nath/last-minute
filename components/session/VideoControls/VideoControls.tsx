import { Button } from "@/components/ui/button";
import { List, Rows2 } from "lucide-react";
import type { LayoutType } from "@/types/video";

interface VideoControlsProps {
  videoCount: number;
  layout: LayoutType;
  onLayoutToggle: () => void;
}

export function VideoControls({
  videoCount,
  layout,
  onLayoutToggle,
}: VideoControlsProps) {
  return (
    <div className="flex justify-between w-full pl-1">
      <span className="text-sm font-medium mt-1">
        {videoCount} video{videoCount !== 1 ? "s" : ""}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={onLayoutToggle}
        className="flex gap-1 items-center"
      >
        {layout === "compact" ? (
          <Rows2 className="h-4 w-4 text-card-foreground" />
        ) : (
          <List className="h-4 w-4 text-card-foreground" />
        )}
      </Button>
    </div>
  );
}
