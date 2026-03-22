import MovieItemSkeleton from "./movie-item-skeleton";

export default function BookListSkeleton({ count }: { count: number }) {
  return new Array(count)
    .fill(0)
    .map((_, index) => <MovieItemSkeleton key={index} />);
}
