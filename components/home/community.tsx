import type { sessionCardType } from "@/types/session-card-type";
import SessionCard from "@/components/home/session-card";

const mock: sessionCardType[] = [
  {
    thumb: [
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
    ],
    title: "video1",
    description: "description1",
  },
  {
    thumb: [
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
    ],
    title: "video2",
    description: "description2",
  },
  {
    thumb: [
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
    ],
    title: "video3",
    description: "description3",
  },
  {
    thumb: [
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
    ],
    title: "video4",
    description: "description4",
  },
  {
    thumb: [
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
    ],
    title: "video5",
    description: "description5",
  },
  {
    thumb: [
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
      "https://img.youtube.com/vi/8XwUYCj4lGc/maxresdefault.jpg",
    ],
    title: "video6",
    description: "description6",
  },
];

const Community = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl mb-6 ml-7">Community</h1>
      <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:ml-10">
        {mock.map((item, idx) => (
          <SessionCard key={`session-${idx}`} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Community;
