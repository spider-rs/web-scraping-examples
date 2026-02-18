/**
 * Copart Scraper
 *
 * Extract Copart salvage auction listings, damage descriptions, lot details, and c
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx copart-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.copart.com/lotSearchResults/?free=true&query=toyota%20camry");
await page.content();

const data = await page.evaluate(`(() => {
  const lots = [];
  document.querySelectorAll("[data-uname='lotsearchLotResult']").forEach(el => {
    const lotNum = el.querySelector("[data-uname='lotsearchLotNumberValue']")?.textContent?.trim();
    const title = el.querySelector("[data-uname='lotsearchLotyearaliasaliasaliasaliasaliasalias']")?.textContent?.trim();
    const damage = el.querySelector("[data-uname='lotsearchDamageall']")?.textContent?.trim();
    const bid = el.querySelector("[data-uname='lotsearchCurrentBid']")?.textContent?.trim();
    if (lotNum) lots.push({ lotNum, title, damage, bid });
  });
  return JSON.stringify({ total: lots.length, lots: lots.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
