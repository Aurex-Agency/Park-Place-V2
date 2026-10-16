import type { Campaign } from "@/content/campaigns";
import { CampaignForm } from "@/components/campaign/CampaignForm";

/** The closing block on every page that has a form. */
export function FormSection({ campaign }: { campaign: Campaign }) {
  if (!campaign.form) return null;
  return (
    <section id="request" className="scroll-mt-6 bg-linen-deep py-16 md:py-24">
      <div className="shell-narrow">
        <h2 className="t-h2 text-center">{campaign.form.headline}</h2>
        <div className="mt-10 rounded-[var(--radius-card)] bg-white p-7 shadow-[var(--shadow-sm)] md:p-10">
          <CampaignForm campaign={campaign} />
        </div>
      </div>
    </section>
  );
}
