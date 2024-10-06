import React from "react";
import PodcastList from "@/components/PodcastList";
import { Podcast } from "@/lib/types";

// Server Component
export default async function HomePage() {
  const res = await fetch("http://localhost:3001/api/podcasts?&page=1&limit=6");

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }

  const podcasts: Podcast[] = await res.json();

  return (
    <>
      {" "}
      <PodcastList initialPodcasts={podcasts} />
    </>
  );
}
