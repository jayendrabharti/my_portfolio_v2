export interface FormatTimestampOptions {
  timestamp: string | number | Date;
  format?: 1 | 2;
}

export const formatTimestamp = (
  timestamp: FormatTimestampOptions["timestamp"],
  format: FormatTimestampOptions["format"] = 1
): string | null => {
  if (!timestamp) return null;

  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm: "am" | "pm" = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0)

  if (format == 2) {
    return `${month} ${day}, ${year}`;
  }
  return `${day} ${month} ${year} • ${hours}:${minutes} ${ampm}`;
};
