import { formatDuration, type Episode } from "@/lib/episodes";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const EpisodeMeta = ({ episode }: { episode: Episode }) => {
  const duration = formatDuration(episode.durationSeconds);

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
      <time dateTime={episode.date}>{formatDate(episode.date)}</time>
      {duration && (
        <>
          <span aria-hidden>•</span>
          <span>{duration}</span>
        </>
      )}
      {episode.guest && (
        <>
          <span aria-hidden>•</span>
          <span className="text-primary">{episode.guest}</span>
        </>
      )}
    </div>
  );
};

export default EpisodeMeta;
