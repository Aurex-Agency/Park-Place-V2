/**
 * One place where structured data is written into the document.
 *
 * The graph is built in `src/lib/schema.ts` and already serialised there, with
 * `<` escaped, so nothing here can close the script tag early.
 */
export function JsonLd({ graph }: { graph: string }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: graph }}
    />
  );
}
