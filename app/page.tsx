"use client";
import Navbar from "@/components/home/navbar";
import Search from "@/components/home/search";
import Saved from "@/components/home/saved";
import Featured from "@/components/home/featured";
export default function Home() {
  return (
    <>
      <main className="h-screen">
        <Navbar />
        <Saved />
        <Search />
        <Featured />
      </main>
    </>
  );
}
