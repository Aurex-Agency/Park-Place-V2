import { MotionProvider } from "@/components/site/MotionProvider";

/**
 * The shell for advertising landing pages.
 *
 * Everything the website proper wears is absent here on purpose: no
 * navigation, no shared FAQ block, no location section, no mobile action bar.
 * A visitor who arrives from an advertisement has one decision to make, and
 * every link that is not the call or the form is a way to not make it.
 *
 * The header and footer are rendered by each page through CampaignShell
 * rather than here, because each page carries its own call tracking number
 * and the layout of a static route cannot know which page it is wrapping.
 */
export default function CampaignLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <MotionProvider>{children}</MotionProvider>;
}
