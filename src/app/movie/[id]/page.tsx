import { notFound } from "next/navigation";
import style from "./page.module.css";
import { MovieData, ReviewData } from "@/types";
import { Suspense } from "react";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
  );

  if (!response.ok) {
    notFound();
  }

  const movies = await response.json();

  return movies.map((movie: MovieData) => ({ id: String(movie.id) }));
}

async function MovieDetail({ id }: { id: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${id}`,
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const movie = await response.json();

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${movie.posterImgUrl}')` }}
      >
        <img src={movie.posterImgUrl} />
      </div>
      <div className={style.title}>{movie.title}</div>
      <div className={style.information}>{movie.releaseDate}</div>
      <div className={style.information}>
        {movie.genres.map((genre: string) => genre).join(", ")}
      </div>
      <div className={style.information}>{movie.runtime}분</div>
      <div className={style.information}>{movie.company}</div>
      <div className={style.subTitle}>{movie.subTitle}</div>
      <div className={style.description}>{movie.description}</div>
    </div>
  );
}

async function ReviewList({ id }: { id: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/movie/${id}`,
    { next: { tags: [`review-${id}`] } },
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error(`Review fetch failed : ${response.statusText}`);
  }

  const reviews = await response.json();

  return (
    <section style={{ color: "white", marginTop: "20px" }}>
      {reviews.map((review: ReviewData) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MovieDetail id={id} />
      <ReviewEditor id={id} />
      <ReviewList id={id} />
    </Suspense>
  );
}
