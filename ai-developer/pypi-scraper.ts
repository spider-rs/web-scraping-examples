/**
 * PyPI Scraper
 *
 * Extract Python package metadata, version history, download statistics, and depen
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx pypi-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://pypi.org/project/requests/");

const data = await page.extractFields({
  name: ".package-header__name",
  version: ".package-header__name",
  description: ".package-description__summary",
  author: "[class*='author'] a",
  license: "[class*='license'] p",
  requires: ".package-header__pip-instructions input",
});

console.log(data);
await spider.close();
