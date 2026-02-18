/**
 * Hunter.io Scraper
 *
 * Extract domain email patterns, verified professional email addresses, company co
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx hunter-io-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://hunter.io/search/stripe.com");
await page.content(8000);

const data = await page.evaluate(`(() => {
  const contacts = [];
  document.querySelectorAll(".result-item, .email-result").forEach(el => {
    const name = el.querySelector(".result-name, .contact-name")?.textContent?.trim();
    const email = el.querySelector(".result-email, .email-address")?.textContent?.trim();
    const position = el.querySelector(".result-position, .job-title")?.textContent?.trim();
    const confidence = el.querySelector(".confidence-score, .score")?.textContent?.trim();
    if (name) contacts.push({ name, email, position, confidence });
  });
  return JSON.stringify({ total: contacts.length, contacts: contacts.slice(0, 15) });
})()`);

console.log(JSON.parse(data));
await spider.close();
