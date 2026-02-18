/**
 * HomeGuide Scraper
 *
 * Extract verified contractor quotes, service pricing comparisons, and neighborhoo
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx homeguide-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://homeguide.com/costs/landscaping-cost");
await page.content(10000);

const data = await page.extractFields({
  project: "h1",
  avgCost: ".cost-range__average",
  lowCost: ".cost-range__low",
  highCost: ".cost-range__high",
  factors: ".cost-factors__list",
  image: { selector: ".cost-hero__image img", attribute: "src" },
});

console.log(data);
await spider.close();
