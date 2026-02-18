/**
 * Politico Scraper
 *
 * Extract political news, policy analysis, and congressional coverage from Politic
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx politico-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://www.politico.com/news/2024/01/10/congress-spending-deal");

const data = await page.extractFields({
  headline: "h1, .headline",
  author: ".story-meta__authors a",
  date: "time[datetime]",
  dek: ".dek, .story-meta__dek",
  body: ".story-text, .article__content",
  image: { selector: ".fig-graphic img, figure img", attribute: "src" },
});

console.log(data);
await spider.close();
