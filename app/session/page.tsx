import { SessionProvider } from "@/context/session";
import Session from "../../components/session/session";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function page() {
  return (
    <SessionProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "21rem",
          } as React.CSSProperties
        }
      >
        <Session />
        <Toaster closeButton richColors />
      </SidebarProvider>
    </SessionProvider>
  );
}
