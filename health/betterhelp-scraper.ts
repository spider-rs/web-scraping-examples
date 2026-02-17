/**
 * BetterHelp Scraper
 *
 * Extract therapist profiles, specialization areas, session formats, and user test
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx betterhelp-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://www.betterhelp.com/about/");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const sections = [];
  document.querySelectorAll(".content-section, .info-block").forEach(el => {
    const heading = el.querySelector("h2, h3")?.textContent?.trim();
    const text = el.querySelector("p")?.textContent?.trim();
    if (heading) sections.push({ heading, text });
  });
  return JSON.stringify({ total: sections.length, sections: sections.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
