import { reviewsFor } from "@/content/google-reviews";

/**
 * Trust block built from the practice's own Google reviews.
 *
 * Each page gets the reviews that speak to what that page sells: the one
 * about a next day emergency appointment goes on the emergency page, the one
 * that mentions a crown placed the same day goes on the crowns page. A
 * relevant review from a named stranger does more work than a generic five
 * star wall.
 *
 * No star average and no link out to the profile. The practice sits at 3.9,
 * and sending paid traffic to that number would undo what the page just did.
 * The quotes are real and attributed; the aggregate is simply not the story
 * worth telling here.
 */
export function GoogleReviewsSection({
  page,
  heading = "What our patients say",
  limit = 3,
  tone = "light",
}: {
  page: string;
  heading?: string;
  limit?: number;
  tone?: "light" | "deep";
}) {
  const reviews = reviewsFor(page, limit);
  if (!reviews.length) return null;

  const surface = tone === "deep" ? "bg-linen" : "bg-white";
  const card = tone === "deep" ? "bg-white" : "bg-linen";

  return (
    <section className={`${surface} py-16 md:py-20`}>
      <div className="shell">
        <h2 className="t-h2 text-center">{heading}</h2>
        <p className="mt-3 text-center text-[0.9rem] text-taupe">
          Reviews from our Google Business Profile
        </p>

        <div
          className={`mt-11 grid gap-7 ${
            reviews.length === 1 ? "mx-auto max-w-2xl" : "md:grid-cols-3"
          }`}
        >
          {reviews.map((review) => (
            <figure
              key={review.name}
              className={`flex flex-col rounded-[var(--radius-card)] ${card} p-7 shadow-[var(--shadow-sm)]`}
            >
              <Stars />
              <blockquote className="mt-4 flex-1 text-[1rem] leading-relaxed text-espresso">
                {review.quote}
              </blockquote>
              <figcaption className="mt-5 text-[0.9rem] font-medium text-espresso">
                {review.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Five filled stars. Every review shown here is a five star review. */
function Stars() {
  return (
    <span className="flex gap-1" role="img" aria-label="Rated 5 out of 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M10 1.6l2.4 5 5.5.8-4 3.8.95 5.5L10 14.1l-4.85 2.6.95-5.5-4-3.8 5.5-.8z"
            fill="var(--color-rose-deep)"
          />
        </svg>
      ))}
    </span>
  );
}
