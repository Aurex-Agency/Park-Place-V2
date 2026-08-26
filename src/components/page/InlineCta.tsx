import { practice } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * A quiet CTA for the middle of a long page, so a reader who is convinced part
 * way down does not have to scroll to the end to act.
 */
export function InlineCta({
  heading,
  body,
}: {
  heading: string;
  body?: string;
}) {
  return (
    <Reveal>
      <aside className="relative isolate overflow-hidden rounded-[1.25rem] bg-rose-wash p-8 ring-1 ring-sand/70 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="max-w-xl">
            <h2 className="t-h3">{heading}</h2>
            {body && <p className="mt-3 text-taupe">{body}</p>}
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <Button href="/book-an-appointment" variant="primary">
              Book an appointment
            </Button>
            <Button href={practice.phoneHref} variant="outline">
              Call {practice.phone}
            </Button>
          </div>
        </div>
      </aside>
    </Reveal>
  );
}
