"use client";

import { getViewCount } from "@/payload/collections/Blogs/actions";
import { useEffect, useState } from "react";

export default function BlogViews({
  slug,
  increment = false,
}: {
  slug: string;
  increment?: boolean;
}) {
  const [views, setViews] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const get = async () => {
      try {
        const count = await getViewCount(slug, increment);
        setViews(count);
      } catch {
        setError("Failed to fetch view count");
      }
    };
    get();
  }, [slug, increment]);

  if (error) return <span>Error</span>;
  return <span>{views}</span>;
}
