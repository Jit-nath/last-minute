"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>You are not signed in</p>
        <Button onClick={() => signIn("google")}>Sign in with Google</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold">Welcome, {session.user?.name}</h1>
      <img
        src={session.user?.image ?? ""}
        alt="Profile"
        className="rounded-full mt-4 w-24 h-24"
      />
      <p>{session.user?.email}</p>
      <button
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
}
