"use client";
import React from "react";
import { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import { Podcast } from "@/lib/types";
import Image from "next/image";
import { usePodcasts } from "@/hooks/usePodcasts";

export default function PodcastList({
  initialPodcasts,
}: {
  initialPodcasts: Podcast[];
}) {
  const { podcasts, loading, error, page, setPage, fetchPodcasts } =
    usePodcasts(initialPodcasts);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [searching, setSearching] = useState(false);

  // Debounced search function
  const debouncedSearch = debounce((query: string) => {
    fetchPodcasts(query, page);
  }, 500);

  // Effect to handle debounced search
  useEffect(() => {
    if (searchTerm) {
      setSearching(true);
      debouncedSearch(searchTerm);
    } else if (searching === true) {
      setSearching(true);
      fetchPodcasts("", page);
    }
  }, [searchTerm, page]);

  // Handle going to the next or previous page
  const handleNextPage = () => {
    setSearching(true);
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search podcasts..."
        className="border p-2 mb-4 w-full rounded"
      />

      {/* Loading State */}
      {loading ? (
        <p>Loading podcasts...</p>
      ) : error ? (
        <p className="text-red-500">
          {error === "No podcasts found"
            ? "No podcasts found. Please try a different search."
            : error}
        </p>
      ) : podcasts.length === 0 ? (
        <p>No podcasts available.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {podcasts?.map((podcast: Podcast) => (
              <div key={podcast.id} className="border p-4 rounded">
                <Image
                  src={podcast.images.featured}
                  alt={podcast.title}
                  width={300}
                  height={160}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
                <h2 className="text-xl font-semibold">{podcast.title}</h2>
                <p className="text-gray-500">{podcast.categoryName}</p>
                <p>{podcast.description}</p>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`px-4 py-2 rounded ${
                page === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
            >
              Previous
            </button>

            <p>Page {page}</p>

            <button
              onClick={handleNextPage}
              className={`px-4 py-2 rounded  ${
                podcasts.length < 6 ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
