import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { posts, findPost } from "@/content/posts";
import { practice, doctor } from "@/lib/content";
import { canonical } from "@/lib/site";
import { articleGraph } from "@/lib/schema";
import { JsonLd } from "@/components/site/JsonLd";
import { PostBlocks } from "@/components/page/PostBlocks";
import { CtaBand } from "@/components/page/CtaBand";
import { FaqSection } from "@/components/site/FaqSection";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};
  const path = `/patient-resources/blog/${post.slug}`;
  return {
    title: post.seoTitle,
    description: post.metaDescription,
    alternates: { canonical: canonical(path) },
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      url: path,
      type: "article",
      publishedTime: post.published,
      modifiedTime: post.updated,
      authors: [doctor.name],
      images: [post.image],
    },
    twitter: {
      title: post.seoTitle,
      description: post.metaDescription,
      images: [post.image],
    },
  };
}

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  const path = `/patient-resources/blog/${post.slug}`;
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Patient Resources", href: "/patient-resources" },
    { label: "Articles", href: "/patient-resources/blog" },
    { label: post.title },
  ];
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        graph={articleGraph({
          path,
          headline: post.title,
          description: post.metaDescription,
          published: post.published,
          modified: post.updated,
          image: post.image,
          crumbs,
          faqs: post.faqs,
        })}
      />

      <article>
        <header className="section pb-0">
          <div className="shell">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.85rem] text-taupe">
                {crumbs.map((crumb, i) => (
                  <li key={crumb.label} className="flex items-center gap-2">
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="tap-inline transition-colors hover:text-rose-deep"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-espresso">
                        {crumb.label}
                      </span>
                    )}
                    {i < crumbs.length - 1 && (
                      <span aria-hidden="true" className="text-sand-deep">
                        /
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            <div className="max-w-3xl">
              {/* Above the fold: CSS entrances, so nothing waits on hydration
                  to become visible. See globals.css. */}
              <div className="page-in">
                <Eyebrow>{post.topic}</Eyebrow>
              </div>
              <h1 className="page-in page-in-1 t-h1 mt-6 text-balance">
                {post.title}
              </h1>
              <p className="page-in page-in-2 mt-6 text-[1.05rem] leading-relaxed text-taupe">
                {post.summary}
              </p>
              <p className="page-in page-in-3 mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.875rem] text-taupe">
                  <span>
                    By{" "}
                    <Link
                      href="/about-us/meet-the-dentist"
                      className="tap-inline font-medium text-rose-deep underline underline-offset-4"
                    >
                      {doctor.name}, {doctor.credential}
                    </Link>
                  </span>
                  <span aria-hidden="true" className="text-sand-deep">
                    ·
                  </span>
                  <time dateTime={post.published}>
                    {formatDate(post.published)}
                  </time>
                  <span aria-hidden="true" className="text-sand-deep">
                    ·
                  </span>
                <span>{post.readingMinutes} min read</span>
              </p>
            </div>

            {/*
              The direct answer, first thing on the page.

              A reader who only reads this should have what they came for, and
              an assistant quoting one paragraph should quote this one. It is
              set apart deliberately rather than buried in the opening prose.
            */}
            <div className="page-in page-in-3 mt-12 max-w-3xl rounded-[var(--radius-card)] border border-sand bg-white p-7 shadow-[var(--shadow-sm)] md:p-9">
                <p className="t-eyebrow text-rose-deep">The short answer</p>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-espresso">
                {post.answer}
              </p>
            </div>

            <div className="relative mt-12 aspect-[16/9] max-w-4xl overflow-hidden rounded-[var(--radius-card)]">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 60vw"
                className="object-cover"
              />
            </div>
          </div>
        </header>

        <div className="section">
          <div className="shell">
            <PostBlocks blocks={post.blocks} />

            <Reveal>
              <div className="mt-16 max-w-2xl border-t border-sand pt-8">
                <p className="text-[0.9rem] leading-relaxed text-taupe">
                  Written and reviewed by {doctor.name}, {doctor.credential}, who
                  has practised dentistry in Booneville since 1982. This article
                  is general information, not a diagnosis or a treatment plan for
                  your particular situation. For advice about your own teeth,
                  call the practice on{" "}
                  <a
                    href={practice.phoneHref}
                    className="tap-inline font-medium text-rose-deep underline underline-offset-4"
                  >
                    {practice.phone}
                  </a>
                  .
                </p>
              </div>
            </Reveal>

            <div className="mt-14">
              <Reveal>
                <Eyebrow as="h2">Read next</Eyebrow>
              </Reveal>
              <RevealGroup
                as="ul"
                gap={0.06}
                className="mt-6 flex flex-wrap gap-3"
              >
                {post.related.map((item) => (
                  <RevealItem as="li" key={item.href}>
                    <Link
                      href={item.href}
                      className="btn btn-outline !px-5 !py-2.5 !text-[0.9rem]"
                    >
                      {item.label}
                    </Link>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </article>

      <FaqSection
        items={post.faqs}
        eyebrow="Questions"
        heading={`More on / ${post.topic.toLowerCase()}`}
        showAllLink={false}
      />

      <section className="section bg-linen-deep">
        <div className="shell">
          <Reveal>
            <Eyebrow as="h2">More articles</Eyebrow>
          </Reveal>
          <RevealGroup
            as="ul"
            gap={0.07}
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {others.map((other) => (
              <RevealItem as="li" key={other.slug} className="h-full">
                <Link
                  href={`/patient-resources/blog/${other.slug}`}
                  className="card group flex h-full translate-y-0 flex-col transition-[translate,scale,box-shadow] duration-[550ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:-translate-y-2 hover:shadow-[var(--shadow-lg)]"
                >
                  <p className="t-eyebrow text-rose-deep">{other.topic}</p>
                  <h3 className="t-h3 mt-3 text-[1.1rem] transition-colors duration-[450ms] group-hover:text-rose-deep">
                    {other.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-taupe">
                    {other.summary}
                  </p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand
        heading="Still have a question we have not answered?"
        body={`Call the practice on ${practice.phone}. We would rather talk it through than have you guess.`}
      />
    </>
  );
}
