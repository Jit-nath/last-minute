import { useState, useEffect } from "react";
import { Title, Thumb } from "@/lib/youtube";

export function useVideoData(link: string) {
  const [title, setTitle] = useState<string>("Loading...");
  const [thumbnail, setThumbnail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadVideoData() {
      try {
        setIsLoading(true);
        setError(null);

        const [fetchedTitle, fetchedThumb] = await Promise.all([
          Title(link),
          Promise.resolve(Thumb(link)),
        ]);

        setTitle(fetchedTitle || "Untitled");
        setThumbnail(fetchedThumb || "");
      } catch (err) {
        setError("Failed to load video data");
        setTitle("Error loading title");
      } finally {
        setIsLoading(false);
      }
    }

    loadVideoData();
  }, [link]);

  return { title, thumbnail, isLoading, error };
}
