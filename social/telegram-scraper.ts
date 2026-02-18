/**
 * Telegram Scraper
 *
 * Extract public channel posts, group info, and message previews from Telegram web
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx telegram-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
  stealth: 2,
});

await spider.init();
const page = spider.page!;
await page.goto("https://t.me/s/durov");
await page.content(10000);

const data = await page.evaluate(`(() => {
  const messages = [];
  document.querySelectorAll(".tgme_widget_message_wrap").forEach(el => {
    const text = el.querySelector(".tgme_widget_message_text")?.textContent?.trim();
    const views = el.querySelector(".tgme_widget_message_views")?.textContent?.trim();
    const date = el.querySelector(".tgme_widget_message_date time")?.getAttribute("datetime");
    if (text) messages.push({ text: text.slice(0, 500), views, date });
  });
  return JSON.stringify({ total: messages.length, messages: messages.slice(0, 10) });
})()`);

console.log(JSON.parse(data));
await spider.close();
