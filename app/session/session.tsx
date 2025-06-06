"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
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
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
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
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 justify-between">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
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
