"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import ThemeSwitch from "@/components/themeSwitch";
import SessionsGrid from "./sessions";
import { Input } from "@/components/ui/input";
export default function Home() {
  const router = useRouter();
  return (
    <>
      <nav className="flex justify-between p-4 bg-muted/80 fixed top-0 w-screen backdrop-blur-3xl backdrop-saturate-200">
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
          <div className="sm:hidden flex justify-center align-middle">
            <ThemeSwitch />
          </div>

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
      <main className="h-screen">
        <div className="flex justify-center items-center align-middle flex-col gap-3 mt-20">
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
        </div>
        <div className="felx flex-col items-center align-middle justify-center mt-10">
          <div className="flex flex-col justify-center align-middle items-center gap-5">
            <Input className="w-md m-auto h-12" placeholder="Search" />
            <Button className=" w-md">Search</Button>
          </div>

          <SessionsGrid />
        </div>
      </main>
      <footer
        className="fixed bottom-0 left-0 w-full h-8 bg-muted backdrop-blur-sm sm:flex items-center px-2 hidden"
        style={{ zIndex: 50 }}
      >
        <ThemeSwitch />
      </footer>
    </>
  );
}
