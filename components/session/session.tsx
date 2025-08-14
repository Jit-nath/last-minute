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

import ThemeSwitch from "@/components/themeSwitch";
import VideoSidebar from "./VideoSidebar";
import VideoPlayer from "@/components/session/VideoPlayer/VideoPlayer";
import { useSession } from "@/context/session";
import { useRouter } from "next/navigation";
import VideoDetails from "./description-card/description";
import SidePanel from "./chat-panel/chat";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useRef, useState } from "react";

const description = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ab alias molestiae, libero nam cupiditate, quisquam facere rem velit id beatae dolore hic quis tenetur quam, voluptatem eos ipsa. Error. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ab alias molestiae, libero nam cupiditate, quisquam facere rem velit id beatae dolore hic quis tenetur quam, voluptatem eos ipsa. Error. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ab alias molestiae, libero nam cupiditate, quisquam facere rem velit id beatae dolore hic quis tenetur quam, voluptatem eos ipsa. Error. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ab alias molestiae, libero nam cupiditate, quisquam facere rem velit id beatae dolore hic quis tenetur quam, voluptatem eos ipsa. Error.";

export default function Session() {
  const { sessionInfo } = useSession();
  const router = useRouter();
  const divref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  const applyHeight = () => {
    if (divref.current) {
      setHeight(divref.current.clientHeight);
    }
  };
  useEffect(() => {

    applyHeight();

  }, [divref.current]);

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



            <div className="flex gap-3 justify-evenly items-center">
              <div className="mr-3 flex justify-center align-middle items-center w-9 h-9">
                <ThemeSwitch />
              </div>
              <DialogTrigger asChild>
                <div className="hover:underline cursor-pointer">Study Meterials</div>
              </DialogTrigger>
              <a onClick={() => { router.push("/profile") }} className="hover:underline cursor-pointer ml-3">
                Profile
              </a>
            </div>

          </header>

          <div className="flex w-full h-full p-2 gap-2" ref={divref}>

            {!sessionInfo.lastPlayed && (
              <VideoPlayer videoUrl={""} className="m-auto md:w-xl" />
            )}

            {sessionInfo.lastPlayed && (
              <>
                <ScrollArea className="w-4/6" style={{ height: height ? `${height - 4}px` : "auto" }}>
                  <VideoPlayer
                    videoUrl={sessionInfo.lastPlayed || ""}
                    className="w-full mb-2"
                  />
                  <VideoDetails
                    title="I was wrong about GPT-5"
                    description={description}
                    channel="Theo T3.gg"
                    views={23_222}
                    uploadDate="August 14 2025"
                  />

                </ScrollArea>

                <div className="w-2/6 h-full">
                  <SidePanel />
                </div>
              </>
            )}

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

const rightMenu = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span className="font-medium">Settings</span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium">Help</span>
      </div>
    </div>
  );
};
