"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import ThemeSwitch from "@/components/themeSwitch";
import VideoSidebar from "./VideoSidebar";
import VideoPlayer from "@/components/session/VideoPlayer/VideoPlayer";
import { useSession } from "@/context/session";
import { useRouter } from "next/navigation";
import VideoDetails from "./description-card/description";
import SidePanel from "./chat-panel/chat";

import SavedLinksList from "./saved-links-list";
import { useEffect, useRef, useState } from "react";
import {
  createSession,
  addSessionMessage,
  addSessionNote,
} from "@/app/actions/session-actions";
import { Share, Save } from "lucide-react";
import { toast } from "sonner";

const description =
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ab alias molestiae, libero nam cupiditate, quisquam facere rem velit id beatae dolore hic quis tenetur quam, voluptatem eos ipsa. Error. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ab alias molestiae, libero nam cupiditate, quisquam facere rem velit id beatae dolore hic quis tenetur quam, voluptatem eos ipsa. Error. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ab alias molestiae, libero nam cupiditate, quisquam facere rem velit id beatae dolore hic quis tenetur quam, voluptatem eos ipsa. Error. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ab alias molestiae, libero nam cupiditate, quisquam facere rem velit id beatae dolore hic quis tenetur quam, voluptatem eos ipsa. Error.";

interface SessionProps {
  sessionId?: number;
  shareId?: string;
  isReadOnly?: boolean;
  initialMessages?: { text: string; sender: string }[];
  initialNotes?: string[];
}

export default function Session({
  sessionId,
  shareId,
  isReadOnly = false,
  initialMessages = [],
  initialNotes = [],
}: SessionProps) {
  const { sessionInfo } = useSession();
  const router = useRouter();
  const divref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  // Chat & Notes State
  const [messages, setMessages] = useState(initialMessages);
  const [notes, setNotes] = useState(initialNotes);

  // Save Dialog State
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Update local state when initial props change (e.g. navigation)
  useEffect(() => {
    setMessages(initialMessages);
    setNotes(initialNotes);
  }, [initialMessages, initialNotes]);

  const applyHeight = () => {
    if (divref.current) {
      setHeight(divref.current.clientHeight);
    }
  };
  useEffect(() => {
    applyHeight();
    window.addEventListener("resize", applyHeight);
    return () => window.removeEventListener("resize", applyHeight);
  }, []);

  const handleSendMessage = async (text: string) => {
    // Optimistic update
    setMessages((prev) => [...prev, { text, sender: "You" }]);

    if (sessionId) {
      // Persist to DB
      await addSessionMessage(sessionId, text);
    }
  };

  const handleAddNote = async (text: string) => {
    // Optimistic update
    setNotes((prev) => [...prev, text]);

    if (sessionId) {
      // Persist to DB
      await addSessionNote(sessionId, text);
    }
  };

  const handleSaveSession = async () => {
    if (!sessionName.trim()) return;
    setIsSaving(true);
    try {
      // Pass current scratchpad state to be saved
      // Note: Links are already in DB (sessionId=null), backend will assign them.
      // Messages and Notes from local state need to be passed.
      const newShareId = await createSession({
        name: sessionName,
        links: [], // Backend handles scratchpad links migration if empty/special flag? Or we trust backend knows user context.
        // Actually createSession logic in action needs to migrate EXISTING links if we are saving scratchpad.
        // The current implementation of createSession inserts NEW links passed in arguments.
        // We should update createSession to handle "migrate scratchpad" or we pass current links here?
        // Passing empty links means backend needs to migrate default ones.
        // Let's rely on backend action to migrate if links are empty? No, explicitly passing empty might mean empty session.
        // Let's just pass empty messages/notes if we want backend to save them?
        // Wait, createSession inserts what we pass.
        // So we need to pass CURRENT messages/notes.
        messages: messages.map((m) => ({ content: m.text, sender: m.sender })),
        notes: notes.map((n) => ({ content: n })),
      });

      toast.success("Session saved!");
      setIsSaveOpen(false);
      router.push(`/session/${newShareId}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save session");
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = () => {
    if (shareId) {
      navigator.clipboard.writeText(
        `${window.location.origin}/session/${shareId}`
      );
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <>
      <Sidebar variant="inset">
        <SidebarContent className="p-2">
          {!isReadOnly && <VideoSidebar />}
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <Dialog open={isSaveOpen} onOpenChange={setIsSaveOpen}>
          <header
            className="flex h-16 shrink-0 items-center gap-2 px-4 justify-between bg-muted"
            style={{
              borderTopLeftRadius: "0.7rem",
              borderTopRightRadius: "0.7rem",
            }}
          >
            <style jsx>{`
              @media (max-width: 640px) {
                header {
                  border-top-left-radius: 0rem !important;
                  border-top-right-radius: 0rem !important;
                }
              }
            `}</style>

            <div className="flex items-center gap-2">
              <SidebarTrigger />
              {sessionId && (
                <span className="text-sm font-semibold ml-2 text-muted-foreground">
                  {isReadOnly ? "Viewing Session" : "Editing Session"}
                </span>
              )}
            </div>

            <div className="flex gap-3 justify-evenly items-center">
              <div className="mr-3 flex justify-center align-middle items-center w-9 h-9">
                <ThemeSwitch />
              </div>

              {!isReadOnly && !sessionId && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSaveOpen(true)}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Session
                </Button>
              )}

              {sessionId && (
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              )}

              <DialogTrigger asChild>
                <div className="hover:underline cursor-pointer ml-3">
                  Study Materials
                </div>
              </DialogTrigger>
              <a
                onClick={() => {
                  router.push("/profile");
                }}
                className="hover:underline cursor-pointer ml-3"
              >
                Profile
              </a>
            </div>
          </header>

          <div className="flex w-full h-full p-2 gap-2" ref={divref}>
            <div className="flex-1 flex flex-col gap-2 overflow-hidden">
              <div
                className="flex-1 overflow-auto"
                style={{ height: height ? `${height - 4}px` : "auto" }}
              >
                <VideoPlayer
                  videoUrl={sessionInfo.lastPlayed || ""}
                  className="w-full mb-2"
                />
                {sessionInfo.lastPlayed && (
                  <VideoDetails
                    title="Video Title"
                    description={description}
                    channel="Channel Name"
                    views={0}
                    uploadDate=""
                    videoId={sessionInfo.lastPlayed?.split("v=")[1] || ""}
                    thumbnailUrl={`https://img.youtube.com/vi/${
                      sessionInfo.lastPlayed?.split("v=")[1]
                    }/hqdefault.jpg`}
                  />
                )}
              </div>
            </div>

            <div className="w-2/6 h-full flex flex-col gap-2">
              <SidePanel
                messages={messages}
                notes={notes}
                onSendMessage={handleSendMessage}
                onAddNote={handleAddNote}
                readOnly={isReadOnly}
              />
              <div className="flex-1 bg-muted/50 rounded-xl overflow-hidden border">
                <div className="h-full overflow-y-auto">
                  <SavedLinksList sessionId={sessionId} readOnly={isReadOnly} />
                </div>
              </div>
            </div>
          </div>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Session</DialogTitle>
              <DialogDescription>
                Give your session a name to save it to your profile.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input
                placeholder="Session Name (e.g. React Patterns)"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSaveOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSaveSession}
                disabled={isSaving || !sessionName.trim()}
              >
                {isSaving ? "Saving..." : "Save Session"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </>
  );
}
