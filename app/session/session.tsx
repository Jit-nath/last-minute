"use client";
import VideoSidebar from "./videoSidebar";
import { useSession } from "@/context/session";
import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

export default function Session() {
  const { sessionInfo } = useSession();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "21rem",
        } as React.CSSProperties
      }
    >
      <Sidebar variant="floating">
        <SidebarContent className="p-2 bg-muted ">
          <VideoSidebar />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </header>
        {sessionInfo?.lastPlayed ? (
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/fRMMSyCcTDI"
            title=""
            loading="lazy"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="text-center">No Video selected</div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
