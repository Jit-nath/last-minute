"use client";
import Navbar from "@/components/home/navbar";
import Search from "@/components/home/search";
import Saved from "@/components/home/saved";
import Featured from "@/components/home/featured";
import Community from "@/components/home/community";
export default function Home() {
  return (
    <>
      <main className="h-screen">
        <Navbar />
        <Saved />
        <Search />
        <Featured />
        <Community />
      </main>
    </>
  );
}
