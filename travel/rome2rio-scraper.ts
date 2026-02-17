/**
 * Rome2Rio Scraper
 *
 * Extract multi-modal route comparisons, transit options, durations, and fare esti
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx rome2rio-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.rome2rio.com/s/London/Paris");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const routes = [];
  document.querySelectorAll(".SearchResultRoute").forEach(el => {
    const mode = el.querySelector(".TransportModeName")?.textContent?.trim();
    const duration = el.querySelector(".RouteDuration")?.textContent?.trim();
    const price = el.querySelector(".RoutePrice")?.textContent?.trim();
    const provider = el.querySelector(".ProviderName")?.textContent?.trim();
    if (mode) routes.push({ mode, duration, price, provider });
  });
  return JSON.stringify({ total: routes.length, routes: routes.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
