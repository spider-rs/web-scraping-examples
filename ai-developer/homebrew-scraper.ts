/**
 * Homebrew Scraper
 *
 * Extract formula details, cask metadata, install counts, and version histories fr
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx homebrew-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://formulae.brew.sh/formula/");

const data = await page.extractFields({
  name: ".formula-list a",
  link: ".formula-list a",
  description: ".formula-list .desc",
  version: ".formula-list .version",
  license: ".formula-list .license",
  installs: ".formula-list .installs",
});

console.log(data);
await spider.close();
