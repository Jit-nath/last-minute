"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [imageError, setImageError] = useState(false);

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <Image
          src="/logo.png"
          alt="Last Minute Logo"
          width={80}
          height={80}
          className="object-contain"
        />
        <p className="text-lg">You are not signed in</p>
        <Button onClick={() => signIn("google")}>Sign in with Google</Button>
      </div>
    );
  }

  // Get user initials for fallback
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const hasValidImage = session.user?.image && !imageError;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10">
      <div className="mb-6">
        <Image
          src="/logo.png"
          alt="Last Minute Logo"
          width={60}
          height={60}
          className="object-contain"
        />
      </div>
      <h1 className="text-xl font-bold">Welcome, {session.user?.name}</h1>

      {/* Profile Image with Fallback */}
      <div className="relative mt-4 w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
        {hasValidImage ? (
          <Image
            src={session?.user?.image || ""}
            alt="Profile"
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            onLoad={() => setImageError(false)}
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
            {getInitials(session.user?.name)}
          </div>
        )}
      </div>

      <p className="mt-2 text-gray-600">{session.user?.email}</p>

      <div className="mt-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Saved Sessions</h2>
        <SessionList />
      </div>

      <Button className="mt-6" variant="destructive" onClick={() => signOut()}>
        Sign Out
      </Button>
    </div>
  );
}

// Separate component for async data fetching
import { getUserSessions } from "@/app/actions/session-actions";
import Link from "next/link";
import { format } from "date-fns";

async function SessionList() {
  const sessions = await getUserSessions();

  if (sessions.length === 0) {
    return (
      <p className="text-muted-foreground text-center">
        No saved sessions found.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <Link
          key={session.id}
          href={`/session/${session.shareId}`}
          className="block p-4 border rounded-lg hover:bg-muted transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{session.name}</h3>
              <p className="text-xs text-muted-foreground">
                Created{" "}
                {session.createdAt
                  ? format(session.createdAt, "PPP")
                  : "Unknown date"}
              </p>
            </div>
            {session.isPublic && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Public
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
