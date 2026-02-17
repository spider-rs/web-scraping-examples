/**
 * ChatGPT Shared Conversation Scraper
 *
 * Extract conversation turns from public ChatGPT share links —
 * role, content, and title. Handles dynamic React rendering.
 *
 * Uses `evaluate()` to iterate over conversation turn elements.
 *
 * Usage: SPIDER_API_KEY=sk-... npx tsx chatgpt-scraper.ts
 */

import { SpiderBrowser } from "spider-browser";

const spider = new SpiderBrowser({
  apiKey: process.env.SPIDER_API_KEY!,
});
await spider.connect();
const page = spider.page!;

// Replace with any public ChatGPT share link
await page.goto(
  "https://chatgpt.com/share/e/67b3a642-d014-8012-b8f1-0e2c14b221ae",
);
await page.content(12000);

const data = await page.evaluate(`(() => {
  const turns = [];
  document.querySelectorAll('[data-testid^="conversation-turn"]').forEach(article => {
    const role = article.querySelector("[data-message-author-role]")
      ?.getAttribute("data-message-author-role");
    const content = article.querySelector(".markdown")?.innerHTML
      || article.querySelector(".whitespace-pre-wrap")?.textContent;
    if (role && content) turns.push({ role, content: content.trim().slice(0, 500) });
  });
  return JSON.stringify({ title: document.title, turns });
})()`);

console.log(JSON.parse(data as string));
await spider.close();
