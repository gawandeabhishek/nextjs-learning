"use client";

import { UnsplashImage } from "@/models/unplash-image";
import Image from "next/image";
import { FormEvent, useState } from "react";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(
    null
  );
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [searchResultsLoadingIsError, seaSearchResultsLoadingIsError] =
    useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query")?.toString().trim();

    if (query) {
      try {
        setSearchResults(null);
        seaSearchResultsLoadingIsError(false);
        setSearchResultsLoading(true);
        const response = await fetch("/api/search?query=" + query);
        console.log(response);
        const images: UnsplashImage[] = await response.json();
        console.log("Search Results: ", images);
        setSearchResults(images);
      } catch (error) {
        console.error(error);
        seaSearchResultsLoadingIsError(true);
      } finally {
        setSearchResultsLoading(false);
      }
    }
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="query">Search:</label>
          <input
            type="text"
            id="query"
            name="query"
            placeholder="search..."
            required
          />
        </div>
        <button type="submit" disabled={searchResultsLoading}>Search</button>
      </form>

      <div className="flex flex-1 gap-4 p-4 items-center justify-center">
        {searchResultsLoading && <p>loading...</p>}
        {searchResultsLoadingIsError && (
          <p>Something went wrong please try again</p>
        )}
        {searchResults?.length === 0 && (
          <p>Nothing found try a different query</p>
        )}
      </div>
      <div className="flex flex-1 gap-4 p-4 items-center justify-center">
        {searchResults &&
          <>
            {searchResults.map((image, index) => (
              <Image
                key={index}
                src={image.urls.raw}
                alt={image.description}
                width={100}
                height={100}
              />
            ))}
          </>
        }
      </div>
    </div>
  );
}
