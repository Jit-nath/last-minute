import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GripVertical, Trash2 } from "lucide-react";

interface VideoCardDefaultProps {
  title: string;
  thumbnail: string;
  onRemove: () => void;
  dragHandleProps: React.HTMLAttributes<HTMLDivElement>;
  style: React.CSSProperties;
  isDragging: boolean;
  onCardClick: () => void;
  nodeRef: (node: HTMLElement | null) => void;
}

export function VideoCardDefault({
  title,
  thumbnail,
  onRemove,
  dragHandleProps,
  style,
  isDragging,
  onCardClick,
  nodeRef,
}: VideoCardDefaultProps) {
  return (
    <div ref={nodeRef} style={style} className="mb-1">
      <Card
        className={`flex flex-col px-2 space-y-3 shadow hover:shadow-lg transition rounded-lg py-2 bg-muted/50 hover:bg-muted ${
          isDragging ? "border-2 border-primary" : ""
        }`}
      >
        <CardContent className="relative p-0">
          <div className="flex items-start gap-2 mb-2">
            <div
              className="cursor-grab touch-none active:cursor-grabbing mt-1"
              {...dragHandleProps}
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
          <div
            className="mt-2 text-lg font-semibold cursor-pointer hover:text-primary"
            onClick={onCardClick}
          >
            {title}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            aria-label="Remove video"
            className="absolute -top-1 -right-1 hover:text-red-600"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
