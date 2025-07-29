"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [imageError, setImageError] = useState(false);

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>You are not signed in</p>
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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold">Welcome, {session.user?.name}</h1>

      {/* Profile Image with Fallback */}
      <div className="mt-4 w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
        {hasValidImage ? (
          <img
            src={session?.user?.image || ""}
            alt="Profile"
            className="w-full h-full object-cover"
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


      <Button className="mt-6" variant="destructive" onClick={() => signOut()}>
        Sign Out
      </Button>
    </div>
  );
}
