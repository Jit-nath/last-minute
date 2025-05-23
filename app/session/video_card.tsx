"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Thumb, Title } from "@/lib/youtube";

interface VideoCardProps {
  link: string;
  layout?: "default" | "compact";
  onRemove: () => void;
}

export default function VideoCard({
  link,
  layout = "default",
  onRemove,
}: VideoCardProps) {
  const isCompact = layout === "compact";
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

  if (isCompact) {
    return (
      <Card className="shadow hover:shadow-lg transition-shadow duration-200 rounded-lg py-0 bg-muted/50 hover:bg-muted">
        <CardContent className="flex items-center justify-between p-3 ">
          <div className="flex items-center gap-3 flex-1 min-w-0 ">
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
    );
  }

  return (
    <Card className="flex flex-col px-2 space-y-3 shadow hover:shadow-lg transition rounded-lg py-2 bg-muted/50 hover:bg-muted">
      <CardContent className="relative p-0">
        <div className="relative w-full h-48 rounded-md overflow-hidden bg-gray-200">
          {thumbnail && (
            <Image src={thumbnail} alt={title} fill className="object-cover" />
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
          <Trash2 className="w-5 h-5 " />
        </Button>
      </CardContent>
    </Card>
  );
}
