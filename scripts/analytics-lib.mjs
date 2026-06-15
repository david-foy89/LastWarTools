/**
 * Shared Google Analytics (gtag.js) snippet for all public HTML pages.
 * Matches Google's official install snippet byte-for-byte (aside from indent).
 */
export const GA_MEASUREMENT_ID = "G-34RS45FLKS";

export function buildGtagSnippet(indent = "    ") {
  const i = indent;
  return `${i}<!-- Google tag (gtag.js) -->
${i}<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"></script>
${i}<script>
${i}  window.dataLayer = window.dataLayer || [];
${i}  function gtag(){dataLayer.push(arguments);}
${i}  gtag('js', new Date());
${i}
${i}  gtag('config', '${GA_MEASUREMENT_ID}');
${i}</script>
`;
}
