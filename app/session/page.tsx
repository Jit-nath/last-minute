import { SessionProvider } from "@/context/session";
import Session from "./session";
import { Toaster } from "sonner";

export default function page() {
  return (
    <SessionProvider>
      <Session />
      <Toaster closeButton richColors />
    </SessionProvider>
  );
}
