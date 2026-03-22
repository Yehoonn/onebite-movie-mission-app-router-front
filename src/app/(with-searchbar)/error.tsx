"use client";

import { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div
      style={{
        color: "white",
        border: "1px solid white",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
      }}
    >
      <h1>오류가 발생했습니다...</h1>
      <p>에러 상세 : {error.message}</p>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh(); // 현재 페이지에 필요한 서버 컴포넌트를 다시 불러옴
            reset(); // 에러 상태를 초기화, 컴포넌트를 다시 렌더링
          });
        }}
      >
        새로고침
      </button>
    </div>
  );
}
