/**
 * Ansible Galaxy Scraper
 *
 * Extract role metadata, collection details, download counts, and platform compati
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx ansible-galaxy-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://galaxy.ansible.com/ui/standalone/roles/");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const roles = [];
  document.querySelectorAll("[class*='RoleCard'], [class*='list-item'], tr").forEach(el => {
    const name = el.querySelector("a[href*='roles/'], td:first-child a")?.textContent?.trim();
    const namespace = el.querySelector("[class*='namespace'], td:nth-child(2)")?.textContent?.trim();
    const downloads = el.querySelector("[class*='download'], td:nth-child(3)")?.textContent?.trim();
    const desc = el.querySelector("[class*='description'], td:nth-child(4)")?.textContent?.trim();
    if (name) roles.push({ name, namespace, downloads, desc });
  });
  return JSON.stringify({ total: roles.length, roles: roles.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
