"use client";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
export default function Home() {
  const router = useRouter();
  return (
    <>
      <nav className="flex justify-between p-4 bg-muted">
        <h1 className="text-3xl">Last Minute</h1>
        <div className="flex justify-between gap-2">
          <Button
            variant="default"
            className="cursor-pointer"
            onClick={() => {
              router.push("/session");
            }}
          >
            Create Session
          </Button>
          <SignedOut>
            <Button asChild className="cursor-pointer">
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
      <main></main>
    </>
  );
}
