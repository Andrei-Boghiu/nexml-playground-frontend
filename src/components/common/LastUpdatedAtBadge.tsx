import { useEffect, useState } from "react";
import { timeSinceUpdate } from "@/utils/timeSinceUpdate.util";
import { Badge } from "@/components/ui/badge";

export type LastUpdatedAtBadgeProps = {
  dataUpdatedAt: number;
};

export default function LastUpdatedAtBadge({ dataUpdatedAt }: LastUpdatedAtBadgeProps) {
  const [trigger, setTrigger] = useState(false);
  const diffSeconds = timeSinceUpdate(dataUpdatedAt);
  const diffMinutes = Math.floor(diffSeconds / 60);

  let display: string;

  if (diffSeconds < 60) {
    display = "just now";
  } else if (diffMinutes <= 10) {
    display = `~${diffMinutes}m ago`;
  } else {
    display = ">10m ago";
  }

  useEffect(() => {
    const tenMinutes = 600;
    const refreshRate = diffSeconds < tenMinutes ? 10_000 : 60_000;

    const timer = setTimeout(() => setTrigger((v) => !v), refreshRate);

    return () => clearTimeout(timer);
  }, [trigger, diffSeconds]);

  return <Badge variant="secondary">Last updated: {display}</Badge>;
}
