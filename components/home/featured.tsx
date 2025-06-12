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

const Featured = () => {


  return (
    <div>
      <div className="text-xl ml-4 sm:ml-12 mt-5 mb-0">Featured</div>

      <div className="relative">
        <div
          className="overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide"
        >
          <div className="flex gap-4 px-16 py-4 min-w-max">
            {mock.map((item, idx) => (
              <div key={idx} className="flex-shrink-0">
                <SessionCard {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none; /* Internet Explorer 10+ */
          scrollbar-width: none; /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
      `}</style>
    </div>
  );
};

export default Featured;
