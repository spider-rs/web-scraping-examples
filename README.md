# Web Scraping Examples

100 ready-to-run web scraping scripts for popular websites, organized by category. Built with [spider-browser](https://github.com/spider-rs/spider-browser) — a browser automation SDK with stealth mode and anti-bot bypass.

## Quick Start

```bash
npm install
SPIDER_API_KEY=sk-... npx tsx ecommerce/amazon-scraper.ts
```

Get a free API key at [spider.cloud](https://spider.cloud).

## Examples

### E-Commerce

| Script | Target | Method | Fields |
|--------|--------|--------|--------|
| [amazon-scraper.ts](ecommerce/amazon-scraper.ts) | amazon.com | `extractFields()` | Title, price, rating, reviews, availability, image |
| [walmart-scraper.ts](ecommerce/walmart-scraper.ts) | walmart.com | `extractFields()` | Name, price, rating, fulfillment |
| [ebay-scraper.ts](ecommerce/ebay-scraper.ts) | ebay.com | `evaluate()` | Title, price, shipping, condition |
| [target-scraper.ts](ecommerce/target-scraper.ts) | target.com | `extractFields()` | Name, price, rating, fulfillment |
| [costco-scraper.ts](ecommerce/costco-scraper.ts) | costco.com | `evaluate()` | Name, price, rating |
| [homedepot-scraper.ts](ecommerce/homedepot-scraper.ts) | homedepot.com | `extractFields()` | Name, price, model, rating, reviews |
| [bestbuy-scraper.ts](ecommerce/bestbuy-scraper.ts) | bestbuy.com | `evaluate()` | Name, price, rating |
| [etsy-scraper.ts](ecommerce/etsy-scraper.ts) | etsy.com | `evaluate()` | Name, price, shop |
| [wayfair-scraper.ts](ecommerce/wayfair-scraper.ts) | wayfair.com | `evaluate()` | Name, price, rating |
| [nike-scraper.ts](ecommerce/nike-scraper.ts) | nike.com | `evaluate()` | Name, subtitle, price |
| [nordstrom-scraper.ts](ecommerce/nordstrom-scraper.ts) | nordstrom.com | `evaluate()` | Brand, name, price |
| [aliexpress-scraper.ts](ecommerce/aliexpress-scraper.ts) | aliexpress.com | `evaluate()` | Name, price, orders, rating |
| [newegg-scraper.ts](ecommerce/newegg-scraper.ts) | newegg.com | `evaluate()` | Name, price, rating |
| [lowes-scraper.ts](ecommerce/lowes-scraper.ts) | lowes.com | `evaluate()` | Name, price, rating |
| [shopify-scraper.ts](ecommerce/shopify-scraper.ts) | shopify stores | `evaluate()` | Name, price, link |

### Search

| Script | Target | Method | Fields |
|--------|--------|--------|--------|
| [google-search-scraper.ts](search/google-search-scraper.ts) | google.com | `evaluate()` | Title, URL, snippet, featured snippet |
| [google-play-scraper.ts](search/google-play-scraper.ts) | play.google.com | `extractFields()` | App name, developer, rating, genre |
| [google-maps-scraper.ts](search/google-maps-scraper.ts) | google.com/maps | `evaluate()` | Name, rating, info |
| [google-shopping-scraper.ts](search/google-shopping-scraper.ts) | google.com/shopping | `evaluate()` | Name, price, merchant, rating |
| [google-scholar-scraper.ts](search/google-scholar-scraper.ts) | scholar.google.com | `evaluate()` | Title, authors, snippet, citations |
| [bing-scraper.ts](search/bing-scraper.ts) | bing.com | `evaluate()` | Title, URL, snippet |

### Jobs

| Script | Target | Method | Fields |
|--------|--------|--------|--------|
| [google-jobs-scraper.ts](jobs/google-jobs-scraper.ts) | google.com/jobs | `evaluate()` | Title, company, location |
| [indeed-scraper.ts](jobs/indeed-scraper.ts) | indeed.com | `evaluate()` | Title, company, location, salary |
| [glassdoor-scraper.ts](jobs/glassdoor-scraper.ts) | glassdoor.com | `evaluate()` | Review title, rating, pros, cons |
| [linkedin-jobs-scraper.ts](jobs/linkedin-jobs-scraper.ts) | linkedin.com/jobs | `evaluate()` | Title, company, location, posted |
| [ziprecruiter-scraper.ts](jobs/ziprecruiter-scraper.ts) | ziprecruiter.com | `evaluate()` | Title, company, location, salary |
| [monster-scraper.ts](jobs/monster-scraper.ts) | monster.com | `evaluate()` | Title, company, location |
| [dice-scraper.ts](jobs/dice-scraper.ts) | dice.com | `evaluate()` | Title, company, location, posted |
| [wellfound-scraper.ts](jobs/wellfound-scraper.ts) | wellfound.com | `evaluate()` | Company, title, salary, location |

### Travel

| Script | Target | Method | Fields |
|--------|--------|--------|--------|
| [expedia-scraper.ts](travel/expedia-scraper.ts) | expedia.com | `evaluate()` | Hotel name, price, rating |
| [airbnb-scraper.ts](travel/airbnb-scraper.ts) | airbnb.com | `evaluate()` | Title, price/night, rating |
| [tripadvisor-scraper.ts](travel/tripadvisor-scraper.ts) | tripadvisor.com | `evaluate()` | Name, rating, reviews, cuisine |
| [booking-scraper.ts](travel/booking-scraper.ts) | booking.com | `evaluate()` | Name, price, score, location |
| [hotels-scraper.ts](travel/hotels-scraper.ts) | hotels.com | `evaluate()` | Name, price, rating |
| [kayak-scraper.ts](travel/kayak-scraper.ts) | kayak.com | `evaluate()` | Name, price, rating |
| [skyscanner-scraper.ts](travel/skyscanner-scraper.ts) | skyscanner.com | `evaluate()` | Airline, price, times, duration |
| [google-flights-scraper.ts](travel/google-flights-scraper.ts) | google.com/travel | `evaluate()` | Airline, times, duration, price |
| [vrbo-scraper.ts](travel/vrbo-scraper.ts) | vrbo.com | `evaluate()` | Name, price, rating |
| [trivago-scraper.ts](travel/trivago-scraper.ts) | trivago.com | `evaluate()` | Name, price, rating |

### Real Estate

| Script | Target | Method | Fields |
|--------|--------|--------|--------|
| [zillow-scraper.ts](real-estate/zillow-scraper.ts) | zillow.com | `evaluate()` | Address, price, details |
| [realtor-scraper.ts](real-estate/realtor-scraper.ts) | realtor.com | `evaluate()` | Address, price, beds, baths, sqft |
| [redfin-scraper.ts](real-estate/redfin-scraper.ts) | redfin.com | `evaluate()` | Address, price, stats |
| [trulia-scraper.ts](real-estate/trulia-scraper.ts) | trulia.com | `evaluate()` | Address, price, details |
| [apartments-scraper.ts](real-estate/apartments-scraper.ts) | apartments.com | `evaluate()` | Name, price, beds, address |
| [compass-scraper.ts](real-estate/compass-scraper.ts) | compass.com | `evaluate()` | Address, price, details |
| [loopnet-scraper.ts](real-estate/loopnet-scraper.ts) | loopnet.com | `evaluate()` | Name, price, type, location |

### News

| Script | Target | Method | Fields |
|--------|--------|--------|--------|
| [google-news-scraper.ts](news/google-news-scraper.ts) | news.google.com | `evaluate()` | Headline, source, time |
| [bbc-news-scraper.ts](news/bbc-news-scraper.ts) | bbc.com | `evaluate()` | Headline, link |
| [cnn-scraper.ts](news/cnn-scraper.ts) | cnn.com | `evaluate()` | Headline, link |
| [reuters-scraper.ts](news/reuters-scraper.ts) | reuters.com | `evaluate()` | Headline, time, link |
| [techcrunch-scraper.ts](news/techcrunch-scraper.ts) | techcrunch.com | `evaluate()` | Headline, author, time, link |
| [hackernews-scraper.ts](news/hackernews-scraper.ts) | news.ycombinator.com | `evaluate()` | Title, URL, score, author |
| [verge-scraper.ts](news/verge-scraper.ts) | theverge.com | `evaluate()` | Headline, author, link |
| [bloomberg-scraper.ts](news/bloomberg-scraper.ts) | bloomberg.com | `evaluate()` | Headline, link |

### Media

| Script | Target | Method | Fields |
|--------|--------|--------|--------|
| [youtube-scraper.ts](media/youtube-scraper.ts) | youtube.com | `extractFields()` | Title, channel, views, date, description |
| [twitch-scraper.ts](media/twitch-scraper.ts) | twitch.tv | `evaluate()` | Title, streamer, viewers |
| [spotify-scraper.ts](media/spotify-scraper.ts) | open.spotify.com | `evaluate()` | Track, artist, duration |
| [imdb-scraper.ts](media/imdb-scraper.ts) | imdb.com | `evaluate()` | Title, rating, year |
| [rottentomatoes-scraper.ts](media/rottentomatoes-scraper.ts) | rottentomatoes.com | `evaluate()` | Title, tomatometer, audience |
| [goodreads-scraper.ts](media/goodreads-scraper.ts) | goodreads.com | `evaluate()` | Title, author, rating |
| [soundcloud-scraper.ts](media/soundcloud-scraper.ts) | soundcloud.com | `evaluate()` | Title, artist |
| [tiktok-scraper.ts](media/tiktok-scraper.ts) | tiktok.com | `evaluate()` | Description, author, likes |

### Social

| Script | Target | Method | Fields |
|--------|--------|--------|--------|
| [reddit-scraper.ts](social/reddit-scraper.ts) | reddit.com | `evaluate()` | Title, score, comments, author |
| [linkedin-scraper.ts](social/linkedin-scraper.ts) | linkedin.com | `extractFields()` | Company name, industry, size, description |
| [twitter-scraper.ts](social/twitter-scraper.ts) | x.com | `evaluate()` | Tweet text, time, likes, retweets |
| [pinterest-scraper.ts](social/pinterest-scraper.ts) | pinterest.com | `evaluate()` | Title, image |
| [quora-scraper.ts](social/quora-scraper.ts) | quora.com | `evaluate()` | Question, answer, author |
| [facebook-scraper.ts](social/facebook-scraper.ts) | facebook.com | `evaluate()` | Post text, time |
| [instagram-scraper.ts](social/instagram-scraper.ts) | instagram.com | `evaluate()` | Profile, posts |
| [threads-scraper.ts](social/threads-scraper.ts) | threads.net | `evaluate()` | Post text, time |

### Reviews

| Script | Target | Method | Fields |
|--------|--------|--------|--------|
| [yelp-scraper.ts](reviews/yelp-scraper.ts) | yelp.com | `evaluate()` | Name, rating, reviews, categories |
| [trustpilot-scraper.ts](reviews/trustpilot-scraper.ts) | trustpilot.com | `evaluate()` | Title, text, rating, author |
| [g2-scraper.ts](reviews/g2-scraper.ts) | g2.com | `evaluate()` | Name, rating, reviews |
| [capterra-scraper.ts](reviews/capterra-scraper.ts) | capterra.com | `evaluate()` | Name, rating, reviews |
| [producthunt-scraper.ts](reviews/producthunt-scraper.ts) | producthunt.com | `evaluate()` | Name, tagline, votes |
| [bbb-scraper.ts](reviews/bbb-scraper.ts) | bbb.org | `evaluate()` | Name, rating, location |
| [consumeraffairs-scraper.ts](reviews/consumeraffairs-scraper.ts) | consumeraffairs.com | `evaluate()` | Title, text, rating, author |

### AI & Developer

| Script | Target | Method | Fields |
|--------|--------|--------|--------|
| [chatgpt-scraper.ts](ai-developer/chatgpt-scraper.ts) | chatgpt.com | `evaluate()` | Conversation turns, roles, content |
| [huggingface-scraper.ts](ai-developer/huggingface-scraper.ts) | huggingface.co | `evaluate()` | Model name, downloads, likes |
| [github-scraper.ts](ai-developer/github-scraper.ts) | github.com | `evaluate()` | Repo, description, stars, language |
| [stackoverflow-scraper.ts](ai-developer/stackoverflow-scraper.ts) | stackoverflow.com | `evaluate()` | Question, votes, answers, tags |
| [npm-scraper.ts](ai-developer/npm-scraper.ts) | npmjs.com | `evaluate()` | Package, description, version, downloads |

### Finance

| Script | Target | Method | Fields |
|--------|--------|--------|--------|
| [yahoo-finance-scraper.ts](finance/yahoo-finance-scraper.ts) | finance.yahoo.com | `evaluate()` | Symbol, name, price, change, volume |
| [google-finance-scraper.ts](finance/google-finance-scraper.ts) | google.com/finance | `extractFields()` | Name, price, change, description |
| [coingecko-scraper.ts](finance/coingecko-scraper.ts) | coingecko.com | `evaluate()` | Rank, name, price, change, mcap |
| [coinmarketcap-scraper.ts](finance/coinmarketcap-scraper.ts) | coinmarketcap.com | `evaluate()` | Rank, name, symbol, price, change |
| [stockx-scraper.ts](finance/stockx-scraper.ts) | stockx.com | `evaluate()` | Name, price, last sale |
| [investing-scraper.ts](finance/investing-scraper.ts) | investing.com | `evaluate()` | Name, price, change, volume |
| [morningstar-scraper.ts](finance/morningstar-scraper.ts) | morningstar.com | `evaluate()` | Fund name, ticker, expense ratio |
| [crunchbase-scraper.ts](finance/crunchbase-scraper.ts) | crunchbase.com | `evaluate()` | Company, valuation, funding |

### Food

| Script | Target | Method | Fields |
|--------|--------|--------|--------|
| [doordash-scraper.ts](food/doordash-scraper.ts) | doordash.com | `evaluate()` | Restaurant, rating, delivery, time |
| [ubereats-scraper.ts](food/ubereats-scraper.ts) | ubereats.com | `evaluate()` | Restaurant, rating, meta |
| [opentable-scraper.ts](food/opentable-scraper.ts) | opentable.com | `evaluate()` | Restaurant, rating, cuisine, price |
| [allrecipes-scraper.ts](food/allrecipes-scraper.ts) | allrecipes.com | `evaluate()` | Recipe, rating, link |

### Health

| Script | Target | Method | Fields |
|--------|--------|--------|--------|
| [webmd-scraper.ts](health/webmd-scraper.ts) | webmd.com | `extractFields()` | Drug name, uses, side effects |
| [healthline-scraper.ts](health/healthline-scraper.ts) | healthline.com | `evaluate()` | Title, link, category |
| [goodrx-scraper.ts](health/goodrx-scraper.ts) | goodrx.com | `evaluate()` | Pharmacy, price, retail |

### Education

| Script | Target | Method | Fields |
|--------|--------|--------|--------|
| [coursera-scraper.ts](education/coursera-scraper.ts) | coursera.org | `evaluate()` | Course, provider, rating |
| [udemy-scraper.ts](education/udemy-scraper.ts) | udemy.com | `evaluate()` | Course, instructor, rating, price |
| [amazon-books-scraper.ts](education/amazon-books-scraper.ts) | amazon.com/books | `evaluate()` | Title, author, rating, price |

## How It Works

Every example connects to a pre-warmed browser via Spider's cloud, navigates to the target URL, and extracts structured data.

### extractFields — Single-element extraction

Best for product pages where each field maps to one CSS selector:

```typescript
const data = await page.extractFields({
  title: "#productTitle",
  price: ".a-price .a-offscreen",
  image: { selector: "#landingImage", attribute: "src" },
});
// { title: "AirPods Pro", price: "$189.99", image: "https://..." }
```

### evaluate — List extraction

Best for search results and listings where you iterate over repeating elements:

```typescript
const data = await page.evaluate(`(() => {
  const items = [];
  document.querySelectorAll(".product").forEach(el => {
    const name = el.querySelector(".name")?.textContent?.trim();
    const price = el.querySelector(".price")?.textContent;
    if (name) items.push({ name, price });
  });
  return JSON.stringify(items);
})()`);
```

## Features

- **Stealth browsing** — Bypass Akamai, PerimeterX, DataDome, and Cloudflare
- **CAPTCHA solving** — Automatic CAPTCHA resolution when `captcha: "solve"` is set
- **Pre-warmed browsers** — Skip cold start, connect to ready browsers in ~5s

## SDKs

spider-browser is available for TypeScript, Python, and Rust:

```bash
npm install spider-browser        # TypeScript
pip install spider-browser        # Python
cargo add spider-browser          # Rust
```

## Related

- [spider-browser](https://github.com/spider-rs/spider-browser) — The SDK powering these examples
- [spider-browser-dataset](https://github.com/spider-rs/spider-browser-dataset) — 999-URL benchmark across 327 domains (100% pass rate)
- [spider.cloud](https://spider.cloud) — Browser fleet & web scraping API

## License

MIT
