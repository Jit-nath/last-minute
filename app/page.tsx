"use client";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
export default function Home() {
  const router = useRouter();
  return (
    <>
      <nav className="flex justify-between p-4 bg-muted fixed top-0 w-screen">
        <h1 className="text-2xl sm:text-3xl">Last Minute</h1>
        <div className="flex justify-between gap-4">
          <Button
            variant="default"
            className="cursor-pointer hidden sm:block"
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
      <main className="flex justify-center items-center align-middle border flex-col gap-3 h-screen">
        <span className="">No saved session</span>
        <Button
          variant="default"
          className="cursor-pointer sm:hidden"
          onClick={() => {
            router.push("/session");
          }}
        >
          Create Session
        </Button>
      </main>
    </>
  );
}
