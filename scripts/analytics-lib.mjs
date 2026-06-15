/**
 * Shared Google Analytics (gtag.js) snippet for all public HTML pages.
 * GT-5R3WG7DP is the Google tag ID; G-34RS45FLKS is the GA4 measurement ID.
 * New GA setup wizards detect the GT- ID in the install snippet.
 */
export const GA_TAG_ID = "GT-5R3WG7DP";
export const GA_MEASUREMENT_ID = "G-34RS45FLKS";

export function buildGtagSnippet(indent = "    ") {
  const i = indent;
  return `${i}<!-- Google tag (gtag.js) -->
${i}<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_TAG_ID}"></script>
${i}<script>
${i}  window.dataLayer = window.dataLayer || [];
${i}  function gtag(){dataLayer.push(arguments);}
${i}  gtag('js', new Date());
${i}
${i}  gtag('config', '${GA_TAG_ID}');
${i}</script>
`;
}
