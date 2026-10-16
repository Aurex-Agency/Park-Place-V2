import type { ReactNode } from "react";
import { BrandLockup } from "@/components/ui/MetalMark";
import { practice } from "@/lib/content";
import { phoneFor } from "@/content/campaigns";

/**
 * Header, main and footer for an advertising landing page.
 *
 * The header is the logo and the telephone number, nothing else. The logo is
 * deliberately not a link: on the website a logo goes home, and here home is
 * somewhere the advertisement did not pay to send anyone.
 *
 * The footer carries the address, the number and the hours, because a local
 * visitor checking whether a practice is real and nearby needs those three
 * facts, and nothing more.
 */
export function CampaignShell({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const phone = phoneFor(slug);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:shadow-md"
      >
        Skip to content
      </a>

      <header className="border-b border-sand/70 bg-linen">
        <div className="shell flex items-center justify-between gap-4 py-4">
          <BrandLockup className="shrink-0" />
          <a
            href={phone.href}
            data-call-placement="header"
            className="tap-inline shrink-0 text-[0.95rem] font-medium text-rose-deep underline underline-offset-4 md:text-[1.05rem] md:no-underline"
          >
            <span className="hidden md:inline">Call </span>
            {phone.display}
          </a>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer className="border-t border-sand/70 bg-walnut text-linen">
        <div className="shell py-10">
          <div className="flex flex-col gap-3 text-[0.95rem] leading-relaxed sm:flex-row sm:items-start sm:justify-between sm:gap-10">
            <p className="text-linen/85">{practice.address.full}</p>
            <p>
              <a
                href={phone.href}
                data-call-placement="footer"
                className="tap-inline font-medium text-rose-soft underline underline-offset-4"
              >
                {phone.display}
              </a>
            </p>
            <p className="text-linen/85">{practice.hours}</p>
          </div>
          <p className="mt-8 text-[0.8rem] text-linen/60">
            Park Place Dental, {practice.address.city}, {practice.address.region}
          </p>
        </div>
      </footer>
    </>
  );
}
