import style from "./page.module.css";
import { MovieData } from "@/types";
import MovieItem from "@/components/movie-item";

async function AllMovies() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    { cache: "force-cache" },
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allMovies = await response.json();

  return (
    <>
      {allMovies.map((movie: MovieData) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </>
  );
}

async function RecoMovies() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    { next: { revalidate: 3 } },
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const recoBooks = await response.json();

  return (
    <>
      {recoBooks.map((movie: MovieData) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </>
  );
}

export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div>
          <RecoMovies />
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div>
          <AllMovies />
        </div>
      </section>
    </div>
  );
}
