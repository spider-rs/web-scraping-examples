/**
 * Times of India Scraper
 *
 * Extract Indian news, cricket scores, and Bollywood coverage from Times of India
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx timesofindia-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://timesofindia.indiatimes.com/india/budget-2024-highlights");

const data = await page.extractFields({
  headline: "h1[itemprop='headline'], h1",
  author: "[itemprop='author'] a, [rel='author']",
  date: "time[datetime], [itemprop='datePublished']",
  summary: "[itemprop='description'], .article-desc, meta[name='description']",
  body: "[itemprop='articleBody'], [data-articlebody], article",
  city: ".byline-city, [itemprop='contentLocation']",
  image: { selector: "[itemprop='image'] img, article img", attribute: "src" },
});

console.log(data);
await spider.close();
