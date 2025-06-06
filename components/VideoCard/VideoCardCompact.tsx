import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GripVertical, Trash2 } from "lucide-react";
import type { SortableVideoCardProps } from "@/types/video";

interface VideoCardCompactProps extends Omit<SortableVideoCardProps, "layout"> {
  title: string;
  thumbnail: string;
  dragHandleProps: any;
  style: React.CSSProperties;
  isDragging: boolean;
  onCardClick: () => void;
  nodeRef: (node: HTMLElement | null) => void;
}

export function VideoCardCompact({
  title,
  thumbnail,
  onRemove,
  dragHandleProps,
  style,
  isDragging,
  onCardClick,
  nodeRef,
}: VideoCardCompactProps) {
  return (
    <div ref={nodeRef} style={style} className="mb-1">
      <Card
        className={`shadow hover:shadow-lg transition-shadow duration-200 rounded-lg py-0 bg-muted/50 hover:bg-muted ${
          isDragging ? "border-2 border-primary" : ""
        }`}
      >
        <CardContent className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className="cursor-grab touch-none active:cursor-grabbing flex-shrink-0"
              {...dragHandleProps}
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
              <div
                className="text-sm font-medium leading-tight cursor-pointer hover:text-primary"
                onClick={onCardClick}
              >
                {title}
              </div>
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
