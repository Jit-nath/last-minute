import ThemeSwitch from "@/components/themeSwitch";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <nav className="flex justify-between p-4 bg-muted/80 fixed top-0 w-screen backdrop-blur-3xl backdrop-saturate-200 z-50">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Last Minute Logo"
          width={60}
          height={20}
          className="object-contain"
        />
      </div>
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
            className="relative w-8 h-8 rounded-full overflow-hidden flex items-center justify-center"
            onClick={() => {
              router.push("/profile");
            }}
          >
            <Image
              src={session?.user?.image || ""}
              alt="Profile"
              fill
              className="object-cover"
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
