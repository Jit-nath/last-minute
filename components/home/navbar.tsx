import ThemeSwitch from "@/components/themeSwitch";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <nav className="flex justify-between p-4 bg-muted/80 fixed top-0 w-screen backdrop-blur-3xl backdrop-saturate-200">
      <h1 className="text-2xl sm:text-3xl">Last Minute</h1>
      <div className="flex justify-between gap-4">
        <div className="w-6 m-auto text-center mr-4  mt-2">
          <ThemeSwitch />
        </div>
        <Button
          variant="default"
          className="cursor-pointer hidden sm:block"
          onClick={() => {
            router.push("/session");
          }}
        >
          Create Session
        </Button>

        {/* puth auth here */}
        {status !== "authenticated" ? (
          <Button onClick={() => signIn("google")}> Signin</Button>
        ) : (
          <div
            className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center"
            onClick={() => {
              router.push("/profile");
            }}
          >
            <img
              src={session?.user?.image || ""}
              alt="Profile"
              className="w- h-8 object-cover"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
