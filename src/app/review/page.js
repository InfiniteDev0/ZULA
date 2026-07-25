"use client";

import { useRouter } from "next/navigation";
import { useFlow } from "../providers/FlowProvider";
import ReviewStep from "../components/steps/ReviewStep";

export default function ReviewPage() {
  const router = useRouter();
  const { state, set, reset } = useFlow();
  const firstName = state.name.trim().split(" ")[0] || "friend";

  return (
    <ReviewStep
      firstName={firstName}
      drink={state.drink}
      rating={state.rating}
      setRating={(rating) => set({ rating })}
      reviewText={state.reviewText}
      setReviewText={(reviewText) => set({ reviewText })}
      reviewed={state.reviewed}
      onSubmit={() => set({ reviewed: true })}
      onRestart={() => {
        reset();
        router.push("/");
      }}
    />
  );
}
