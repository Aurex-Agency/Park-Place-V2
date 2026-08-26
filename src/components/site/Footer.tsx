import Link from "next/link";
import { nav, practice } from "@/lib/content";
import { MetalLockup } from "@/components/ui/MetalMark";

export function Footer() {
  const year = 2026;

  return (
    <footer className="bg-walnut text-linen">
      <div className="shell py-20">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_2fr]">
          {/* Brand and contact */}
          <div>
            <MetalLockup width={128} />

            <address className="mt-8 not-italic text-[1.0125rem] leading-relaxed text-linen/75">
              <a
                href={practice.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-rose-soft"
              >
                {practice.address.street}
                <br />
                {practice.address.city}, {practice.address.region}{" "}
                {practice.address.postalCode}
              </a>

              <a
                href={practice.phoneHref}
                className="mt-5 block font-[family-name:var(--font-display)] text-2xl text-linen transition-colors hover:text-rose-soft"
              >
                {practice.phone}
              </a>

              <a
                href={practice.emailHref}
                className="mt-2 block transition-colors hover:text-rose-soft"
              >
                {practice.email}
              </a>
            </address>

            <div className="mt-6 text-[0.975rem] text-linen/70">
              <p>{practice.hours}</p>
              <p className="mt-1 text-linen/65">{practice.hoursNote}</p>
            </div>
          </div>

          {/* Sitemap */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {nav
              .filter((group) => group.children.length > 0)
              .map((group) => (
                <div key={group.label}>
                  <h2 className="whitespace-nowrap font-[family-name:var(--font-brand)] text-[0.8rem] font-medium uppercase tracking-[0.2em] text-rose-soft">
                    {group.label}
                  </h2>
                  <ul className="mt-4 flex flex-col gap-1">
                    {group.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block py-1 text-[0.975rem] text-linen/70 transition-colors hover:text-linen"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>

        <hr className="metal-rule mt-16 opacity-70" />

        <div className="mt-8 flex flex-col gap-4 text-[0.875rem] text-linen/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {practice.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6">
            <Link href="/privacy-policy" className="block py-1 transition-colors hover:text-linen">
              Privacy Policy
            </Link>
            <Link href="/accessibility" className="block py-1 transition-colors hover:text-linen">
              Accessibility
            </Link>
            <Link href="/contact-us" className="block py-1 transition-colors hover:text-linen">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
