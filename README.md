# Web Scraping Examples

1005 ready-to-run web scraping scripts for popular websites, organized by 32 categories. Built with [spider-browser](https://github.com/spider-rs/spider-browser) — a browser automation SDK with stealth mode and anti-bot bypass.

## Quick Start

```bash
npm install
SPIDER_API_KEY=sk-... npx tsx ecommerce/amazon-scraper.ts
```

Get a free API key at [spider.cloud](https://spider.cloud).

## Categories

| Category | Scripts | Example Sites |
|----------|---------|---------------|
| [E-Commerce](#e-commerce) | 97 | Abercrombie, Academy sports, Adidas... |
| [Finance](#finance) | 66 | Aave, Ally financial, Arbiscan... |
| [News](#news) | 66 | Abcnews, Aljazeera, Apnews... |
| [AI & Developer](#ai-developer) | 60 | Ansible galaxy, Arxiv ai, Aws docs... |
| [Travel](#travel) | 55 | Agoda, Airbnb, Alaska airlines... |
| [Automotive](#automotive) | 45 | Advance auto parts, Audi, Auto blog... |
| [Sports & Fitness](#sports-fitness) | 35 | Action network, Baseball reference, Basketball reference... |
| [Education](#education) | 35 | Amazon books, Babbel, Blackboard... |
| [International](#international) | 35 | About you, Allegro, Auchan... |
| [Jobs](#jobs) | 35 | Angellist, Builtin, Careerbuilder... |
| [Real Estate](#real-estate) | 30 | Apartments, Century21, Coldwellbanker... |
| [Social](#social) | 30 | Bereal, Bluesky, Clubhouse... |
| [Health](#health) | 30 | Betterhelp, Calm, Cdc... |
| [Food](#food) | 30 | Allrecipes, Amazon fresh, Beyondmenu... |
| [Gaming & Esports](#gaming-esports) | 30 | Curseforge, Epic games store, Eurogamer... |
| [Government & Legal](#government-legal) | 30 | Above the law, Avvo, Ballotpedia... |
| [Fashion & Beauty](#fashion-beauty) | 30 | Asos fashion, Bershka, Boohoo... |
| [Reviews](#reviews) | 26 | Alternativeto, Amazon reviews, Angi reviews... |
| [SaaS & B2B](#saas-b2b) | 25 | Airtable, Asana, Atlassian marketplace... |
| [Science & Research](#science-research) | 25 | Acm digital library, Arxiv, Biorxiv... |
| [Classifieds & Marketplace](#classifieds-marketplace) | 20 | 1stdibs, Carousell, Chairish... |
| [Directories & Listings](#directories-listings) | 20 | Angi directory, Apollo io, Bbb... |
| [Photography & Design](#photography-design) | 20 | 500px, Adobe stock, Artstation... |
| [Music & Podcasts](#music-podcasts) | 20 | Allmusic, Apple music, Apple podcasts... |
| [Events & Tickets](#events-tickets) | 20 | 10times, Allevents, Axs... |
| [Search](#search) | 17 | Baidu, Bing, Brave search... |
| [Home Services](#home-services) | 15 | Angi, Bark, Buildzoom... |
| [Logistics & Shipping](#logistics-shipping) | 15 | 17track, Aftership, Dhl... |
| [Weather & Environment](#weather-environment) | 15 | Accuweather, Airnow, Climate gov... |
| [Telecom](#telecom) | 12 | Att, Centurylink, Cox... |
| [Media](#media) | 8 | Goodreads, Imdb, Rottentomatoes... |
| [Pets](#pets) | 8 | Adopt a pet, Barkbox, Chewy pets... |

## Examples

<details>
<summary><strong>E-Commerce</strong> (97 scripts)</summary>

| Script | Target |
|--------|--------|
| [abercrombie-scraper.ts](ecommerce/abercrombie-scraper.ts) | abercrombie |
| [academy-sports-scraper.ts](ecommerce/academy-sports-scraper.ts) | academy sports |
| [adidas-scraper.ts](ecommerce/adidas-scraper.ts) | adidas |
| [adorama-scraper.ts](ecommerce/adorama-scraper.ts) | adorama |
| [aliexpress-scraper.ts](ecommerce/aliexpress-scraper.ts) | aliexpress |
| [allbirds-scraper.ts](ecommerce/allbirds-scraper.ts) | allbirds |
| [amazon-scraper.ts](ecommerce/amazon-scraper.ts) | amazon |
| [anthropologie-scraper.ts](ecommerce/anthropologie-scraper.ts) | anthropologie |
| [asics-scraper.ts](ecommerce/asics-scraper.ts) | asics |
| [asos-scraper.ts](ecommerce/asos-scraper.ts) | asos |
| [away-scraper.ts](ecommerce/away-scraper.ts) | away |
| [banana-republic-scraper.ts](ecommerce/banana-republic-scraper.ts) | banana republic |
| [bath-and-body-works-scraper.ts](ecommerce/bath-and-body-works-scraper.ts) | bath and body works |
| [bestbuy-scraper.ts](ecommerce/bestbuy-scraper.ts) | bestbuy |
| [bh-photo-scraper.ts](ecommerce/bh-photo-scraper.ts) | bh photo |
| [birkenstock-scraper.ts](ecommerce/birkenstock-scraper.ts) | birkenstock |
| [bombas-scraper.ts](ecommerce/bombas-scraper.ts) | bombas |
| [brooklinen-scraper.ts](ecommerce/brooklinen-scraper.ts) | brooklinen |
| [brooks-running-scraper.ts](ecommerce/brooks-running-scraper.ts) | brooks running |
| [calvin-klein-scraper.ts](ecommerce/calvin-klein-scraper.ts) | calvin klein |
| [carhartt-scraper.ts](ecommerce/carhartt-scraper.ts) | carhartt |
| [casper-scraper.ts](ecommerce/casper-scraper.ts) | casper |
| [chewy-scraper.ts](ecommerce/chewy-scraper.ts) | chewy |
| [coach-scraper.ts](ecommerce/coach-scraper.ts) | coach |
| [columbia-sportswear-scraper.ts](ecommerce/columbia-sportswear-scraper.ts) | columbia sportswear |
| [converse-scraper.ts](ecommerce/converse-scraper.ts) | converse |
| [costco-scraper.ts](ecommerce/costco-scraper.ts) | costco |
| [crate-and-barrel-scraper.ts](ecommerce/crate-and-barrel-scraper.ts) | crate and barrel |
| [crocs-scraper.ts](ecommerce/crocs-scraper.ts) | crocs |
| [dicks-sporting-goods-scraper.ts](ecommerce/dicks-sporting-goods-scraper.ts) | dicks sporting goods |
| [dollar-shave-club-scraper.ts](ecommerce/dollar-shave-club-scraper.ts) | dollar shave club |
| [dr-martens-scraper.ts](ecommerce/dr-martens-scraper.ts) | dr martens |
| [ebay-scraper.ts](ecommerce/ebay-scraper.ts) | ebay |
| [etsy-scraper.ts](ecommerce/etsy-scraper.ts) | etsy |
| [everlane-scraper.ts](ecommerce/everlane-scraper.ts) | everlane |
| [free-people-scraper.ts](ecommerce/free-people-scraper.ts) | free people |
| [gamestop-scraper.ts](ecommerce/gamestop-scraper.ts) | gamestop |
| [gap-scraper.ts](ecommerce/gap-scraper.ts) | gap |
| [glossier-scraper.ts](ecommerce/glossier-scraper.ts) | glossier |
| [goat-scraper.ts](ecommerce/goat-scraper.ts) | goat |
| [harrys-scraper.ts](ecommerce/harrys-scraper.ts) | harrys |
| [hm-scraper.ts](ecommerce/hm-scraper.ts) | hm |
| [homedepot-scraper.ts](ecommerce/homedepot-scraper.ts) | homedepot |
| [ikea-scraper.ts](ecommerce/ikea-scraper.ts) | ikea |
| [jcpenney-scraper.ts](ecommerce/jcpenney-scraper.ts) | jcpenney |
| [jcrew-scraper.ts](ecommerce/jcrew-scraper.ts) | jcrew |
| [kate-spade-scraper.ts](ecommerce/kate-spade-scraper.ts) | kate spade |
| [kohls-scraper.ts](ecommerce/kohls-scraper.ts) | kohls |
| [levis-scraper.ts](ecommerce/levis-scraper.ts) | levis |
| [lowes-scraper.ts](ecommerce/lowes-scraper.ts) | lowes |
| [lululemon-scraper.ts](ecommerce/lululemon-scraper.ts) | lululemon |
| [macys-scraper.ts](ecommerce/macys-scraper.ts) | macys |
| [mercari-scraper.ts](ecommerce/mercari-scraper.ts) | mercari |
| [michael-kors-scraper.ts](ecommerce/michael-kors-scraper.ts) | michael kors |
| [michaels-scraper.ts](ecommerce/michaels-scraper.ts) | michaels |
| [new-balance-scraper.ts](ecommerce/new-balance-scraper.ts) | new balance |
| [newegg-scraper.ts](ecommerce/newegg-scraper.ts) | newegg |
| [nike-scraper.ts](ecommerce/nike-scraper.ts) | nike |
| [nordstrom-rack-scraper.ts](ecommerce/nordstrom-rack-scraper.ts) | nordstrom rack |
| [nordstrom-scraper.ts](ecommerce/nordstrom-scraper.ts) | nordstrom |
| [old-navy-scraper.ts](ecommerce/old-navy-scraper.ts) | old navy |
| [overstock-scraper.ts](ecommerce/overstock-scraper.ts) | overstock |
| [patagonia-scraper.ts](ecommerce/patagonia-scraper.ts) | patagonia |
| [petco-scraper.ts](ecommerce/petco-scraper.ts) | petco |
| [petsmart-scraper.ts](ecommerce/petsmart-scraper.ts) | petsmart |
| [poshmark-scraper.ts](ecommerce/poshmark-scraper.ts) | poshmark |
| [pottery-barn-scraper.ts](ecommerce/pottery-barn-scraper.ts) | pottery barn |
| [puma-scraper.ts](ecommerce/puma-scraper.ts) | puma |
| [purple-scraper.ts](ecommerce/purple-scraper.ts) | purple |
| [ralph-lauren-scraper.ts](ecommerce/ralph-lauren-scraper.ts) | ralph lauren |
| [rei-scraper.ts](ecommerce/rei-scraper.ts) | rei |
| [samsclub-scraper.ts](ecommerce/samsclub-scraper.ts) | samsclub |
| [sephora-scraper.ts](ecommerce/sephora-scraper.ts) | sephora |
| [shein-scraper.ts](ecommerce/shein-scraper.ts) | shein |
| [shopify-scraper.ts](ecommerce/shopify-scraper.ts) | shopify |
| [stockx-scraper.ts](ecommerce/stockx-scraper.ts) | stockx |
| [target-scraper.ts](ecommerce/target-scraper.ts) | target |
| [temu-scraper.ts](ecommerce/temu-scraper.ts) | temu |
| [the-north-face-scraper.ts](ecommerce/the-north-face-scraper.ts) | the north face |
| [thredup-scraper.ts](ecommerce/thredup-scraper.ts) | thredup |
| [tiffany-scraper.ts](ecommerce/tiffany-scraper.ts) | tiffany |
| [tjmaxx-scraper.ts](ecommerce/tjmaxx-scraper.ts) | tjmaxx |
| [tommy-hilfiger-scraper.ts](ecommerce/tommy-hilfiger-scraper.ts) | tommy hilfiger |
| [ulta-beauty-scraper.ts](ecommerce/ulta-beauty-scraper.ts) | ulta beauty |
| [under-armour-scraper.ts](ecommerce/under-armour-scraper.ts) | under armour |
| [uniqlo-scraper.ts](ecommerce/uniqlo-scraper.ts) | uniqlo |
| [urban-outfitters-scraper.ts](ecommerce/urban-outfitters-scraper.ts) | urban outfitters |
| [vans-scraper.ts](ecommerce/vans-scraper.ts) | vans |
| [victorias-secret-scraper.ts](ecommerce/victorias-secret-scraper.ts) | victorias secret |
| [walmart-scraper.ts](ecommerce/walmart-scraper.ts) | walmart |
| [warby-parker-scraper.ts](ecommerce/warby-parker-scraper.ts) | warby parker |
| [wayfair-scraper.ts](ecommerce/wayfair-scraper.ts) | wayfair |
| [west-elm-scraper.ts](ecommerce/west-elm-scraper.ts) | west elm |
| [williams-sonoma-scraper.ts](ecommerce/williams-sonoma-scraper.ts) | williams sonoma |
| [wish-scraper.ts](ecommerce/wish-scraper.ts) | wish |
| [zappos-scraper.ts](ecommerce/zappos-scraper.ts) | zappos |
| [zara-scraper.ts](ecommerce/zara-scraper.ts) | zara |

</details>

<details>
<summary><strong>Finance</strong> (66 scripts)</summary>

| Script | Target |
|--------|--------|
| [aave-scraper.ts](finance/aave-scraper.ts) | aave |
| [ally-financial-scraper.ts](finance/ally-financial-scraper.ts) | ally financial |
| [arbiscan-scraper.ts](finance/arbiscan-scraper.ts) | arbiscan |
| [bankrate-scraper.ts](finance/bankrate-scraper.ts) | bankrate |
| [barrons-scraper.ts](finance/barrons-scraper.ts) | barrons |
| [benzinga-scraper.ts](finance/benzinga-scraper.ts) | benzinga |
| [binance-scraper.ts](finance/binance-scraper.ts) | binance |
| [blackrock-scraper.ts](finance/blackrock-scraper.ts) | blackrock |
| [blockchain-com-scraper.ts](finance/blockchain-com-scraper.ts) | blockchain com |
| [bloomberg-scraper.ts](finance/bloomberg-scraper.ts) | bloomberg |
| [bscscan-scraper.ts](finance/bscscan-scraper.ts) | bscscan |
| [charles-schwab-scraper.ts](finance/charles-schwab-scraper.ts) | charles schwab |
| [cnbc-scraper.ts](finance/cnbc-scraper.ts) | cnbc |
| [coinbase-scraper.ts](finance/coinbase-scraper.ts) | coinbase |
| [coingecko-scraper.ts](finance/coingecko-scraper.ts) | coingecko |
| [coinmarketcap-scraper.ts](finance/coinmarketcap-scraper.ts) | coinmarketcap |
| [compound-finance-scraper.ts](finance/compound-finance-scraper.ts) | compound finance |
| [credit-karma-scraper.ts](finance/credit-karma-scraper.ts) | credit karma |
| [crunchbase-scraper.ts](finance/crunchbase-scraper.ts) | crunchbase |
| [defi-llama-scraper.ts](finance/defi-llama-scraper.ts) | defi llama |
| [dune-analytics-scraper.ts](finance/dune-analytics-scraper.ts) | dune analytics |
| [etherscan-scraper.ts](finance/etherscan-scraper.ts) | etherscan |
| [ethplorer-scraper.ts](finance/ethplorer-scraper.ts) | ethplorer |
| [etrade-scraper.ts](finance/etrade-scraper.ts) | etrade |
| [fidelity-scraper.ts](finance/fidelity-scraper.ts) | fidelity |
| [financial-times-scraper.ts](finance/financial-times-scraper.ts) | financial times |
| [finviz-scraper.ts](finance/finviz-scraper.ts) | finviz |
| [google-finance-scraper.ts](finance/google-finance-scraper.ts) | google finance |
| [gurufocus-scraper.ts](finance/gurufocus-scraper.ts) | gurufocus |
| [interactive-brokers-scraper.ts](finance/interactive-brokers-scraper.ts) | interactive brokers |
| [investing-scraper.ts](finance/investing-scraper.ts) | investing |
| [investopedia-scraper.ts](finance/investopedia-scraper.ts) | investopedia |
| [kiplinger-scraper.ts](finance/kiplinger-scraper.ts) | kiplinger |
| [kraken-scraper.ts](finance/kraken-scraper.ts) | kraken |
| [lendingtree-scraper.ts](finance/lendingtree-scraper.ts) | lendingtree |
| [macrotrends-scraper.ts](finance/macrotrends-scraper.ts) | macrotrends |
| [marketwatch-scraper.ts](finance/marketwatch-scraper.ts) | marketwatch |
| [messari-scraper.ts](finance/messari-scraper.ts) | messari |
| [mint-scraper.ts](finance/mint-scraper.ts) | mint |
| [morningstar-scraper.ts](finance/morningstar-scraper.ts) | morningstar |
| [motley-fool-scraper.ts](finance/motley-fool-scraper.ts) | motley fool |
| [nerdwallet-scraper.ts](finance/nerdwallet-scraper.ts) | nerdwallet |
| [openinsider-scraper.ts](finance/openinsider-scraper.ts) | openinsider |
| [personal-capital-scraper.ts](finance/personal-capital-scraper.ts) | personal capital |
| [polygonscan-scraper.ts](finance/polygonscan-scraper.ts) | polygonscan |
| [robinhood-scraper.ts](finance/robinhood-scraper.ts) | robinhood |
| [sec-edgar-scraper.ts](finance/sec-edgar-scraper.ts) | sec edgar |
| [seeking-alpha-scraper.ts](finance/seeking-alpha-scraper.ts) | seeking alpha |
| [simply-wall-st-scraper.ts](finance/simply-wall-st-scraper.ts) | simply wall st |
| [sofi-scraper.ts](finance/sofi-scraper.ts) | sofi |
| [solscan-scraper.ts](finance/solscan-scraper.ts) | solscan |
| [stock-analysis-scraper.ts](finance/stock-analysis-scraper.ts) | stock analysis |
| [stockx-finance-scraper.ts](finance/stockx-finance-scraper.ts) | stockx finance |
| [stockx-scraper.ts](finance/stockx-scraper.ts) | stockx |
| [td-ameritrade-scraper.ts](finance/td-ameritrade-scraper.ts) | td ameritrade |
| [thestreet-scraper.ts](finance/thestreet-scraper.ts) | thestreet |
| [token-terminal-scraper.ts](finance/token-terminal-scraper.ts) | token terminal |
| [tradingview-scraper.ts](finance/tradingview-scraper.ts) | tradingview |
| [uniswap-scraper.ts](finance/uniswap-scraper.ts) | uniswap |
| [vanguard-scraper.ts](finance/vanguard-scraper.ts) | vanguard |
| [wallethub-scraper.ts](finance/wallethub-scraper.ts) | wallethub |
| [wealthfront-scraper.ts](finance/wealthfront-scraper.ts) | wealthfront |
| [webull-scraper.ts](finance/webull-scraper.ts) | webull |
| [whale-wisdom-scraper.ts](finance/whale-wisdom-scraper.ts) | whale wisdom |
| [yahoo-finance-scraper.ts](finance/yahoo-finance-scraper.ts) | yahoo finance |
| [zacks-scraper.ts](finance/zacks-scraper.ts) | zacks |

</details>

<details>
<summary><strong>News</strong> (66 scripts)</summary>

| Script | Target |
|--------|--------|
| [abcnews-scraper.ts](news/abcnews-scraper.ts) | abcnews |
| [aljazeera-scraper.ts](news/aljazeera-scraper.ts) | aljazeera |
| [apnews-scraper.ts](news/apnews-scraper.ts) | apnews |
| [arstechnica-scraper.ts](news/arstechnica-scraper.ts) | arstechnica |
| [axios-scraper.ts](news/axios-scraper.ts) | axios |
| [bbc-news-scraper.ts](news/bbc-news-scraper.ts) | bbc news |
| [bloomberg-news-scraper.ts](news/bloomberg-news-scraper.ts) | bloomberg news |
| [bloomberg-scraper.ts](news/bloomberg-scraper.ts) | bloomberg |
| [cbsnews-scraper.ts](news/cbsnews-scraper.ts) | cbsnews |
| [cnet-scraper.ts](news/cnet-scraper.ts) | cnet |
| [cnn-scraper.ts](news/cnn-scraper.ts) | cnn |
| [daily-beast-scraper.ts](news/daily-beast-scraper.ts) | daily beast |
| [dailymail-scraper.ts](news/dailymail-scraper.ts) | dailymail |
| [defense-one-scraper.ts](news/defense-one-scraper.ts) | defense one |
| [dw-scraper.ts](news/dw-scraper.ts) | dw |
| [economist-scraper.ts](news/economist-scraper.ts) | economist |
| [engadget-scraper.ts](news/engadget-scraper.ts) | engadget |
| [forbes-scraper.ts](news/forbes-scraper.ts) | forbes |
| [foreign-affairs-scraper.ts](news/foreign-affairs-scraper.ts) | foreign affairs |
| [foreign-policy-scraper.ts](news/foreign-policy-scraper.ts) | foreign policy |
| [foxnews-scraper.ts](news/foxnews-scraper.ts) | foxnews |
| [france24-scraper.ts](news/france24-scraper.ts) | france24 |
| [google-news-scraper.ts](news/google-news-scraper.ts) | google news |
| [hackernews-scraper.ts](news/hackernews-scraper.ts) | hackernews |
| [huffpost-scraper.ts](news/huffpost-scraper.ts) | huffpost |
| [independent-scraper.ts](news/independent-scraper.ts) | independent |
| [japantimes-scraper.ts](news/japantimes-scraper.ts) | japantimes |
| [mashable-scraper.ts](news/mashable-scraper.ts) | mashable |
| [mother-jones-scraper.ts](news/mother-jones-scraper.ts) | mother jones |
| [national-review-scraper.ts](news/national-review-scraper.ts) | national review |
| [nbcnews-scraper.ts](news/nbcnews-scraper.ts) | nbcnews |
| [newyorker-scraper.ts](news/newyorker-scraper.ts) | newyorker |
| [npr-scraper.ts](news/npr-scraper.ts) | npr |
| [nytimes-scraper.ts](news/nytimes-scraper.ts) | nytimes |
| [politico-scraper.ts](news/politico-scraper.ts) | politico |
| [propublica-scraper.ts](news/propublica-scraper.ts) | propublica |
| [quartz-scraper.ts](news/quartz-scraper.ts) | quartz |
| [reason-scraper.ts](news/reason-scraper.ts) | reason |
| [restofworld-scraper.ts](news/restofworld-scraper.ts) | restofworld |
| [reuters-scraper.ts](news/reuters-scraper.ts) | reuters |
| [rollingstone-scraper.ts](news/rollingstone-scraper.ts) | rollingstone |
| [salon-scraper.ts](news/salon-scraper.ts) | salon |
| [scmp-scraper.ts](news/scmp-scraper.ts) | scmp |
| [semafor-scraper.ts](news/semafor-scraper.ts) | semafor |
| [skynews-scraper.ts](news/skynews-scraper.ts) | skynews |
| [slate-scraper.ts](news/slate-scraper.ts) | slate |
| [techcrunch-ai-scraper.ts](news/techcrunch-ai-scraper.ts) | techcrunch ai |
| [techcrunch-scraper.ts](news/techcrunch-scraper.ts) | techcrunch |
| [theatlantic-scraper.ts](news/theatlantic-scraper.ts) | theatlantic |
| [thediplomat-scraper.ts](news/thediplomat-scraper.ts) | thediplomat |
| [theguardian-scraper.ts](news/theguardian-scraper.ts) | theguardian |
| [thehill-scraper.ts](news/thehill-scraper.ts) | thehill |
| [theinformation-scraper.ts](news/theinformation-scraper.ts) | theinformation |
| [theintercept-scraper.ts](news/theintercept-scraper.ts) | theintercept |
| [thenation-scraper.ts](news/thenation-scraper.ts) | thenation |
| [theverge-scraper.ts](news/theverge-scraper.ts) | theverge |
| [timesofindia-scraper.ts](news/timesofindia-scraper.ts) | timesofindia |
| [usatoday-scraper.ts](news/usatoday-scraper.ts) | usatoday |
| [vanityfair-scraper.ts](news/vanityfair-scraper.ts) | vanityfair |
| [verge-scraper.ts](news/verge-scraper.ts) | verge |
| [vice-scraper.ts](news/vice-scraper.ts) | vice |
| [vox-scraper.ts](news/vox-scraper.ts) | vox |
| [washingtonpost-scraper.ts](news/washingtonpost-scraper.ts) | washingtonpost |
| [weekly-standard-scraper.ts](news/weekly-standard-scraper.ts) | weekly standard |
| [wired-scraper.ts](news/wired-scraper.ts) | wired |
| [wsj-scraper.ts](news/wsj-scraper.ts) | wsj |

</details>

<details>
<summary><strong>AI & Developer</strong> (60 scripts)</summary>

| Script | Target |
|--------|--------|
| [ansible-galaxy-scraper.ts](ai-developer/ansible-galaxy-scraper.ts) | ansible galaxy |
| [arxiv-ai-scraper.ts](ai-developer/arxiv-ai-scraper.ts) | arxiv ai |
| [aws-docs-scraper.ts](ai-developer/aws-docs-scraper.ts) | aws docs |
| [bitbucket-scraper.ts](ai-developer/bitbucket-scraper.ts) | bitbucket |
| [chatgpt-scraper.ts](ai-developer/chatgpt-scraper.ts) | chatgpt |
| [chrome-web-store-scraper.ts](ai-developer/chrome-web-store-scraper.ts) | chrome web store |
| [claude-api-scraper.ts](ai-developer/claude-api-scraper.ts) | claude api |
| [cloudflare-scraper.ts](ai-developer/cloudflare-scraper.ts) | cloudflare |
| [codewars-scraper.ts](ai-developer/codewars-scraper.ts) | codewars |
| [cohere-scraper.ts](ai-developer/cohere-scraper.ts) | cohere |
| [crates-io-scraper.ts](ai-developer/crates-io-scraper.ts) | crates io |
| [devto-scraper.ts](ai-developer/devto-scraper.ts) | devto |
| [digitalocean-scraper.ts](ai-developer/digitalocean-scraper.ts) | digitalocean |
| [docker-hub-scraper.ts](ai-developer/docker-hub-scraper.ts) | docker hub |
| [firebase-scraper.ts](ai-developer/firebase-scraper.ts) | firebase |
| [fly-io-scraper.ts](ai-developer/fly-io-scraper.ts) | fly io |
| [github-scraper.ts](ai-developer/github-scraper.ts) | github |
| [gitlab-scraper.ts](ai-developer/gitlab-scraper.ts) | gitlab |
| [google-colab-scraper.ts](ai-developer/google-colab-scraper.ts) | google colab |
| [gradio-scraper.ts](ai-developer/gradio-scraper.ts) | gradio |
| [groq-scraper.ts](ai-developer/groq-scraper.ts) | groq |
| [hacker-news-scraper.ts](ai-developer/hacker-news-scraper.ts) | hacker news |
| [hackerrank-scraper.ts](ai-developer/hackerrank-scraper.ts) | hackerrank |
| [hashnode-scraper.ts](ai-developer/hashnode-scraper.ts) | hashnode |
| [heroku-scraper.ts](ai-developer/heroku-scraper.ts) | heroku |
| [homebrew-scraper.ts](ai-developer/homebrew-scraper.ts) | homebrew |
| [huggingface-scraper.ts](ai-developer/huggingface-scraper.ts) | huggingface |
| [indie-hackers-scraper.ts](ai-developer/indie-hackers-scraper.ts) | indie hackers |
| [jetbrains-marketplace-scraper.ts](ai-developer/jetbrains-marketplace-scraper.ts) | jetbrains marketplace |
| [kaggle-scraper.ts](ai-developer/kaggle-scraper.ts) | kaggle |
| [langchain-scraper.ts](ai-developer/langchain-scraper.ts) | langchain |
| [leetcode-scraper.ts](ai-developer/leetcode-scraper.ts) | leetcode |
| [llamaindex-scraper.ts](ai-developer/llamaindex-scraper.ts) | llamaindex |
| [medium-tech-scraper.ts](ai-developer/medium-tech-scraper.ts) | medium tech |
| [mistral-ai-scraper.ts](ai-developer/mistral-ai-scraper.ts) | mistral ai |
| [mlflow-scraper.ts](ai-developer/mlflow-scraper.ts) | mlflow |
| [mozilla-addons-scraper.ts](ai-developer/mozilla-addons-scraper.ts) | mozilla addons |
| [netlify-scraper.ts](ai-developer/netlify-scraper.ts) | netlify |
| [npm-scraper.ts](ai-developer/npm-scraper.ts) | npm |
| [ollama-scraper.ts](ai-developer/ollama-scraper.ts) | ollama |
| [openai-scraper.ts](ai-developer/openai-scraper.ts) | openai |
| [paperswithcode-scraper.ts](ai-developer/paperswithcode-scraper.ts) | paperswithcode |
| [perplexity-labs-scraper.ts](ai-developer/perplexity-labs-scraper.ts) | perplexity labs |
| [postman-scraper.ts](ai-developer/postman-scraper.ts) | postman |
| [product-hunt-scraper.ts](ai-developer/product-hunt-scraper.ts) | product hunt |
| [programmableweb-scraper.ts](ai-developer/programmableweb-scraper.ts) | programmableweb |
| [pypi-scraper.ts](ai-developer/pypi-scraper.ts) | pypi |
| [railway-scraper.ts](ai-developer/railway-scraper.ts) | railway |
| [rapidapi-scraper.ts](ai-developer/rapidapi-scraper.ts) | rapidapi |
| [render-scraper.ts](ai-developer/render-scraper.ts) | render |
| [replicate-scraper.ts](ai-developer/replicate-scraper.ts) | replicate |
| [stackoverflow-scraper.ts](ai-developer/stackoverflow-scraper.ts) | stackoverflow |
| [streamlit-scraper.ts](ai-developer/streamlit-scraper.ts) | streamlit |
| [supabase-scraper.ts](ai-developer/supabase-scraper.ts) | supabase |
| [terraform-registry-scraper.ts](ai-developer/terraform-registry-scraper.ts) | terraform registry |
| [together-ai-scraper.ts](ai-developer/together-ai-scraper.ts) | together ai |
| [vercel-ai-sdk-scraper.ts](ai-developer/vercel-ai-sdk-scraper.ts) | vercel ai sdk |
| [vercel-scraper.ts](ai-developer/vercel-scraper.ts) | vercel |
| [vscode-marketplace-scraper.ts](ai-developer/vscode-marketplace-scraper.ts) | vscode marketplace |
| [wandb-scraper.ts](ai-developer/wandb-scraper.ts) | wandb |

</details>

<details>
<summary><strong>Travel</strong> (55 scripts)</summary>

| Script | Target |
|--------|--------|
| [agoda-scraper.ts](travel/agoda-scraper.ts) | agoda |
| [airbnb-scraper.ts](travel/airbnb-scraper.ts) | airbnb |
| [alaska-airlines-scraper.ts](travel/alaska-airlines-scraper.ts) | alaska airlines |
| [alltrails-scraper.ts](travel/alltrails-scraper.ts) | alltrails |
| [american-airlines-scraper.ts](travel/american-airlines-scraper.ts) | american airlines |
| [amtrak-scraper.ts](travel/amtrak-scraper.ts) | amtrak |
| [atlas-obscura-scraper.ts](travel/atlas-obscura-scraper.ts) | atlas obscura |
| [avis-scraper.ts](travel/avis-scraper.ts) | avis |
| [best-western-scraper.ts](travel/best-western-scraper.ts) | best western |
| [booking-scraper.ts](travel/booking-scraper.ts) | booking |
| [budget-scraper.ts](travel/budget-scraper.ts) | budget |
| [cheapflights-scraper.ts](travel/cheapflights-scraper.ts) | cheapflights |
| [cruise-critic-scraper.ts](travel/cruise-critic-scraper.ts) | cruise critic |
| [delta-airlines-scraper.ts](travel/delta-airlines-scraper.ts) | delta airlines |
| [enterprise-scraper.ts](travel/enterprise-scraper.ts) | enterprise |
| [expedia-scraper.ts](travel/expedia-scraper.ts) | expedia |
| [flightaware-travel-scraper.ts](travel/flightaware-travel-scraper.ts) | flightaware travel |
| [flightradar24-travel-scraper.ts](travel/flightradar24-travel-scraper.ts) | flightradar24 travel |
| [frontier-airlines-scraper.ts](travel/frontier-airlines-scraper.ts) | frontier airlines |
| [getyourguide-scraper.ts](travel/getyourguide-scraper.ts) | getyourguide |
| [google-flights-scraper.ts](travel/google-flights-scraper.ts) | google flights |
| [google-hotels-scraper.ts](travel/google-hotels-scraper.ts) | google hotels |
| [hertz-scraper.ts](travel/hertz-scraper.ts) | hertz |
| [hilton-scraper.ts](travel/hilton-scraper.ts) | hilton |
| [hopper-scraper.ts](travel/hopper-scraper.ts) | hopper |
| [hostelworld-scraper.ts](travel/hostelworld-scraper.ts) | hostelworld |
| [hotels-scraper.ts](travel/hotels-scraper.ts) | hotels |
| [hyatt-scraper.ts](travel/hyatt-scraper.ts) | hyatt |
| [ihg-scraper.ts](travel/ihg-scraper.ts) | ihg |
| [jetblue-scraper.ts](travel/jetblue-scraper.ts) | jetblue |
| [kayak-scraper.ts](travel/kayak-scraper.ts) | kayak |
| [kiwi-scraper.ts](travel/kiwi-scraper.ts) | kiwi |
| [lonely-planet-scraper.ts](travel/lonely-planet-scraper.ts) | lonely planet |
| [marriott-scraper.ts](travel/marriott-scraper.ts) | marriott |
| [momondo-scraper.ts](travel/momondo-scraper.ts) | momondo |
| [national-car-rental-scraper.ts](travel/national-car-rental-scraper.ts) | national car rental |
| [norwegian-air-scraper.ts](travel/norwegian-air-scraper.ts) | norwegian air |
| [orbitz-scraper.ts](travel/orbitz-scraper.ts) | orbitz |
| [priceline-scraper.ts](travel/priceline-scraper.ts) | priceline |
| [rome2rio-scraper.ts](travel/rome2rio-scraper.ts) | rome2rio |
| [ryanair-scraper.ts](travel/ryanair-scraper.ts) | ryanair |
| [seat-guru-scraper.ts](travel/seat-guru-scraper.ts) | seat guru |
| [skyscanner-scraper.ts](travel/skyscanner-scraper.ts) | skyscanner |
| [southwest-airlines-scraper.ts](travel/southwest-airlines-scraper.ts) | southwest airlines |
| [spirit-airlines-scraper.ts](travel/spirit-airlines-scraper.ts) | spirit airlines |
| [trainline-scraper.ts](travel/trainline-scraper.ts) | trainline |
| [travelocity-scraper.ts](travel/travelocity-scraper.ts) | travelocity |
| [trip-scraper.ts](travel/trip-scraper.ts) | trip |
| [tripadvisor-scraper.ts](travel/tripadvisor-scraper.ts) | tripadvisor |
| [trivago-scraper.ts](travel/trivago-scraper.ts) | trivago |
| [turo-scraper.ts](travel/turo-scraper.ts) | turo |
| [united-airlines-scraper.ts](travel/united-airlines-scraper.ts) | united airlines |
| [viator-scraper.ts](travel/viator-scraper.ts) | viator |
| [vrbo-scraper.ts](travel/vrbo-scraper.ts) | vrbo |
| [wyndham-scraper.ts](travel/wyndham-scraper.ts) | wyndham |

</details>

<details>
<summary><strong>Automotive</strong> (45 scripts)</summary>

| Script | Target |
|--------|--------|
| [advance-auto-parts-scraper.ts](automotive/advance-auto-parts-scraper.ts) | advance auto parts |
| [audi-scraper.ts](automotive/audi-scraper.ts) | audi |
| [auto-blog-scraper.ts](automotive/auto-blog-scraper.ts) | auto blog |
| [autotempest-scraper.ts](automotive/autotempest-scraper.ts) | autotempest |
| [autotrader-scraper.ts](automotive/autotrader-scraper.ts) | autotrader |
| [autozone-scraper.ts](automotive/autozone-scraper.ts) | autozone |
| [bmw-scraper.ts](automotive/bmw-scraper.ts) | bmw |
| [bring-a-trailer-scraper.ts](automotive/bring-a-trailer-scraper.ts) | bring a trailer |
| [car-and-driver-scraper.ts](automotive/car-and-driver-scraper.ts) | car and driver |
| [carbuzz-scraper.ts](automotive/carbuzz-scraper.ts) | carbuzz |
| [carfax-scraper.ts](automotive/carfax-scraper.ts) | carfax |
| [cargurus-scraper.ts](automotive/cargurus-scraper.ts) | cargurus |
| [carmax-scraper.ts](automotive/carmax-scraper.ts) | carmax |
| [cars-com-scraper.ts](automotive/cars-com-scraper.ts) | cars com |
| [carvana-scraper.ts](automotive/carvana-scraper.ts) | carvana |
| [copart-scraper.ts](automotive/copart-scraper.ts) | copart |
| [edmunds-scraper.ts](automotive/edmunds-scraper.ts) | edmunds |
| [ford-scraper.ts](automotive/ford-scraper.ts) | ford |
| [green-car-reports-scraper.ts](automotive/green-car-reports-scraper.ts) | green car reports |
| [hemmings-scraper.ts](automotive/hemmings-scraper.ts) | hemmings |
| [honda-scraper.ts](automotive/honda-scraper.ts) | honda |
| [iihs-scraper.ts](automotive/iihs-scraper.ts) | iihs |
| [iseecars-scraper.ts](automotive/iseecars-scraper.ts) | iseecars |
| [jalopnik-scraper.ts](automotive/jalopnik-scraper.ts) | jalopnik |
| [jd-power-auto-scraper.ts](automotive/jd-power-auto-scraper.ts) | jd power auto |
| [kelley-blue-book-scraper.ts](automotive/kelley-blue-book-scraper.ts) | kelley blue book |
| [lucid-motors-scraper.ts](automotive/lucid-motors-scraper.ts) | lucid motors |
| [mercedes-benz-scraper.ts](automotive/mercedes-benz-scraper.ts) | mercedes benz |
| [motor-authority-scraper.ts](automotive/motor-authority-scraper.ts) | motor authority |
| [motortrend-scraper.ts](automotive/motortrend-scraper.ts) | motortrend |
| [nhtsa-scraper.ts](automotive/nhtsa-scraper.ts) | nhtsa |
| [oreilly-auto-parts-scraper.ts](automotive/oreilly-auto-parts-scraper.ts) | oreilly auto parts |
| [porsche-scraper.ts](automotive/porsche-scraper.ts) | porsche |
| [repairpal-scraper.ts](automotive/repairpal-scraper.ts) | repairpal |
| [rivian-scraper.ts](automotive/rivian-scraper.ts) | rivian |
| [road-and-track-scraper.ts](automotive/road-and-track-scraper.ts) | road and track |
| [rockauto-scraper.ts](automotive/rockauto-scraper.ts) | rockauto |
| [shift-scraper.ts](automotive/shift-scraper.ts) | shift |
| [tesla-scraper.ts](automotive/tesla-scraper.ts) | tesla |
| [the-drive-scraper.ts](automotive/the-drive-scraper.ts) | the drive |
| [tire-rack-scraper.ts](automotive/tire-rack-scraper.ts) | tire rack |
| [topspeed-scraper.ts](automotive/topspeed-scraper.ts) | topspeed |
| [toyota-scraper.ts](automotive/toyota-scraper.ts) | toyota |
| [truecar-scraper.ts](automotive/truecar-scraper.ts) | truecar |
| [vroom-scraper.ts](automotive/vroom-scraper.ts) | vroom |

</details>

<details>
<summary><strong>Sports & Fitness</strong> (35 scripts)</summary>

| Script | Target |
|--------|--------|
| [action-network-scraper.ts](sports-fitness/action-network-scraper.ts) | action network |
| [baseball-reference-scraper.ts](sports-fitness/baseball-reference-scraper.ts) | baseball reference |
| [basketball-reference-scraper.ts](sports-fitness/basketball-reference-scraper.ts) | basketball reference |
| [bleacher-report-scraper.ts](sports-fitness/bleacher-report-scraper.ts) | bleacher report |
| [boxing-scene-scraper.ts](sports-fitness/boxing-scene-scraper.ts) | boxing scene |
| [cbs-sports-scraper.ts](sports-fitness/cbs-sports-scraper.ts) | cbs sports |
| [cycling-news-scraper.ts](sports-fitness/cycling-news-scraper.ts) | cycling news |
| [deadspin-scraper.ts](sports-fitness/deadspin-scraper.ts) | deadspin |
| [draftkings-scraper.ts](sports-fitness/draftkings-scraper.ts) | draftkings |
| [espn-scraper.ts](sports-fitness/espn-scraper.ts) | espn |
| [fanduel-scraper.ts](sports-fitness/fanduel-scraper.ts) | fanduel |
| [fbref-scraper.ts](sports-fitness/fbref-scraper.ts) | fbref |
| [flashscore-scraper.ts](sports-fitness/flashscore-scraper.ts) | flashscore |
| [golf-digest-scraper.ts](sports-fitness/golf-digest-scraper.ts) | golf digest |
| [mlb-scraper.ts](sports-fitness/mlb-scraper.ts) | mlb |
| [mma-fighting-scraper.ts](sports-fitness/mma-fighting-scraper.ts) | mma fighting |
| [nba-scraper.ts](sports-fitness/nba-scraper.ts) | nba |
| [nfl-scraper.ts](sports-fitness/nfl-scraper.ts) | nfl |
| [nhl-scraper.ts](sports-fitness/nhl-scraper.ts) | nhl |
| [odds-shark-scraper.ts](sports-fitness/odds-shark-scraper.ts) | odds shark |
| [peloton-sports-scraper.ts](sports-fitness/peloton-sports-scraper.ts) | peloton sports |
| [pro-football-reference-scraper.ts](sports-fitness/pro-football-reference-scraper.ts) | pro football reference |
| [runners-world-scraper.ts](sports-fitness/runners-world-scraper.ts) | runners world |
| [sb-nation-scraper.ts](sports-fitness/sb-nation-scraper.ts) | sb nation |
| [sofascore-scraper.ts](sports-fitness/sofascore-scraper.ts) | sofascore |
| [sporting-news-scraper.ts](sports-fitness/sporting-news-scraper.ts) | sporting news |
| [sports-reference-scraper.ts](sports-fitness/sports-reference-scraper.ts) | sports reference |
| [strava-scraper.ts](sports-fitness/strava-scraper.ts) | strava |
| [swimming-world-scraper.ts](sports-fitness/swimming-world-scraper.ts) | swimming world |
| [tennis-channel-scraper.ts](sports-fitness/tennis-channel-scraper.ts) | tennis channel |
| [the-athletic-scraper.ts](sports-fitness/the-athletic-scraper.ts) | the athletic |
| [transfermarkt-scraper.ts](sports-fitness/transfermarkt-scraper.ts) | transfermarkt |
| [ufc-scraper.ts](sports-fitness/ufc-scraper.ts) | ufc |
| [whoscored-scraper.ts](sports-fitness/whoscored-scraper.ts) | whoscored |
| [yahoo-sports-scraper.ts](sports-fitness/yahoo-sports-scraper.ts) | yahoo sports |

</details>

<details>
<summary><strong>Education</strong> (35 scripts)</summary>

| Script | Target |
|--------|--------|
| [amazon-books-scraper.ts](education/amazon-books-scraper.ts) | amazon books |
| [babbel-scraper.ts](education/babbel-scraper.ts) | babbel |
| [blackboard-scraper.ts](education/blackboard-scraper.ts) | blackboard |
| [brilliant-scraper.ts](education/brilliant-scraper.ts) | brilliant |
| [canvas-lms-scraper.ts](education/canvas-lms-scraper.ts) | canvas lms |
| [chegg-scraper.ts](education/chegg-scraper.ts) | chegg |
| [ck12-scraper.ts](education/ck12-scraper.ts) | ck12 |
| [class-central-scraper.ts](education/class-central-scraper.ts) | class central |
| [codecademy-scraper.ts](education/codecademy-scraper.ts) | codecademy |
| [coursera-scraper.ts](education/coursera-scraper.ts) | coursera |
| [datacamp-scraper.ts](education/datacamp-scraper.ts) | datacamp |
| [duolingo-scraper.ts](education/duolingo-scraper.ts) | duolingo |
| [edx-scraper.ts](education/edx-scraper.ts) | edx |
| [freecodecamp-scraper.ts](education/freecodecamp-scraper.ts) | freecodecamp |
| [google-scholar-scraper.ts](education/google-scholar-scraper.ts) | google scholar |
| [jstor-scraper.ts](education/jstor-scraper.ts) | jstor |
| [kajabi-scraper.ts](education/kajabi-scraper.ts) | kajabi |
| [khan-academy-scraper.ts](education/khan-academy-scraper.ts) | khan academy |
| [linkedin-learning-scraper.ts](education/linkedin-learning-scraper.ts) | linkedin learning |
| [masterclass-scraper.ts](education/masterclass-scraper.ts) | masterclass |
| [memrise-scraper.ts](education/memrise-scraper.ts) | memrise |
| [mit-opencourseware-scraper.ts](education/mit-opencourseware-scraper.ts) | mit opencourseware |
| [openstax-scraper.ts](education/openstax-scraper.ts) | openstax |
| [pluralsight-scraper.ts](education/pluralsight-scraper.ts) | pluralsight |
| [podia-scraper.ts](education/podia-scraper.ts) | podia |
| [project-gutenberg-scraper.ts](education/project-gutenberg-scraper.ts) | project gutenberg |
| [quizlet-scraper.ts](education/quizlet-scraper.ts) | quizlet |
| [ratemyprofessors-scraper.ts](education/ratemyprofessors-scraper.ts) | ratemyprofessors |
| [rosetta-stone-scraper.ts](education/rosetta-stone-scraper.ts) | rosetta stone |
| [scholastic-scraper.ts](education/scholastic-scraper.ts) | scholastic |
| [skillshare-scraper.ts](education/skillshare-scraper.ts) | skillshare |
| [teachable-scraper.ts](education/teachable-scraper.ts) | teachable |
| [ted-talks-scraper.ts](education/ted-talks-scraper.ts) | ted talks |
| [thinkific-scraper.ts](education/thinkific-scraper.ts) | thinkific |
| [udemy-scraper.ts](education/udemy-scraper.ts) | udemy |

</details>

<details>
<summary><strong>International</strong> (35 scripts)</summary>

| Script | Target |
|--------|--------|
| [about-you-scraper.ts](international/about-you-scraper.ts) | about you |
| [allegro-scraper.ts](international/allegro-scraper.ts) | allegro |
| [auchan-scraper.ts](international/auchan-scraper.ts) | auchan |
| [blibli-scraper.ts](international/blibli-scraper.ts) | blibli |
| [bol-com-scraper.ts](international/bol-com-scraper.ts) | bol com |
| [bukalapak-scraper.ts](international/bukalapak-scraper.ts) | bukalapak |
| [carrefour-scraper.ts](international/carrefour-scraper.ts) | carrefour |
| [cdiscount-scraper.ts](international/cdiscount-scraper.ts) | cdiscount |
| [coles-scraper.ts](international/coles-scraper.ts) | coles |
| [coupang-scraper.ts](international/coupang-scraper.ts) | coupang |
| [daraz-scraper.ts](international/daraz-scraper.ts) | daraz |
| [emag-scraper.ts](international/emag-scraper.ts) | emag |
| [flipkart-scraper.ts](international/flipkart-scraper.ts) | flipkart |
| [fnac-scraper.ts](international/fnac-scraper.ts) | fnac |
| [gumtree-scraper.ts](international/gumtree-scraper.ts) | gumtree |
| [jd-com-scraper.ts](international/jd-com-scraper.ts) | jd com |
| [jumia-scraper.ts](international/jumia-scraper.ts) | jumia |
| [lazada-scraper.ts](international/lazada-scraper.ts) | lazada |
| [lidl-scraper.ts](international/lidl-scraper.ts) | lidl |
| [mercado-libre-scraper.ts](international/mercado-libre-scraper.ts) | mercado libre |
| [noon-scraper.ts](international/noon-scraper.ts) | noon |
| [olx-scraper.ts](international/olx-scraper.ts) | olx |
| [otto-scraper.ts](international/otto-scraper.ts) | otto |
| [ozon-scraper.ts](international/ozon-scraper.ts) | ozon |
| [pinduoduo-scraper.ts](international/pinduoduo-scraper.ts) | pinduoduo |
| [rakuten-scraper.ts](international/rakuten-scraper.ts) | rakuten |
| [shopee-scraper.ts](international/shopee-scraper.ts) | shopee |
| [souq-scraper.ts](international/souq-scraper.ts) | souq |
| [taobao-scraper.ts](international/taobao-scraper.ts) | taobao |
| [tokopedia-scraper.ts](international/tokopedia-scraper.ts) | tokopedia |
| [trade-me-scraper.ts](international/trade-me-scraper.ts) | trade me |
| [trendyol-scraper.ts](international/trendyol-scraper.ts) | trendyol |
| [wildberries-scraper.ts](international/wildberries-scraper.ts) | wildberries |
| [woolworths-scraper.ts](international/woolworths-scraper.ts) | woolworths |
| [zalando-scraper.ts](international/zalando-scraper.ts) | zalando |

</details>

<details>
<summary><strong>Jobs</strong> (35 scripts)</summary>

| Script | Target |
|--------|--------|
| [angellist-scraper.ts](jobs/angellist-scraper.ts) | angellist |
| [builtin-scraper.ts](jobs/builtin-scraper.ts) | builtin |
| [careerbuilder-scraper.ts](jobs/careerbuilder-scraper.ts) | careerbuilder |
| [dice-scraper.ts](jobs/dice-scraper.ts) | dice |
| [dice-tech-jobs-scraper.ts](jobs/dice-tech-jobs-scraper.ts) | dice tech jobs |
| [fiverr-scraper.ts](jobs/fiverr-scraper.ts) | fiverr |
| [flexjobs-scraper.ts](jobs/flexjobs-scraper.ts) | flexjobs |
| [freelancer-scraper.ts](jobs/freelancer-scraper.ts) | freelancer |
| [glassdoor-scraper.ts](jobs/glassdoor-scraper.ts) | glassdoor |
| [google-jobs-scraper.ts](jobs/google-jobs-scraper.ts) | google jobs |
| [greenhouse-scraper.ts](jobs/greenhouse-scraper.ts) | greenhouse |
| [guru-scraper.ts](jobs/guru-scraper.ts) | guru |
| [handshake-scraper.ts](jobs/handshake-scraper.ts) | handshake |
| [hired-scraper.ts](jobs/hired-scraper.ts) | hired |
| [icims-scraper.ts](jobs/icims-scraper.ts) | icims |
| [indeed-scraper.ts](jobs/indeed-scraper.ts) | indeed |
| [jobvite-scraper.ts](jobs/jobvite-scraper.ts) | jobvite |
| [ladders-scraper.ts](jobs/ladders-scraper.ts) | ladders |
| [lensa-scraper.ts](jobs/lensa-scraper.ts) | lensa |
| [lever-scraper.ts](jobs/lever-scraper.ts) | lever |
| [linkedin-jobs-scraper.ts](jobs/linkedin-jobs-scraper.ts) | linkedin jobs |
| [monster-jobs-scraper.ts](jobs/monster-jobs-scraper.ts) | monster jobs |
| [monster-scraper.ts](jobs/monster-scraper.ts) | monster |
| [randstad-scraper.ts](jobs/randstad-scraper.ts) | randstad |
| [remoteok-scraper.ts](jobs/remoteok-scraper.ts) | remoteok |
| [roberthalf-scraper.ts](jobs/roberthalf-scraper.ts) | roberthalf |
| [simplyhired-scraper.ts](jobs/simplyhired-scraper.ts) | simplyhired |
| [snagajob-scraper.ts](jobs/snagajob-scraper.ts) | snagajob |
| [toptal-scraper.ts](jobs/toptal-scraper.ts) | toptal |
| [upwork-scraper.ts](jobs/upwork-scraper.ts) | upwork |
| [wellfound-scraper.ts](jobs/wellfound-scraper.ts) | wellfound |
| [weworkremotely-scraper.ts](jobs/weworkremotely-scraper.ts) | weworkremotely |
| [workday-scraper.ts](jobs/workday-scraper.ts) | workday |
| [ziprecruiter-jobs-scraper.ts](jobs/ziprecruiter-jobs-scraper.ts) | ziprecruiter jobs |
| [ziprecruiter-scraper.ts](jobs/ziprecruiter-scraper.ts) | ziprecruiter |

</details>

<details>
<summary><strong>Real Estate</strong> (30 scripts)</summary>

| Script | Target |
|--------|--------|
| [apartments-scraper.ts](real-estate/apartments-scraper.ts) | apartments |
| [century21-scraper.ts](real-estate/century21-scraper.ts) | century21 |
| [coldwellbanker-scraper.ts](real-estate/coldwellbanker-scraper.ts) | coldwellbanker |
| [commercialcafe-scraper.ts](real-estate/commercialcafe-scraper.ts) | commercialcafe |
| [compass-scraper.ts](real-estate/compass-scraper.ts) | compass |
| [domain-scraper.ts](real-estate/domain-scraper.ts) | domain |
| [foreclosure-scraper.ts](real-estate/foreclosure-scraper.ts) | foreclosure |
| [homelight-scraper.ts](real-estate/homelight-scraper.ts) | homelight |
| [homes-scraper.ts](real-estate/homes-scraper.ts) | homes |
| [homesnap-scraper.ts](real-estate/homesnap-scraper.ts) | homesnap |
| [hotpads-scraper.ts](real-estate/hotpads-scraper.ts) | hotpads |
| [idealista-scraper.ts](real-estate/idealista-scraper.ts) | idealista |
| [immoscout24-scraper.ts](real-estate/immoscout24-scraper.ts) | immoscout24 |
| [kw-scraper.ts](real-estate/kw-scraper.ts) | kw |
| [landwatch-scraper.ts](real-estate/landwatch-scraper.ts) | landwatch |
| [loopnet-scraper.ts](real-estate/loopnet-scraper.ts) | loopnet |
| [movoto-scraper.ts](real-estate/movoto-scraper.ts) | movoto |
| [offerpad-scraper.ts](real-estate/offerpad-scraper.ts) | offerpad |
| [opendoor-scraper.ts](real-estate/opendoor-scraper.ts) | opendoor |
| [propertyshark-scraper.ts](real-estate/propertyshark-scraper.ts) | propertyshark |
| [realtor-scraper.ts](real-estate/realtor-scraper.ts) | realtor |
| [redfin-scraper.ts](real-estate/redfin-scraper.ts) | redfin |
| [remax-scraper.ts](real-estate/remax-scraper.ts) | remax |
| [rent-scraper.ts](real-estate/rent-scraper.ts) | rent |
| [rightmove-scraper.ts](real-estate/rightmove-scraper.ts) | rightmove |
| [rockethomes-scraper.ts](real-estate/rockethomes-scraper.ts) | rockethomes |
| [sothebysrealty-scraper.ts](real-estate/sothebysrealty-scraper.ts) | sothebysrealty |
| [trulia-scraper.ts](real-estate/trulia-scraper.ts) | trulia |
| [zillow-scraper.ts](real-estate/zillow-scraper.ts) | zillow |
| [zoopla-scraper.ts](real-estate/zoopla-scraper.ts) | zoopla |

</details>

<details>
<summary><strong>Social</strong> (30 scripts)</summary>

| Script | Target |
|--------|--------|
| [bereal-scraper.ts](social/bereal-scraper.ts) | bereal |
| [bluesky-scraper.ts](social/bluesky-scraper.ts) | bluesky |
| [clubhouse-scraper.ts](social/clubhouse-scraper.ts) | clubhouse |
| [devto-social-scraper.ts](social/devto-social-scraper.ts) | devto social |
| [discord-scraper.ts](social/discord-scraper.ts) | discord |
| [facebook-scraper.ts](social/facebook-scraper.ts) | facebook |
| [instagram-scraper.ts](social/instagram-scraper.ts) | instagram |
| [kick-social-scraper.ts](social/kick-social-scraper.ts) | kick social |
| [lemon8-scraper.ts](social/lemon8-scraper.ts) | lemon8 |
| [linkedin-scraper.ts](social/linkedin-scraper.ts) | linkedin |
| [mastodon-scraper.ts](social/mastodon-scraper.ts) | mastodon |
| [medium-scraper.ts](social/medium-scraper.ts) | medium |
| [nextdoor-social-scraper.ts](social/nextdoor-social-scraper.ts) | nextdoor social |
| [pinterest-scraper.ts](social/pinterest-scraper.ts) | pinterest |
| [quora-scraper.ts](social/quora-scraper.ts) | quora |
| [reddit-scraper.ts](social/reddit-scraper.ts) | reddit |
| [signal-scraper.ts](social/signal-scraper.ts) | signal |
| [slack-scraper.ts](social/slack-scraper.ts) | slack |
| [snapchat-scraper.ts](social/snapchat-scraper.ts) | snapchat |
| [substack-scraper.ts](social/substack-scraper.ts) | substack |
| [telegram-scraper.ts](social/telegram-scraper.ts) | telegram |
| [threads-scraper.ts](social/threads-scraper.ts) | threads |
| [tiktok-social-scraper.ts](social/tiktok-social-scraper.ts) | tiktok social |
| [truth-social-scraper.ts](social/truth-social-scraper.ts) | truth social |
| [tumblr-scraper.ts](social/tumblr-scraper.ts) | tumblr |
| [twitch-social-scraper.ts](social/twitch-social-scraper.ts) | twitch social |
| [twitter-scraper.ts](social/twitter-scraper.ts) | twitter |
| [vk-scraper.ts](social/vk-scraper.ts) | vk |
| [whatsapp-scraper.ts](social/whatsapp-scraper.ts) | whatsapp |
| [youtube-social-scraper.ts](social/youtube-social-scraper.ts) | youtube social |

</details>

<details>
<summary><strong>Health</strong> (30 scripts)</summary>

| Script | Target |
|--------|--------|
| [betterhelp-scraper.ts](health/betterhelp-scraper.ts) | betterhelp |
| [calm-scraper.ts](health/calm-scraper.ts) | calm |
| [cdc-scraper.ts](health/cdc-scraper.ts) | cdc |
| [clinicaltrials-gov-scraper.ts](health/clinicaltrials-gov-scraper.ts) | clinicaltrials gov |
| [cvs-scraper.ts](health/cvs-scraper.ts) | cvs |
| [drugs-com-scraper.ts](health/drugs-com-scraper.ts) | drugs com |
| [epocrates-scraper.ts](health/epocrates-scraper.ts) | epocrates |
| [everyday-health-scraper.ts](health/everyday-health-scraper.ts) | everyday health |
| [fitbit-scraper.ts](health/fitbit-scraper.ts) | fitbit |
| [garmin-connect-scraper.ts](health/garmin-connect-scraper.ts) | garmin connect |
| [goodrx-scraper.ts](health/goodrx-scraper.ts) | goodrx |
| [healthgrades-scraper.ts](health/healthgrades-scraper.ts) | healthgrades |
| [healthline-scraper.ts](health/healthline-scraper.ts) | healthline |
| [mayo-clinic-scraper.ts](health/mayo-clinic-scraper.ts) | mayo clinic |
| [medical-news-today-scraper.ts](health/medical-news-today-scraper.ts) | medical news today |
| [medlineplus-scraper.ts](health/medlineplus-scraper.ts) | medlineplus |
| [medscape-scraper.ts](health/medscape-scraper.ts) | medscape |
| [myfitnesspal-scraper.ts](health/myfitnesspal-scraper.ts) | myfitnesspal |
| [nih-scraper.ts](health/nih-scraper.ts) | nih |
| [noom-scraper.ts](health/noom-scraper.ts) | noom |
| [one-medical-scraper.ts](health/one-medical-scraper.ts) | one medical |
| [peloton-scraper.ts](health/peloton-scraper.ts) | peloton |
| [psychology-today-scraper.ts](health/psychology-today-scraper.ts) | psychology today |
| [pubmed-health-scraper.ts](health/pubmed-health-scraper.ts) | pubmed health |
| [rxlist-scraper.ts](health/rxlist-scraper.ts) | rxlist |
| [teladoc-scraper.ts](health/teladoc-scraper.ts) | teladoc |
| [vitals-scraper.ts](health/vitals-scraper.ts) | vitals |
| [walgreens-scraper.ts](health/walgreens-scraper.ts) | walgreens |
| [webmd-scraper.ts](health/webmd-scraper.ts) | webmd |
| [zocdoc-scraper.ts](health/zocdoc-scraper.ts) | zocdoc |

</details>

<details>
<summary><strong>Food</strong> (30 scripts)</summary>

| Script | Target |
|--------|--------|
| [allrecipes-scraper.ts](food/allrecipes-scraper.ts) | allrecipes |
| [amazon-fresh-scraper.ts](food/amazon-fresh-scraper.ts) | amazon fresh |
| [beyondmenu-scraper.ts](food/beyondmenu-scraper.ts) | beyondmenu |
| [blue-apron-scraper.ts](food/blue-apron-scraper.ts) | blue apron |
| [bon-appetit-scraper.ts](food/bon-appetit-scraper.ts) | bon appetit |
| [caviar-scraper.ts](food/caviar-scraper.ts) | caviar |
| [chownow-scraper.ts](food/chownow-scraper.ts) | chownow |
| [cookpad-scraper.ts](food/cookpad-scraper.ts) | cookpad |
| [doordash-scraper.ts](food/doordash-scraper.ts) | doordash |
| [eater-scraper.ts](food/eater-scraper.ts) | eater |
| [eatstreet-scraper.ts](food/eatstreet-scraper.ts) | eatstreet |
| [epicurious-scraper.ts](food/epicurious-scraper.ts) | epicurious |
| [food-network-scraper.ts](food/food-network-scraper.ts) | food network |
| [food52-scraper.ts](food/food52-scraper.ts) | food52 |
| [freshdirect-scraper.ts](food/freshdirect-scraper.ts) | freshdirect |
| [grubhub-scraper.ts](food/grubhub-scraper.ts) | grubhub |
| [hellofresh-scraper.ts](food/hellofresh-scraper.ts) | hellofresh |
| [instacart-scraper.ts](food/instacart-scraper.ts) | instacart |
| [just-eat-scraper.ts](food/just-eat-scraper.ts) | just eat |
| [kroger-scraper.ts](food/kroger-scraper.ts) | kroger |
| [menupages-scraper.ts](food/menupages-scraper.ts) | menupages |
| [opentable-scraper.ts](food/opentable-scraper.ts) | opentable |
| [postmates-scraper.ts](food/postmates-scraper.ts) | postmates |
| [resy-scraper.ts](food/resy-scraper.ts) | resy |
| [seamless-scraper.ts](food/seamless-scraper.ts) | seamless |
| [serious-eats-scraper.ts](food/serious-eats-scraper.ts) | serious eats |
| [simplyrecipes-scraper.ts](food/simplyrecipes-scraper.ts) | simplyrecipes |
| [tasty-scraper.ts](food/tasty-scraper.ts) | tasty |
| [ubereats-scraper.ts](food/ubereats-scraper.ts) | ubereats |
| [zomato-scraper.ts](food/zomato-scraper.ts) | zomato |

</details>

<details>
<summary><strong>Gaming & Esports</strong> (30 scripts)</summary>

| Script | Target |
|--------|--------|
| [curseforge-scraper.ts](gaming-esports/curseforge-scraper.ts) | curseforge |
| [epic-games-store-scraper.ts](gaming-esports/epic-games-store-scraper.ts) | epic games store |
| [eurogamer-scraper.ts](gaming-esports/eurogamer-scraper.ts) | eurogamer |
| [gamefaqs-scraper.ts](gaming-esports/gamefaqs-scraper.ts) | gamefaqs |
| [gamespot-scraper.ts](gaming-esports/gamespot-scraper.ts) | gamespot |
| [gg-deals-scraper.ts](gaming-esports/gg-deals-scraper.ts) | gg deals |
| [giant-bomb-scraper.ts](gaming-esports/giant-bomb-scraper.ts) | giant bomb |
| [gog-scraper.ts](gaming-esports/gog-scraper.ts) | gog |
| [hltv-scraper.ts](gaming-esports/hltv-scraper.ts) | hltv |
| [howlongtobeat-scraper.ts](gaming-esports/howlongtobeat-scraper.ts) | howlongtobeat |
| [ign-scraper.ts](gaming-esports/ign-scraper.ts) | ign |
| [isthereanydeal-scraper.ts](gaming-esports/isthereanydeal-scraper.ts) | isthereanydeal |
| [kick-scraper.ts](gaming-esports/kick-scraper.ts) | kick |
| [kotaku-scraper.ts](gaming-esports/kotaku-scraper.ts) | kotaku |
| [liquipedia-scraper.ts](gaming-esports/liquipedia-scraper.ts) | liquipedia |
| [metacritic-scraper.ts](gaming-esports/metacritic-scraper.ts) | metacritic |
| [modrinth-scraper.ts](gaming-esports/modrinth-scraper.ts) | modrinth |
| [nexus-mods-scraper.ts](gaming-esports/nexus-mods-scraper.ts) | nexus mods |
| [nintendo-life-scraper.ts](gaming-esports/nintendo-life-scraper.ts) | nintendo life |
| [opgg-scraper.ts](gaming-esports/opgg-scraper.ts) | opgg |
| [pc-gamer-scraper.ts](gaming-esports/pc-gamer-scraper.ts) | pc gamer |
| [polygon-scraper.ts](gaming-esports/polygon-scraper.ts) | polygon |
| [pure-xbox-scraper.ts](gaming-esports/pure-xbox-scraper.ts) | pure xbox |
| [push-square-scraper.ts](gaming-esports/push-square-scraper.ts) | push square |
| [rawg-scraper.ts](gaming-esports/rawg-scraper.ts) | rawg |
| [rock-paper-shotgun-scraper.ts](gaming-esports/rock-paper-shotgun-scraper.ts) | rock paper shotgun |
| [speedrun-scraper.ts](gaming-esports/speedrun-scraper.ts) | speedrun |
| [steam-scraper.ts](gaming-esports/steam-scraper.ts) | steam |
| [steamdb-scraper.ts](gaming-esports/steamdb-scraper.ts) | steamdb |
| [twitch-gaming-scraper.ts](gaming-esports/twitch-gaming-scraper.ts) | twitch gaming |

</details>

<details>
<summary><strong>Government & Legal</strong> (30 scripts)</summary>

| Script | Target |
|--------|--------|
| [above-the-law-scraper.ts](government-legal/above-the-law-scraper.ts) | above the law |
| [avvo-scraper.ts](government-legal/avvo-scraper.ts) | avvo |
| [ballotpedia-scraper.ts](government-legal/ballotpedia-scraper.ts) | ballotpedia |
| [bls-scraper.ts](government-legal/bls-scraper.ts) | bls |
| [casetext-scraper.ts](government-legal/casetext-scraper.ts) | casetext |
| [census-bureau-scraper.ts](government-legal/census-bureau-scraper.ts) | census bureau |
| [congress-gov-scraper.ts](government-legal/congress-gov-scraper.ts) | congress gov |
| [courtlistener-scraper.ts](government-legal/courtlistener-scraper.ts) | courtlistener |
| [data-gov-scraper.ts](government-legal/data-gov-scraper.ts) | data gov |
| [fec-scraper.ts](government-legal/fec-scraper.ts) | fec |
| [federal-register-scraper.ts](government-legal/federal-register-scraper.ts) | federal register |
| [findlaw-scraper.ts](government-legal/findlaw-scraper.ts) | findlaw |
| [govtrack-scraper.ts](government-legal/govtrack-scraper.ts) | govtrack |
| [irs-scraper.ts](government-legal/irs-scraper.ts) | irs |
| [justia-scraper.ts](government-legal/justia-scraper.ts) | justia |
| [law-com-scraper.ts](government-legal/law-com-scraper.ts) | law com |
| [legalzoom-scraper.ts](government-legal/legalzoom-scraper.ts) | legalzoom |
| [lexisnexis-scraper.ts](government-legal/lexisnexis-scraper.ts) | lexisnexis |
| [medicare-scraper.ts](government-legal/medicare-scraper.ts) | medicare |
| [nolo-scraper.ts](government-legal/nolo-scraper.ts) | nolo |
| [opensecrets-scraper.ts](government-legal/opensecrets-scraper.ts) | opensecrets |
| [pacer-scraper.ts](government-legal/pacer-scraper.ts) | pacer |
| [regulations-gov-scraper.ts](government-legal/regulations-gov-scraper.ts) | regulations gov |
| [rocket-lawyer-scraper.ts](government-legal/rocket-lawyer-scraper.ts) | rocket lawyer |
| [sam-gov-scraper.ts](government-legal/sam-gov-scraper.ts) | sam gov |
| [sec-edgar-government-scraper.ts](government-legal/sec-edgar-government-scraper.ts) | sec edgar government |
| [ssa-scraper.ts](government-legal/ssa-scraper.ts) | ssa |
| [usa-gov-scraper.ts](government-legal/usa-gov-scraper.ts) | usa gov |
| [uspto-scraper.ts](government-legal/uspto-scraper.ts) | uspto |
| [westlaw-scraper.ts](government-legal/westlaw-scraper.ts) | westlaw |

</details>

<details>
<summary><strong>Fashion & Beauty</strong> (30 scripts)</summary>

| Script | Target |
|--------|--------|
| [asos-fashion-scraper.ts](fashion-beauty/asos-fashion-scraper.ts) | asos fashion |
| [bershka-scraper.ts](fashion-beauty/bershka-scraper.ts) | bershka |
| [boohoo-scraper.ts](fashion-beauty/boohoo-scraper.ts) | boohoo |
| [cos-scraper.ts](fashion-beauty/cos-scraper.ts) | cos |
| [depop-fashion-scraper.ts](fashion-beauty/depop-fashion-scraper.ts) | depop fashion |
| [farfetch-scraper.ts](fashion-beauty/farfetch-scraper.ts) | farfetch |
| [fashion-nova-scraper.ts](fashion-beauty/fashion-nova-scraper.ts) | fashion nova |
| [gilt-scraper.ts](fashion-beauty/gilt-scraper.ts) | gilt |
| [glossier-fashion-scraper.ts](fashion-beauty/glossier-fashion-scraper.ts) | glossier fashion |
| [hm-fashion-scraper.ts](fashion-beauty/hm-fashion-scraper.ts) | hm fashion |
| [lyst-scraper.ts](fashion-beauty/lyst-scraper.ts) | lyst |
| [mango-scraper.ts](fashion-beauty/mango-scraper.ts) | mango |
| [massimo-dutti-scraper.ts](fashion-beauty/massimo-dutti-scraper.ts) | massimo dutti |
| [matchesfashion-scraper.ts](fashion-beauty/matchesfashion-scraper.ts) | matchesfashion |
| [mytheresa-scraper.ts](fashion-beauty/mytheresa-scraper.ts) | mytheresa |
| [net-a-porter-scraper.ts](fashion-beauty/net-a-porter-scraper.ts) | net a porter |
| [other-stories-scraper.ts](fashion-beauty/other-stories-scraper.ts) | other stories |
| [prettylittlething-scraper.ts](fashion-beauty/prettylittlething-scraper.ts) | prettylittlething |
| [primark-scraper.ts](fashion-beauty/primark-scraper.ts) | primark |
| [pull-and-bear-scraper.ts](fashion-beauty/pull-and-bear-scraper.ts) | pull and bear |
| [revolve-scraper.ts](fashion-beauty/revolve-scraper.ts) | revolve |
| [rue-la-la-scraper.ts](fashion-beauty/rue-la-la-scraper.ts) | rue la la |
| [sephora-fashion-scraper.ts](fashion-beauty/sephora-fashion-scraper.ts) | sephora fashion |
| [shein-fashion-scraper.ts](fashion-beauty/shein-fashion-scraper.ts) | shein fashion |
| [ssense-scraper.ts](fashion-beauty/ssense-scraper.ts) | ssense |
| [stitchfix-scraper.ts](fashion-beauty/stitchfix-scraper.ts) | stitchfix |
| [therealreal-scraper.ts](fashion-beauty/therealreal-scraper.ts) | therealreal |
| [ulta-scraper.ts](fashion-beauty/ulta-scraper.ts) | ulta |
| [vogue-scraper.ts](fashion-beauty/vogue-scraper.ts) | vogue |
| [zara-fashion-scraper.ts](fashion-beauty/zara-fashion-scraper.ts) | zara fashion |

</details>

<details>
<summary><strong>Reviews</strong> (26 scripts)</summary>

| Script | Target |
|--------|--------|
| [alternativeto-scraper.ts](reviews/alternativeto-scraper.ts) | alternativeto |
| [amazon-reviews-scraper.ts](reviews/amazon-reviews-scraper.ts) | amazon reviews |
| [angi-reviews-scraper.ts](reviews/angi-reviews-scraper.ts) | angi reviews |
| [bbb-reviews-scraper.ts](reviews/bbb-reviews-scraper.ts) | bbb reviews |
| [bbb-scraper.ts](reviews/bbb-scraper.ts) | bbb |
| [birdeye-scraper.ts](reviews/birdeye-scraper.ts) | birdeye |
| [capterra-scraper.ts](reviews/capterra-scraper.ts) | capterra |
| [consumer-reports-scraper.ts](reviews/consumer-reports-scraper.ts) | consumer reports |
| [consumeraffairs-scraper.ts](reviews/consumeraffairs-scraper.ts) | consumeraffairs |
| [facebook-reviews-scraper.ts](reviews/facebook-reviews-scraper.ts) | facebook reviews |
| [foursquare-reviews-scraper.ts](reviews/foursquare-reviews-scraper.ts) | foursquare reviews |
| [g2-scraper.ts](reviews/g2-scraper.ts) | g2 |
| [getapp-scraper.ts](reviews/getapp-scraper.ts) | getapp |
| [google-reviews-scraper.ts](reviews/google-reviews-scraper.ts) | google reviews |
| [influenster-scraper.ts](reviews/influenster-scraper.ts) | influenster |
| [jd-power-scraper.ts](reviews/jd-power-scraper.ts) | jd power |
| [pissedconsumer-scraper.ts](reviews/pissedconsumer-scraper.ts) | pissedconsumer |
| [producthunt-scraper.ts](reviews/producthunt-scraper.ts) | producthunt |
| [sitejabber-scraper.ts](reviews/sitejabber-scraper.ts) | sitejabber |
| [software-advice-scraper.ts](reviews/software-advice-scraper.ts) | software advice |
| [sourceforge-scraper.ts](reviews/sourceforge-scraper.ts) | sourceforge |
| [tripadvisor-reviews-scraper.ts](reviews/tripadvisor-reviews-scraper.ts) | tripadvisor reviews |
| [trustpilot-scraper.ts](reviews/trustpilot-scraper.ts) | trustpilot |
| [trustradius-scraper.ts](reviews/trustradius-scraper.ts) | trustradius |
| [wirecutter-scraper.ts](reviews/wirecutter-scraper.ts) | wirecutter |
| [yelp-scraper.ts](reviews/yelp-scraper.ts) | yelp |

</details>

<details>
<summary><strong>SaaS & B2B</strong> (25 scripts)</summary>

| Script | Target |
|--------|--------|
| [airtable-scraper.ts](saas-b2b/airtable-scraper.ts) | airtable |
| [asana-scraper.ts](saas-b2b/asana-scraper.ts) | asana |
| [atlassian-marketplace-scraper.ts](saas-b2b/atlassian-marketplace-scraper.ts) | atlassian marketplace |
| [aws-marketplace-scraper.ts](saas-b2b/aws-marketplace-scraper.ts) | aws marketplace |
| [bubble-scraper.ts](saas-b2b/bubble-scraper.ts) | bubble |
| [canva-scraper.ts](saas-b2b/canva-scraper.ts) | canva |
| [clickup-scraper.ts](saas-b2b/clickup-scraper.ts) | clickup |
| [confluence-scraper.ts](saas-b2b/confluence-scraper.ts) | confluence |
| [figma-scraper.ts](saas-b2b/figma-scraper.ts) | figma |
| [freshworks-scraper.ts](saas-b2b/freshworks-scraper.ts) | freshworks |
| [hubspot-scraper.ts](saas-b2b/hubspot-scraper.ts) | hubspot |
| [intercom-scraper.ts](saas-b2b/intercom-scraper.ts) | intercom |
| [jira-scraper.ts](saas-b2b/jira-scraper.ts) | jira |
| [linear-scraper.ts](saas-b2b/linear-scraper.ts) | linear |
| [miro-scraper.ts](saas-b2b/miro-scraper.ts) | miro |
| [monday-scraper.ts](saas-b2b/monday-scraper.ts) | monday |
| [notion-scraper.ts](saas-b2b/notion-scraper.ts) | notion |
| [retool-scraper.ts](saas-b2b/retool-scraper.ts) | retool |
| [salesforce-appexchange-scraper.ts](saas-b2b/salesforce-appexchange-scraper.ts) | salesforce appexchange |
| [shopify-app-store-scraper.ts](saas-b2b/shopify-app-store-scraper.ts) | shopify app store |
| [slack-app-directory-scraper.ts](saas-b2b/slack-app-directory-scraper.ts) | slack app directory |
| [trello-scraper.ts](saas-b2b/trello-scraper.ts) | trello |
| [webflow-scraper.ts](saas-b2b/webflow-scraper.ts) | webflow |
| [zapier-scraper.ts](saas-b2b/zapier-scraper.ts) | zapier |
| [zendesk-scraper.ts](saas-b2b/zendesk-scraper.ts) | zendesk |

</details>

<details>
<summary><strong>Science & Research</strong> (25 scripts)</summary>

| Script | Target |
|--------|--------|
| [acm-digital-library-scraper.ts](science-research/acm-digital-library-scraper.ts) | acm digital library |
| [arxiv-scraper.ts](science-research/arxiv-scraper.ts) | arxiv |
| [biorxiv-scraper.ts](science-research/biorxiv-scraper.ts) | biorxiv |
| [connected-papers-scraper.ts](science-research/connected-papers-scraper.ts) | connected papers |
| [dimensions-scraper.ts](science-research/dimensions-scraper.ts) | dimensions |
| [elsevier-scraper.ts](science-research/elsevier-scraper.ts) | elsevier |
| [frontiers-scraper.ts](science-research/frontiers-scraper.ts) | frontiers |
| [google-scholar-science-scraper.ts](science-research/google-scholar-science-scraper.ts) | google scholar science |
| [ieee-xplore-scraper.ts](science-research/ieee-xplore-scraper.ts) | ieee xplore |
| [mdpi-scraper.ts](science-research/mdpi-scraper.ts) | mdpi |
| [medrxiv-scraper.ts](science-research/medrxiv-scraper.ts) | medrxiv |
| [nature-scraper.ts](science-research/nature-scraper.ts) | nature |
| [orcid-scraper.ts](science-research/orcid-scraper.ts) | orcid |
| [plos-one-scraper.ts](science-research/plos-one-scraper.ts) | plos one |
| [pubmed-scraper.ts](science-research/pubmed-scraper.ts) | pubmed |
| [researchgate-scraper.ts](science-research/researchgate-scraper.ts) | researchgate |
| [sciencedirect-scraper.ts](science-research/sciencedirect-scraper.ts) | sciencedirect |
| [scite-scraper.ts](science-research/scite-scraper.ts) | scite |
| [scopus-scraper.ts](science-research/scopus-scraper.ts) | scopus |
| [semantic-scholar-scraper.ts](science-research/semantic-scholar-scraper.ts) | semantic scholar |
| [springer-scraper.ts](science-research/springer-scraper.ts) | springer |
| [ssrn-scraper.ts](science-research/ssrn-scraper.ts) | ssrn |
| [taylor-francis-scraper.ts](science-research/taylor-francis-scraper.ts) | taylor francis |
| [web-of-science-scraper.ts](science-research/web-of-science-scraper.ts) | web of science |
| [wiley-scraper.ts](science-research/wiley-scraper.ts) | wiley |

</details>

<details>
<summary><strong>Classifieds & Marketplace</strong> (20 scripts)</summary>

| Script | Target |
|--------|--------|
| [1stdibs-scraper.ts](classifieds/1stdibs-scraper.ts) | 1stdibs |
| [carousell-scraper.ts](classifieds/carousell-scraper.ts) | carousell |
| [chairish-scraper.ts](classifieds/chairish-scraper.ts) | chairish |
| [craigslist-scraper.ts](classifieds/craigslist-scraper.ts) | craigslist |
| [decluttr-scraper.ts](classifieds/decluttr-scraper.ts) | decluttr |
| [depop-classifieds-scraper.ts](classifieds/depop-classifieds-scraper.ts) | depop classifieds |
| [facebook-marketplace-scraper.ts](classifieds/facebook-marketplace-scraper.ts) | facebook marketplace |
| [gazelle-scraper.ts](classifieds/gazelle-scraper.ts) | gazelle |
| [grailed-scraper.ts](classifieds/grailed-scraper.ts) | grailed |
| [kidizen-scraper.ts](classifieds/kidizen-scraper.ts) | kidizen |
| [letgo-scraper.ts](classifieds/letgo-scraper.ts) | letgo |
| [mercari-classifieds-scraper.ts](classifieds/mercari-classifieds-scraper.ts) | mercari classifieds |
| [nextdoor-scraper.ts](classifieds/nextdoor-scraper.ts) | nextdoor |
| [offerup-scraper.ts](classifieds/offerup-scraper.ts) | offerup |
| [poshmark-classifieds-scraper.ts](classifieds/poshmark-classifieds-scraper.ts) | poshmark classifieds |
| [rebag-scraper.ts](classifieds/rebag-scraper.ts) | rebag |
| [swappa-scraper.ts](classifieds/swappa-scraper.ts) | swappa |
| [thredup-classifieds-scraper.ts](classifieds/thredup-classifieds-scraper.ts) | thredup classifieds |
| [tradesy-scraper.ts](classifieds/tradesy-scraper.ts) | tradesy |
| [vinted-scraper.ts](classifieds/vinted-scraper.ts) | vinted |

</details>

<details>
<summary><strong>Directories & Listings</strong> (20 scripts)</summary>

| Script | Target |
|--------|--------|
| [angi-directory-scraper.ts](directories/angi-directory-scraper.ts) | angi directory |
| [apollo-io-scraper.ts](directories/apollo-io-scraper.ts) | apollo io |
| [bbb-scraper.ts](directories/bbb-scraper.ts) | bbb |
| [cb-insights-scraper.ts](directories/cb-insights-scraper.ts) | cb insights |
| [clearbit-scraper.ts](directories/clearbit-scraper.ts) | clearbit |
| [crunchbase-directory-scraper.ts](directories/crunchbase-directory-scraper.ts) | crunchbase directory |
| [dnb-scraper.ts](directories/dnb-scraper.ts) | dnb |
| [foursquare-scraper.ts](directories/foursquare-scraper.ts) | foursquare |
| [hotfrog-scraper.ts](directories/hotfrog-scraper.ts) | hotfrog |
| [hunter-io-scraper.ts](directories/hunter-io-scraper.ts) | hunter io |
| [kompass-scraper.ts](directories/kompass-scraper.ts) | kompass |
| [lusha-scraper.ts](directories/lusha-scraper.ts) | lusha |
| [manta-scraper.ts](directories/manta-scraper.ts) | manta |
| [mapquest-scraper.ts](directories/mapquest-scraper.ts) | mapquest |
| [owler-scraper.ts](directories/owler-scraper.ts) | owler |
| [pitchbook-scraper.ts](directories/pitchbook-scraper.ts) | pitchbook |
| [superpages-scraper.ts](directories/superpages-scraper.ts) | superpages |
| [white-pages-scraper.ts](directories/white-pages-scraper.ts) | white pages |
| [yellow-pages-scraper.ts](directories/yellow-pages-scraper.ts) | yellow pages |
| [zoominfo-scraper.ts](directories/zoominfo-scraper.ts) | zoominfo |

</details>

<details>
<summary><strong>Photography & Design</strong> (20 scripts)</summary>

| Script | Target |
|--------|--------|
| [500px-scraper.ts](photography-design/500px-scraper.ts) | 500px |
| [adobe-stock-scraper.ts](photography-design/adobe-stock-scraper.ts) | adobe stock |
| [artstation-scraper.ts](photography-design/artstation-scraper.ts) | artstation |
| [behance-scraper.ts](photography-design/behance-scraper.ts) | behance |
| [canva-templates-scraper.ts](photography-design/canva-templates-scraper.ts) | canva templates |
| [creative-market-scraper.ts](photography-design/creative-market-scraper.ts) | creative market |
| [deviantart-scraper.ts](photography-design/deviantart-scraper.ts) | deviantart |
| [dribbble-scraper.ts](photography-design/dribbble-scraper.ts) | dribbble |
| [envato-elements-scraper.ts](photography-design/envato-elements-scraper.ts) | envato elements |
| [figma-community-scraper.ts](photography-design/figma-community-scraper.ts) | figma community |
| [flickr-scraper.ts](photography-design/flickr-scraper.ts) | flickr |
| [getty-images-scraper.ts](photography-design/getty-images-scraper.ts) | getty images |
| [graphicriver-scraper.ts](photography-design/graphicriver-scraper.ts) | graphicriver |
| [pexels-scraper.ts](photography-design/pexels-scraper.ts) | pexels |
| [pixabay-scraper.ts](photography-design/pixabay-scraper.ts) | pixabay |
| [reshot-scraper.ts](photography-design/reshot-scraper.ts) | reshot |
| [shutterstock-scraper.ts](photography-design/shutterstock-scraper.ts) | shutterstock |
| [smugmug-scraper.ts](photography-design/smugmug-scraper.ts) | smugmug |
| [stocksnap-scraper.ts](photography-design/stocksnap-scraper.ts) | stocksnap |
| [unsplash-scraper.ts](photography-design/unsplash-scraper.ts) | unsplash |

</details>

<details>
<summary><strong>Music & Podcasts</strong> (20 scripts)</summary>

| Script | Target |
|--------|--------|
| [allmusic-scraper.ts](music-podcasts/allmusic-scraper.ts) | allmusic |
| [apple-music-scraper.ts](music-podcasts/apple-music-scraper.ts) | apple music |
| [apple-podcasts-scraper.ts](music-podcasts/apple-podcasts-scraper.ts) | apple podcasts |
| [audiomack-scraper.ts](music-podcasts/audiomack-scraper.ts) | audiomack |
| [bandcamp-scraper.ts](music-podcasts/bandcamp-scraper.ts) | bandcamp |
| [chartable-scraper.ts](music-podcasts/chartable-scraper.ts) | chartable |
| [deezer-scraper.ts](music-podcasts/deezer-scraper.ts) | deezer |
| [discogs-scraper.ts](music-podcasts/discogs-scraper.ts) | discogs |
| [genius-scraper.ts](music-podcasts/genius-scraper.ts) | genius |
| [lastfm-scraper.ts](music-podcasts/lastfm-scraper.ts) | lastfm |
| [listen-notes-scraper.ts](music-podcasts/listen-notes-scraper.ts) | listen notes |
| [musicbrainz-scraper.ts](music-podcasts/musicbrainz-scraper.ts) | musicbrainz |
| [pocket-casts-scraper.ts](music-podcasts/pocket-casts-scraper.ts) | pocket casts |
| [podcast-index-scraper.ts](music-podcasts/podcast-index-scraper.ts) | podcast index |
| [podchaser-scraper.ts](music-podcasts/podchaser-scraper.ts) | podchaser |
| [setlistfm-scraper.ts](music-podcasts/setlistfm-scraper.ts) | setlistfm |
| [soundcloud-music-scraper.ts](music-podcasts/soundcloud-music-scraper.ts) | soundcloud music |
| [spotify-music-scraper.ts](music-podcasts/spotify-music-scraper.ts) | spotify music |
| [tidal-scraper.ts](music-podcasts/tidal-scraper.ts) | tidal |
| [youtube-music-scraper.ts](music-podcasts/youtube-music-scraper.ts) | youtube music |

</details>

<details>
<summary><strong>Events & Tickets</strong> (20 scripts)</summary>

| Script | Target |
|--------|--------|
| [10times-scraper.ts](events-tickets/10times-scraper.ts) | 10times |
| [allevents-scraper.ts](events-tickets/allevents-scraper.ts) | allevents |
| [axs-scraper.ts](events-tickets/axs-scraper.ts) | axs |
| [bandsintown-scraper.ts](events-tickets/bandsintown-scraper.ts) | bandsintown |
| [bizzabo-scraper.ts](events-tickets/bizzabo-scraper.ts) | bizzabo |
| [cvent-scraper.ts](events-tickets/cvent-scraper.ts) | cvent |
| [dice-events-scraper.ts](events-tickets/dice-events-scraper.ts) | dice events |
| [eventbrite-scraper.ts](events-tickets/eventbrite-scraper.ts) | eventbrite |
| [fever-scraper.ts](events-tickets/fever-scraper.ts) | fever |
| [hopin-scraper.ts](events-tickets/hopin-scraper.ts) | hopin |
| [live-nation-scraper.ts](events-tickets/live-nation-scraper.ts) | live nation |
| [luma-scraper.ts](events-tickets/luma-scraper.ts) | luma |
| [meetup-scraper.ts](events-tickets/meetup-scraper.ts) | meetup |
| [seatgeek-scraper.ts](events-tickets/seatgeek-scraper.ts) | seatgeek |
| [songkick-scraper.ts](events-tickets/songkick-scraper.ts) | songkick |
| [splash-scraper.ts](events-tickets/splash-scraper.ts) | splash |
| [stubhub-scraper.ts](events-tickets/stubhub-scraper.ts) | stubhub |
| [ticketmaster-scraper.ts](events-tickets/ticketmaster-scraper.ts) | ticketmaster |
| [vivid-seats-scraper.ts](events-tickets/vivid-seats-scraper.ts) | vivid seats |
| [whova-scraper.ts](events-tickets/whova-scraper.ts) | whova |

</details>

<details>
<summary><strong>Search</strong> (17 scripts)</summary>

| Script | Target |
|--------|--------|
| [baidu-scraper.ts](search/baidu-scraper.ts) | baidu |
| [bing-scraper.ts](search/bing-scraper.ts) | bing |
| [brave-search-scraper.ts](search/brave-search-scraper.ts) | brave search |
| [duckduckgo-scraper.ts](search/duckduckgo-scraper.ts) | duckduckgo |
| [ecosia-scraper.ts](search/ecosia-scraper.ts) | ecosia |
| [google-api.ts](search/google-api.ts) | google api |
| [google-images-scraper.ts](search/google-images-scraper.ts) | google images |
| [google-maps-scraper.ts](search/google-maps-scraper.ts) | google maps |
| [google-play-scraper.ts](search/google-play-scraper.ts) | google play |
| [google-scholar-scraper.ts](search/google-scholar-scraper.ts) | google scholar |
| [google-scholar-search-scraper.ts](search/google-scholar-search-scraper.ts) | google scholar search |
| [google-search-scraper.ts](search/google-search-scraper.ts) | google search |
| [google-shopping-scraper.ts](search/google-shopping-scraper.ts) | google shopping |
| [google-trends-scraper.ts](search/google-trends-scraper.ts) | google trends |
| [perplexity-scraper.ts](search/perplexity-scraper.ts) | perplexity |
| [yahoo-search-scraper.ts](search/yahoo-search-scraper.ts) | yahoo search |
| [yandex-scraper.ts](search/yandex-scraper.ts) | yandex |

</details>

<details>
<summary><strong>Home Services</strong> (15 scripts)</summary>

| Script | Target |
|--------|--------|
| [angi-scraper.ts](home-services/angi-scraper.ts) | angi |
| [bark-scraper.ts](home-services/bark-scraper.ts) | bark |
| [buildzoom-scraper.ts](home-services/buildzoom-scraper.ts) | buildzoom |
| [craftjack-scraper.ts](home-services/craftjack-scraper.ts) | craftjack |
| [fixr-scraper.ts](home-services/fixr-scraper.ts) | fixr |
| [handy-scraper.ts](home-services/handy-scraper.ts) | handy |
| [homeadvisor-scraper.ts](home-services/homeadvisor-scraper.ts) | homeadvisor |
| [homeguide-scraper.ts](home-services/homeguide-scraper.ts) | homeguide |
| [homeserve-scraper.ts](home-services/homeserve-scraper.ts) | homeserve |
| [houzz-scraper.ts](home-services/houzz-scraper.ts) | houzz |
| [mr-handyman-scraper.ts](home-services/mr-handyman-scraper.ts) | mr handyman |
| [networx-scraper.ts](home-services/networx-scraper.ts) | networx |
| [porch-scraper.ts](home-services/porch-scraper.ts) | porch |
| [taskrabbit-scraper.ts](home-services/taskrabbit-scraper.ts) | taskrabbit |
| [thumbtack-scraper.ts](home-services/thumbtack-scraper.ts) | thumbtack |

</details>

<details>
<summary><strong>Logistics & Shipping</strong> (15 scripts)</summary>

| Script | Target |
|--------|--------|
| [17track-scraper.ts](logistics-shipping/17track-scraper.ts) | 17track |
| [aftership-scraper.ts](logistics-shipping/aftership-scraper.ts) | aftership |
| [dhl-scraper.ts](logistics-shipping/dhl-scraper.ts) | dhl |
| [easypost-scraper.ts](logistics-shipping/easypost-scraper.ts) | easypost |
| [fedex-scraper.ts](logistics-shipping/fedex-scraper.ts) | fedex |
| [flightaware-scraper.ts](logistics-shipping/flightaware-scraper.ts) | flightaware |
| [flightradar24-scraper.ts](logistics-shipping/flightradar24-scraper.ts) | flightradar24 |
| [freightwaves-scraper.ts](logistics-shipping/freightwaves-scraper.ts) | freightwaves |
| [maersk-scraper.ts](logistics-shipping/maersk-scraper.ts) | maersk |
| [marinetraffic-scraper.ts](logistics-shipping/marinetraffic-scraper.ts) | marinetraffic |
| [shipbob-scraper.ts](logistics-shipping/shipbob-scraper.ts) | shipbob |
| [shippo-scraper.ts](logistics-shipping/shippo-scraper.ts) | shippo |
| [shipstation-scraper.ts](logistics-shipping/shipstation-scraper.ts) | shipstation |
| [ups-scraper.ts](logistics-shipping/ups-scraper.ts) | ups |
| [usps-scraper.ts](logistics-shipping/usps-scraper.ts) | usps |

</details>

<details>
<summary><strong>Weather & Environment</strong> (15 scripts)</summary>

| Script | Target |
|--------|--------|
| [accuweather-scraper.ts](weather-environment/accuweather-scraper.ts) | accuweather |
| [airnow-scraper.ts](weather-environment/airnow-scraper.ts) | airnow |
| [climate-gov-scraper.ts](weather-environment/climate-gov-scraper.ts) | climate gov |
| [dark-sky-scraper.ts](weather-environment/dark-sky-scraper.ts) | dark sky |
| [iqair-scraper.ts](weather-environment/iqair-scraper.ts) | iqair |
| [noaa-scraper.ts](weather-environment/noaa-scraper.ts) | noaa |
| [nws-scraper.ts](weather-environment/nws-scraper.ts) | nws |
| [openweathermap-scraper.ts](weather-environment/openweathermap-scraper.ts) | openweathermap |
| [tomorrow-io-scraper.ts](weather-environment/tomorrow-io-scraper.ts) | tomorrow io |
| [ventusky-scraper.ts](weather-environment/ventusky-scraper.ts) | ventusky |
| [weather-com-scraper.ts](weather-environment/weather-com-scraper.ts) | weather com |
| [weather-underground-scraper.ts](weather-environment/weather-underground-scraper.ts) | weather underground |
| [weatherbug-scraper.ts](weather-environment/weatherbug-scraper.ts) | weatherbug |
| [weatherspark-scraper.ts](weather-environment/weatherspark-scraper.ts) | weatherspark |
| [windy-scraper.ts](weather-environment/windy-scraper.ts) | windy |

</details>

<details>
<summary><strong>Telecom</strong> (12 scripts)</summary>

| Script | Target |
|--------|--------|
| [att-scraper.ts](telecom/att-scraper.ts) | att |
| [centurylink-scraper.ts](telecom/centurylink-scraper.ts) | centurylink |
| [cox-scraper.ts](telecom/cox-scraper.ts) | cox |
| [cricket-wireless-scraper.ts](telecom/cricket-wireless-scraper.ts) | cricket wireless |
| [google-fi-scraper.ts](telecom/google-fi-scraper.ts) | google fi |
| [mint-mobile-scraper.ts](telecom/mint-mobile-scraper.ts) | mint mobile |
| [spectrum-scraper.ts](telecom/spectrum-scraper.ts) | spectrum |
| [t-mobile-scraper.ts](telecom/t-mobile-scraper.ts) | t mobile |
| [us-mobile-scraper.ts](telecom/us-mobile-scraper.ts) | us mobile |
| [verizon-scraper.ts](telecom/verizon-scraper.ts) | verizon |
| [visible-scraper.ts](telecom/visible-scraper.ts) | visible |
| [xfinity-scraper.ts](telecom/xfinity-scraper.ts) | xfinity |

</details>

<details>
<summary><strong>Media</strong> (8 scripts)</summary>

| Script | Target |
|--------|--------|
| [goodreads-scraper.ts](media/goodreads-scraper.ts) | goodreads |
| [imdb-scraper.ts](media/imdb-scraper.ts) | imdb |
| [rottentomatoes-scraper.ts](media/rottentomatoes-scraper.ts) | rottentomatoes |
| [soundcloud-scraper.ts](media/soundcloud-scraper.ts) | soundcloud |
| [spotify-scraper.ts](media/spotify-scraper.ts) | spotify |
| [tiktok-scraper.ts](media/tiktok-scraper.ts) | tiktok |
| [twitch-scraper.ts](media/twitch-scraper.ts) | twitch |
| [youtube-scraper.ts](media/youtube-scraper.ts) | youtube |

</details>

<details>
<summary><strong>Pets</strong> (8 scripts)</summary>

| Script | Target |
|--------|--------|
| [adopt-a-pet-scraper.ts](pets/adopt-a-pet-scraper.ts) | adopt a pet |
| [barkbox-scraper.ts](pets/barkbox-scraper.ts) | barkbox |
| [chewy-pets-scraper.ts](pets/chewy-pets-scraper.ts) | chewy pets |
| [petco-pets-scraper.ts](pets/petco-pets-scraper.ts) | petco pets |
| [petfinder-scraper.ts](pets/petfinder-scraper.ts) | petfinder |
| [petsmart-pets-scraper.ts](pets/petsmart-pets-scraper.ts) | petsmart pets |
| [rover-scraper.ts](pets/rover-scraper.ts) | rover |
| [wag-scraper.ts](pets/wag-scraper.ts) | wag |

</details>

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
- [spider.cloud](https://spider.cloud) — Browser fleet & web scraping API

## License

MIT
