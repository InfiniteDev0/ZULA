import PrimaryButton from "../ui/PrimaryButton";

// Step 4 — collect a star rating + note, then show the thank-you / community card.
export default function ReviewStep({
  firstName,
  drink,
  rating,
  setRating,
  reviewText,
  setReviewText,
  reviewed,
  onSubmit,
  onRestart,
}) {
  if (reviewed) {
    return (
      <section className="animate-pop flex flex-col gap-6 items-center text-center pt-8">
        <div className="text-6xl animate-float">💜</div>
        <h2 className="font-display text-cream text-4xl">Asante, {firstName}!</h2>
        <p className="text-cream/75 leading-relaxed">
          Your order&apos;s in and your review made our day. You&apos;re part of
          the ZULA community now — see you at the purple place.
        </p>
        <div className="rounded-2xl bg-white/8 px-6 py-4 text-cream/80">
          <p className="text-sm">
            Follow us for seasonal drops & source stories
          </p>
          <p className="font-display text-pink text-xl mt-1">@zula</p>
        </div>
        <button
          onClick={onRestart}
          className="text-pink/80 underline underline-offset-4 mt-2"
        >
          Start over
        </button>
      </section>
    );
  }

  return (
    <section className="animate-rise flex flex-col gap-6">
      <div className="text-center">
        <div className="text-5xl mb-2">✅</div>
        <h2 className="font-display text-cream text-3xl">Order placed!</h2>
        <p className="text-cream/70 mt-2">
          While we craft your {drink?.name}, how was ZULA today?
        </p>
      </div>

      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setRating(n)}
            className="text-4xl transition active:scale-90"
            style={{
              filter: n <= rating ? "none" : "grayscale(1)",
              opacity: n <= rating ? 1 : 0.4,
            }}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
          >
            ⭐
          </button>
        ))}
      </div>

      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        rows={3}
        placeholder="Tell us what you loved (optional)…"
        className="w-full rounded-2xl bg-white/10 border border-pink/25 px-5 py-4
          text-cream placeholder:text-cream/40 outline-none
          focus:border-pink focus:bg-white/15 transition resize-none"
      />

      <PrimaryButton disabled={rating === 0} onClick={onSubmit}>
        Send review
      </PrimaryButton>
    </section>
  );
}
