import { TRUST_ITEMS } from "@/content/campaigns";

/**
 * Four marks of trust, each one verifiable against the practice's own
 * material. Nothing here is a claim about outcomes.
 */
export function TrustBar() {
  return (
    <section className="border-y border-sand/70 bg-linen-deep">
      <div className="shell py-8">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-5 text-center lg:grid-cols-4">
          {TRUST_ITEMS.map((item) => (
            <li
              key={item}
              className="text-[0.9rem] font-medium leading-snug text-espresso"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
