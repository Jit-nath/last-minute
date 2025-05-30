import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

interface SessionCardProps {
  title: string;
  description: string;
  images: string[];
}

export function SessionCard({
  title = "Session Title",
  description = "This is a brief description of the session.",
  images = [
    "./thumbnail.jpg",
    "./thumbnail.jpg",
    "./thumbnail.jpg",
    "./thumbnail.jpg",
  ],
}: Partial<SessionCardProps>) {
  return (
    <Card className="w-full max-w-md overflow-hidden rounded-2xl shadow-lg border border-muted bg-background">
      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[1px] bg-muted/20">
        {images.slice(0, 4).map((img, idx) => (
          <div key={idx} className="aspect-video overflow-hidden">
            <img
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Text & Actions */}
      <div className="flex items-start justify-between px-4 py-3">
        <div>
          <h3 className="text-base font-semibold leading-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Save</DropdownMenuItem>
            <DropdownMenuItem>Open</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}

export default SessionCard;
