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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ThemeSwitch from "@/components/themeSwitch";
import VideoSidebar from "./VideoSidebar";
import VideoPlayer from "@/components/session/VideoPlayer/VideoPlayer";
import { useSession } from "@/context/session";

export default function Session() {
  const { sessionInfo } = useSession();

  return (
    <>
      <Sidebar variant="inset">
        <SidebarContent className="p-2">
          <VideoSidebar />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <Dialog>
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

            <SidebarTrigger />

            <div className="flex">
              <div className="mr-3 flex justify-center align-middle items-center w-9 h-9">
                <ThemeSwitch />
              </div>
              <DialogTrigger asChild>
                <Button>Notes</Button>
              </DialogTrigger>
            </div>
          </header>

          <div className="flex justify-center p-4">
            <VideoPlayer
              videoUrl={sessionInfo.lastPlayed || ""}
              className="w-full max-w-4xl"
            />
          </div>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Notes</DialogTitle>
              <DialogDescription>Feature in development</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </>
  );
}
