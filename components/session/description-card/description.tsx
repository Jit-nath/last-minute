export default function VideoDetails({ title, description, channel, views, uploadDate }:{ title: string; description: string; channel: string; views: number; uploadDate: string; }) {
  return (
    <div className="bg-secondary text-primary-foreground p-4 rounded-lg">
      {/* Title */}
      <h2 className="text-lg font-semibold">{title}</h2>

      {/* Channel and meta */}
      <div className="text-sm text-primary-foreground flex gap-4 mt-1">
        <span>{channel}</span>
        <span>{views} views</span>
        <span>{uploadDate}</span>
      </div>

      {/* Description */}
      <p className="text-secondary-foreground mt-3 whitespace-pre-line text-sm">
        {description}
      </p>
    </div>
  );
}
