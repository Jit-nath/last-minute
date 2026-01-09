import * as React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, ArrowDownToLine, Share2 } from "lucide-react";
import { sessionCardType } from "@/types/session-card-type";

function SessionCard({ thumb, title, description }: sessionCardType) {
  return (
    <Card className="w-full max-w-xs overflow-hidden rounded-2xl shadow-lg border border-muted bg-muted py-0">
      {/* Image Grid */}
      <div className="grid grid-cols-2 bg-muted/20">
        {thumb.slice(0, 4).map((img, idx) => (
          <div key={idx} className="relative aspect-video overflow-hidden">
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Text & Actions */}
      <div className="flex items-start justify-between pl-4 pr-3 pb-4 ">
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
            <DropdownMenuItem>
              <ArrowDownToLine />
              Save
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2 />
              Share
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}

export default SessionCard;
