/**
 * Terraform Registry Scraper
 *
 * Extract provider details, module documentation, resource schemas, and version hi
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx terraform-registry-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});

await spider.init();
const page = spider.page!;
await page.goto("https://registry.terraform.io/browse/providers");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const providers = [];
  document.querySelectorAll("[class*='provider-card'], [class*='ProviderCard']").forEach(el => {
    const name = el.querySelector("h3, [class*='name']")?.textContent?.trim();
    const desc = el.querySelector("p, [class*='description']")?.textContent?.trim();
    const downloads = el.querySelector("[class*='downloads']")?.textContent?.trim();
    const version = el.querySelector("[class*='version']")?.textContent?.trim();
    if (name) providers.push({ name, desc, downloads, version });
  });
  return JSON.stringify({ total: providers.length, providers: providers.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
