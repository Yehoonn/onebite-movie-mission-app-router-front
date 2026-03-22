"use client";

import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review.action";
import { useActionState, useEffect } from "react";

export default function ReviewEditor({ id }: { id: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null,
  );

  useEffect(() => {
    if (state && !state.status && state.error) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section style={{ color: "white", marginTop: "20px" }}>
      <form className={style.form_container} action={formAction}>
        <input type="hidden" name="id" value={id} readOnly></input>
        <textarea
          disabled={isPending}
          required
          name="content"
          placeholder="리뷰 내용"
        ></textarea>
        <div className={style.submit_container}>
          <input
            disabled={isPending}
            required
            name="author"
            placeholder="리뷰 작성자"
          ></input>
          <button disabled={isPending} type="submit">
            {isPending ? "..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
