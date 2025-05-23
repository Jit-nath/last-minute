"use client";
import VideoSidebar from "./videoSidebar";
import { useSession } from "@/context/session";
import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import type { Session } from "@/context/session";
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
import DraggableVideoSidebar from "./videoCardSortingSidebar";

export default function Session() {
  const { sessionInfo, setSessionInfo } = useSession();
  const { user } = useUser();

  useEffect(() => {
    if (user && setSessionInfo) {
      setSessionInfo({
        ...sessionInfo,
        userId: user.id,
        userName: user.firstName || "",
      });
    }
  }, [user]);

  return (
    <>
      <Sidebar variant="inset">
        <SidebarContent className="p-2 ">
          <DraggableVideoSidebar/>
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
            <div className="flex ">
              <div className="mr-3 flex justify-center align-middle items-center w-9 h-9">
                <ThemeSwitch />
              </div>

              <DialogTrigger asChild>
                <Button>Notes</Button>
              </DialogTrigger>
            </div>
          </header>
          <div className="flex justify-center p-2">
            <iframe
              src="https://www.youtube.com/embed/fRMMSyCcTDI"
              title="YouTube Video"
              loading="lazy"
              allowFullScreen
              className={`aspect-video border w-5xl`}
            />

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Notes</DialogTitle>
                <DialogDescription>Feature in development</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </div>
        </Dialog>
      </SidebarInset>
    </>
  );
}
