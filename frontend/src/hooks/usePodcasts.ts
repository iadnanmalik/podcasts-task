import { useState } from "react";
import { Podcast } from "@/lib/types";

export const usePodcasts = (initialPodcasts: Podcast[], initialPage = 1) => {
  const [podcasts, setPodcasts] = useState<Podcast[]>(initialPodcasts);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage); // Track current page

  const fetchPodcasts = async (query = "", page = 1, limit = 6) => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const res = await fetch(
        `/api/podcasts?search=${query}&page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("No podcasts found. Try chaning the query");
        } else {
          throw new Error("Failed to fetch podcasts");
        }
      }

      const podcasts = await res.json();
      setPodcasts(podcasts); // Assuming the response structure contains `podcasts`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(
        "Error fetching podcasts:",
        JSON.stringify(error),
        error.message
      );
      // Handle different types of errors
      if (error instanceof Error) {
        setError(error.message); // Set error message from the thrown error
      } else {
        setError("Failed to load podcasts. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { podcasts, loading, error, page, setPage, fetchPodcasts };
};
