export const dateTimeFromStampFormatter = (timestamp: number) =>
  new Intl.DateTimeFormat("en-US", {
    // dateStyle: "short",
    // timeStyle: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "numeric",
    timeZone: "America/New_York",
    timeZoneName: "short",
    hourCycle: "h24",
  }).format(new Date(timestamp * 1000));
