/**
 * Tells Bing, and everyone else reading the IndexNow feed, what changed.
 *
 * Google ignores IndexNow. Bing, Copilot, Yandex, Seznam and Naver do not, and
 * Copilot in particular is one of the AI surfaces this practice is trying to
 * appear in. Submitting is a single unauthenticated POST whose only credential
 * is a key file served from the site's own root, which is how the receiving end
 * knows the submitter controls the domain.
 *
 * Run after a deploy that changed content:
 *
 *     npm run indexnow                      # everything in the sitemap
 *     npm run indexnow -- /veterans /locations   # only these paths
 *
 * Submitting the whole sitemap is fine and is what the no-argument form does;
 * IndexNow accepts up to 10,000 URLs per request and rate-limits by domain
 * rather than by URL count, so there is nothing to be gained by trimming it by
 * hand. Pass paths only when you know exactly what changed.
 */

const KEY = "3ee2d3a0f7d0c8146328a0d71096a006";
const HOST = "parkplacedentist.com";
const ORIGIN = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";

async function urlsFromSitemap() {
  const response = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!response.ok) {
    throw new Error(`sitemap returned ${response.status}`);
  }
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

async function main() {
  const paths = process.argv.slice(2);
  const urlList = paths.length
    ? paths.map((path) => `${ORIGIN}${path.startsWith("/") ? path : `/${path}`}`)
    : await urlsFromSitemap();

  if (urlList.length === 0) {
    console.error("Nothing to submit.");
    process.exitCode = 1;
    return;
  }

  /* The key file has to be reachable before the submission is worth making:
     if it 404s, the endpoint accepts the request and silently discards it. */
  const keyCheck = await fetch(`${ORIGIN}/${KEY}.txt`);
  if (!keyCheck.ok) {
    console.error(
      `Key file is not reachable at ${ORIGIN}/${KEY}.txt (${keyCheck.status}).\n` +
        "Deploy before submitting, or the submission is discarded without an error.",
    );
    process.exitCode = 1;
    return;
  }

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `${ORIGIN}/${KEY}.txt`,
      urlList,
    }),
  });

  // 200 and 202 both mean accepted; 202 means the key is still being verified.
  if (response.ok) {
    console.log(`Submitted ${urlList.length} URLs (${response.status}).`);
  } else {
    console.error(`IndexNow returned ${response.status}: ${await response.text()}`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
