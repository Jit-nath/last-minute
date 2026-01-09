import Session from "@/components/session/session";
import { getSharedSession } from "@/app/actions/session-actions";
import { notFound } from "next/navigation";
import { SessionProvider } from "@/context/session";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function SharedSessionPage({
  params,
}: {
  params: Promise<{ shareId: string }>;
}) {
  const { shareId } = await params;
  const sessionData = await getSharedSession(shareId);

  if (!sessionData) {
    notFound();
  }

  // Transform data for Session component
  const initialMessages = sessionData.messages.map((m) => ({
    text: m.content,
    sender: m.sender || "Unknown",
  }));

  const initialNotes = sessionData.notes.map((n) => n.content);

  const isReadOnly = !sessionData.isAuthor;

  return (
    <SessionProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "21rem",
          } as React.CSSProperties
        }
      >
        <Session
          sessionId={sessionData.id}
          shareId={sessionData.shareId}
          isReadOnly={isReadOnly}
          initialMessages={initialMessages}
          initialNotes={initialNotes}
        />
        <Toaster closeButton richColors />
      </SidebarProvider>
    </SessionProvider>
  );
}
