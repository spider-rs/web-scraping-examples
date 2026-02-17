/**
 * Slack App Directory Scraper
 *
 * Extract app listings, categories, install counts, and compatibility info from th
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx slack-app-directory-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.connect();
const page = spider.page!;
await page.goto("https://slack.com/apps/category/At0MQP5BEF-project-management");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const apps = [];
  document.querySelectorAll("[data-qa='app_card']").forEach(el => {
    const name = el.querySelector("[data-qa='app_name']")?.textContent?.trim();
    const description = el.querySelector("[data-qa='app_short_description']")?.textContent?.trim();
    const installs = el.querySelector("[data-qa='app_installs']")?.textContent?.trim();
    const category = el.querySelector("[data-qa='app_category']")?.textContent?.trim();
    if (name) apps.push({ name, description, installs, category });
  });
  return JSON.stringify({ total: apps.length, apps: apps.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
