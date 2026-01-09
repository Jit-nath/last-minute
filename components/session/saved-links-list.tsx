"use client";

import { useEffect, useState, useTransition } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Lock, Unlock, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getSavedLinks,
  updateLinkPositions,
  toggleLock,
  deleteLink,
} from "@/app/actions/saved-links";
import Image from "next/image";
import { toast } from "sonner";

type SavedLink = {
  id: number;
  url: string;
  title: string | null;
  thumbnail: string | null;
  position: number | null;
  isLocked: boolean | null;
};

export default function SavedLinksList({
  sessionId,
  readOnly = false,
}: {
  sessionId?: number;
  readOnly?: boolean;
}) {
  const [links, setLinks] = useState<SavedLink[]>([]);
  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    getSavedLinks(sessionId)
      .then(setLinks)
      .catch((err) => {
        console.error("Failed to load links", err);
        setLinks([]);
      });
  }, [sessionId]);

  function handleDragEnd(event: DragEndEvent) {
    if (readOnly) return;
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLinks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        if (items[oldIndex].isLocked) {
          toast.error("This item is locked' position");
          return items;
        }

        startTransition(async () => {
          const updates = newItems.map((item, index) => ({
            id: item.id,
            position: index,
          }));
          await updateLinkPositions(updates);
        });

        return newItems;
      });
    }
  }

  const handleToggleLock = (id: number) => {
    if (readOnly) return;
    setLinks((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isLocked: !item.isLocked } : item
      )
    );
    startTransition(async () => {
      await toggleLock(id);
    });
  };

  const handleDelete = (id: number) => {
    if (readOnly) return;
    if (!confirm("Are you sure?")) return;
    setLinks((items) => items.filter((item) => item.id !== id));
    startTransition(async () => {
      await deleteLink(id);
    });
  };

  return (
    <div
      className={`flex flex-col gap-2 p-2 max-w-sm ${
        isPending ? "opacity-70" : ""
      }`}
    >
      <h3 className="text-lg font-semibold mb-2">
        {sessionId ? "Session Links" : "Saved Session Links"}
      </h3>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={links.map((l) => l.id)}
          strategy={verticalListSortingStrategy}
          disabled={readOnly}
        >
          {links.map((link) => (
            <SortableItem
              key={link.id}
              link={link}
              onLock={() => handleToggleLock(link.id)}
              onDelete={() => handleDelete(link.id)}
              readOnly={readOnly}
            />
          ))}
        </SortableContext>
      </DndContext>
      {links.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No saved links yet.
        </p>
      )}
    </div>
  );
}

function SortableItem({
  link,
  onLock,
  onDelete,
  readOnly,
}: {
  link: SavedLink;
  onLock: () => void;
  onDelete: () => void;
  readOnly?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.id, disabled: link.isLocked === true || readOnly });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 p-2 group"
    >
      <div
        {...attributes}
        {...listeners}
        className={`p-1 ${
          readOnly ? "" : "cursor-grab hover:bg-muted rounded"
        } ${link.isLocked && !readOnly ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <GripVertical
          className={`h-4 w-4 text-muted-foreground ${
            readOnly ? "hidden" : ""
          }`}
        />
      </div>

      <div className="relative h-10 w-16 bg-muted rounded overflow-hidden flex-shrink-0">
        {link.thumbnail ? (
          <Image
            src={link.thumbnail}
            alt={link.title || ""}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
            No Img
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{link.title || link.url}</p>
        <a
          href={link.url}
          target="_blank"
          className="text-xs text-blue-500 hover:underline truncate block"
        >
          Watch
        </a>
      </div>

      {!readOnly && (
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onLock}
          >
            {link.isLocked ? (
              <Lock className="h-3 w-3" />
            ) : (
              <Unlock className="h-3 w-3 text-muted-foreground" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:text-red-500"
            onClick={onDelete}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}
    </Card>
  );
}
