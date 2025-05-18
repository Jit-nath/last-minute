"use client";

import { useState, useEffect } from "react";
import { PlusCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface VideoItem {
  id: string;
  title: string;
  url: string;
}

export default function StudyPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile and set defaults
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile); // Close sidebar by default on mobile
    };

    // Check on initial load
    checkIsMobile();

    // Add resize listener
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Extract YouTube video ID from URL
  const extractVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Add a new video to the list
  const addVideo = () => {
    if (!newVideoUrl.trim()) return;

    const videoId = extractVideoId(newVideoUrl);
    if (!videoId) {
      alert("Please enter a valid YouTube URL");
      return;
    }

    const newVideo = {
      id: videoId,
      title: `Video ${videos.length + 1}`,
      url: newVideoUrl,
    };

    setVideos([...videos, newVideo]);
    setNewVideoUrl("");

    if (videos.length === 0) {
      setCurrentVideo(newVideo);
    }

    // On mobile, auto-close sidebar when adding a video
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const selectVideo = (video: VideoItem) => {
    setCurrentVideo(video);
    // On mobile, auto-close sidebar when selecting a video
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b p-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">Study Page</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden"
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - conditionally shown on mobile */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } md:block w-full md:w-80 lg:w-96 border-r flex-shrink-0 flex flex-col absolute md:relative z-10 bg-background h-[calc(100%-4rem)] md:h-auto`}
        >
          <div className="p-4 flex gap-2">
            <Input
              placeholder="Paste YouTube URL"
              value={newVideoUrl}
              onChange={(e) => setNewVideoUrl(e.target.value)}
              className="flex-1"
            />
            <Button size="icon" onClick={addVideo}>
              <PlusCircle className="h-4 w-4" />
              <span className="sr-only">Add video</span>
            </Button>
          </div>

          <Separator />

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-3">
              {videos.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Add YouTube videos to start studying
                </p>
              ) : (
                videos.map((video) => (
                  <div
                    key={video.id}
                    className={`p-3 rounded-md cursor-pointer${
                      currentVideo?.id === video.id
                        ? "bg-muted"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => selectVideo(video)}
                  >
                    <div className="relative border w-80">
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-auto rounded-md mb-2"
                        loading="lazy"
                      />
                    </div>
                    <div className="font-medium truncate w-80">
                      {video.title}
                    </div>
                    <div className="text-xs text-muted-foreground truncate w-80">
                      {video.url}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </aside>

        {/* Main content area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {currentVideo ? (
            <>
              <div className="w-full">
                <div className="aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentVideo.id}`}
                    title={currentVideo.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="p-4 flex-1 overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg md:text-xl font-semibold">Notes</h2>
                  {isMobile && (
                    <Button variant="outline" size="sm" onClick={toggleSidebar}>
                      Videos
                    </Button>
                  )}
                </div>
                <Textarea
                  placeholder="Take notes here..."
                  className="flex-1 resize-none"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
              <p className="text-muted-foreground mb-4">
                Select a video from the sidebar to start studying
              </p>
              {isMobile && !sidebarOpen && (
                <Button onClick={toggleSidebar}>Open Video List</Button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
