import Link from "next/link";
import { postsByDate } from "@/content/posts";

/** Contextual links connect treatment research to a service, in both directions. */
export function PatientGuides({ servicePaths }: { servicePaths?: readonly string[] }) {
  const guides = postsByDate.filter((post) =>
    !servicePaths || post.related.some((link) => servicePaths.includes(link.href)),
  ).slice(0, 3);
  if (!guides.length) return null;
  return (
    <section className="section bg-linen-deep" aria-label="Patient guides">
      <div className="shell">
        <p className="t-eyebrow text-rose-deep">Before your visit</p>
        <h2 className="t-h2 mt-4 max-w-2xl">Answers to help you plan your care</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {guides.map((post) => (
            <li key={post.slug} className="card">
              <p className="t-eyebrow text-rose-deep">{post.topic}</p>
              <h3 className="t-h3 mt-3">
                <Link href={`/patient-resources/blog/${post.slug}`} className="underline decoration-sand underline-offset-4 hover:text-rose-deep">
                  {post.title}
                </Link>
              </h3>
              <p className="mt-4 text-taupe">{post.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
