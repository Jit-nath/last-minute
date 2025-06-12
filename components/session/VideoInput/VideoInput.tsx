import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus } from "lucide-react";

interface VideoInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function VideoInput({
  value,
  onChange,
  onAdd,
  onKeyDown,
}: VideoInputProps) {
  return (
    <div className="flex gap-2 w-full py-2">
      <Input
        placeholder="Paste video link"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="bg-card"
      />
      <Button className="rounded-lg cursor-pointer" onClick={onAdd}>
        <CirclePlus />
      </Button>
    </div>
  );
}
