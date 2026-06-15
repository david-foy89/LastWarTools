/**
 * Rebuild season-* redirect stub HTML with a single valid <head> + AdSense script.
 */
import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const adsenseScript = `  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1014488780102797"
     crossorigin="anonymous"></script>`;

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (name.endsWith(".html")) files.push(full);
  }
  return files;
}

function isRedirectStub(html) {
  return (
    /Redirecting/i.test(html) &&
    /http-equiv="refresh"/i.test(html) &&
    !/<div class="page"/i.test(html)
  );
}

function extractUrl(html) {
  const canon = html.match(
    /rel=["']canonical["'][^>]*href=["']([^"']+)["']/i,
  ) || html.match(/href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  if (canon) return canon[1].trim();
  const refresh = html.match(/content=["']0;\s*url=([^"']+)["']/i);
  if (refresh) return refresh[1].trim();
  const loc = html.match(/window\.location\.href\s*=\s*["']([^"']+)["']/);
  if (loc) return loc[1].trim();
  return null;
}

function buildRedirect(url) {
  const esc = url.replace(/"/g, "&quot;");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex, nofollow" />
  <link rel="stylesheet" href="/adsense.css" />
${adsenseScript}
  <title>Redirecting…</title>
  <link rel="canonical" href="${esc}" />
  <meta http-equiv="refresh" content="0; url=${esc}" />
  <script>
    window.location.href = "${url.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}";
  </script>
</head>
<body>
  <p>
    Redirecting to
    <a href="${esc}">${esc}</a>...
  </p>
  <script src="/site-legal-footer.js?v=4" defer></script>
</body>
</html>
`;
}

let fixed = 0;
for (const file of walk(root)) {
  const html = fs.readFileSync(file, "utf8");
  if (!isRedirectStub(html)) continue;
  const url = extractUrl(html);
  if (!url) {
    console.warn("Skip (no URL):", path.relative(root, file));
    continue;
  }
  const next = buildRedirect(url);
  if (next !== html) {
    fs.writeFileSync(file, next);
    fixed++;
    console.log("Fixed", path.relative(root, file));
  }
}

console.log(`Done. Fixed ${fixed} redirect stub(s).`);
