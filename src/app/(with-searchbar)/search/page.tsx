import MovieItem from "@/components/movie-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { MovieData } from "@/types";
import { Suspense } from "react";

async function SearchResult({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
    { cache: "force-cache" },
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const searchMovies = await response.json();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 3fr))",
        gap: "16px",
      }}
    >
      {searchMovies.map((movie: MovieData) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  return (
    <Suspense
      key={params.q ?? ""}
      fallback={
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 3fr))",
            gap: "16px",
          }}
        >
          <BookListSkeleton count={3} />
        </div>
      }
    >
      <SearchResult searchParams={searchParams} />
    </Suspense>
  );
}
