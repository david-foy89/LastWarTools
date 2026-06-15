/**
 * Shared Google Analytics (gtag.js) snippet for all public HTML pages.
 */
export const GA_MEASUREMENT_ID = "G-34RS45FLKS";

export function buildGtagSnippet(indent = "    ") {
  const i = indent;
  return `${i}<!-- Google tag (gtag.js) -->
${i}<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"></script>
${i}<script src="/google-analytics-config.js"></script>
`;
}
