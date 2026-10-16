import { phoneFor } from "@/content/campaigns";

/**
 * The telephone call to action, and the most important element on any of these
 * pages. Local search intent converts on the phone far more than on a form, so
 * this is sized and coloured to be the obvious thing to press.
 *
 * Full width on a phone, which is where most of this traffic lands. The
 * `data-call-placement` attribute is read by CallTracking, so a call from the
 * hero can be told apart from one at the foot of the page.
 */
export function CallButton({
  slug,
  placement,
  size = "default",
  className = "",
}: {
  slug: string;
  placement: string;
  size?: "default" | "huge";
  className?: string;
}) {
  const phone = phoneFor(slug);
  const sizing =
    size === "huge"
      ? "px-8 py-6 text-[1.35rem] md:text-[1.6rem] gap-3.5"
      : "px-7 py-4 text-[1.05rem] gap-3";

  return (
    <a
      href={phone.href}
      data-call-placement={placement}
      className={`btn btn-primary w-full justify-center font-medium sm:w-auto ${sizing} ${className}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M6.6 3.2 8 6.1 6.3 7.8a9.5 9.5 0 0 0 5.9 5.9l1.7-1.7 2.9 1.4v3a1.4 1.4 0 0 1-1.5 1.4A14.9 14.9 0 0 1 2.2 4.1 1.4 1.4 0 0 1 3.6 2.6h3Z"
          fill="currentColor"
        />
      </svg>
      Call {phone.display}
    </a>
  );
}
