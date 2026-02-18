/**
 * Streamlit Scraper
 *
 * Extract component API docs, community app galleries, changelog entries, and tuto
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx streamlit-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://docs.streamlit.io/develop/api-reference");
await page.content(8000);

const data = await page.extractFields({
  title: "h1",
  sections: "article h2",
  components: "article h3 a",
  descriptions: "article p",
  codeExamples: "article pre code",
  navItems: "[class*='sidebar'] a",
});

console.log(data);
await spider.close();
