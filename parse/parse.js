
const puppeteer = require("puppeteer");

// const { addExtra } = require('puppeteer-extra');
// const puppeteer = addExtra(require('puppeteer'));
// const blockResourcesPlugin = require('puppeteer-extra-plugin-block-resources')();
// puppeteer.use(blockResourcesPlugin);

const fs = require("fs");

const url = {
  market: "https://megamarket.ru/catalog/videokarty/#?filters=%7B%2288C83F68482F447C9F4E401955196697%22%3A%7B%22min%22%3A32302%2C%22max%22%3A85000%7D%7D",
  vCarts: `https://megamarket.ru/catalog/videokarty`,
};
var products = [];
var ips = [
  "5.161.179.239:3128",
  "51.222.10.230:25036",
  "159.65.221.25:80",
  "162.243.95.8:80",
  "162.120.71.11:80",
  "5.161.110.255:3128",
  "34.23.45.223:80",
  "68.183.132.69:7497",
  "209.126.84.8:3128",
  "5.161.179.239:3128",
  "142.93.66.245:20667",
  "23.19.244.109:1080",
  "68.183.143.134:80",
  "209.145.51.125:3128",
  "198.12.85.211:80",
  "5.161.75.238:3128",
  "174.138.114.226:80",
  "198.168.189.54:80",
  "198.49.68.80:80",
  "69.70.244.34:80",
  "35.188.144.109:80",
  "137.184.100.135:80",
  "35.230.115.171:8080",
  "75.89.101.63:80",
  "35.185.196.38:3128",
  "18.144.4.208:8888",
  "162.223.116.54:80",
  "159.65.245.255:80",
  "8.34.208.46:80",
  "178.79.168.188:3128",
  "167.172.232.234:3180"
];

(async () =>
{
  const browser = await puppeteer.launch({
    headless: false,
    // args: [
    //   "--disable-background-timer-throttling",
    //   "--disable-backgrounding-occluded-windows",
    //   "--disable-renderer-backgrounding",
    //   '--override-plugin-power-saver-for-testing=never',
    //   '--disable-extensions-http-throttling',
    //   // '--proxy-server=192.168.0:176',
    //   '--no-sandbox',
    //   '--disable-setuid-sandbox',
    //   "--start-maximized",
    //   "--single-process",
    //   "--no-sandbox",
    //   "--disable-setuid-sandbox",
    //   "--disable-dev-shm-usage",
    //   "--disable-extensions",
    //   "--no-zygote",
    //   "--shm-size=5gb",
    //   "--hide-scrollbars",
    //   "--mute-audio",
    //   "--disable-timeouts-for-profiling",
    //   "--disable-dinosaur-easter-egg",
    //   "--disable-web-security",
    //   "--disable-ipc-flooding-protection",
    //   "--disable-background-networking",
    //   "--disable-renderer-backgrounding",
    //   "--disable-backing-store-limit",
    //   "--disable-component-update",
    //   "--intensive-wake-up-throttling-policy=0",
    //   "--disable-domain-reliability",
    //   "--disable-popup-blocking",
    //   "--disable-sync",
    //   "--disable-breakpad",
    //   "--no-pings",
    //   "--font-render-hinting=none",
    //   "--no-default-browser-check",
    //   "--enable-crash-reporter",
    //   "--block-new-web-contents",
    //   "--noerrdialogs",
    //   "--enable-leak-detection",
    //   "--use-angle=gl-egl",
    //   "--enable-unsafe-webgpu",
    //   "--ignore-gpu-blocklist",
    //   "--gpu-no-context-lost",
    //   "--enable-gpu-compositing",
    //   "--enable-gpu-rasterization",
    //   "--disable-gpu-driver-bug-workarounds",
    //   "--enable-native-gpu-memory-buffers",
    //   "--enable-accelerated-2d-canvas",
    //   "--enable-accelerated-jpeg-decoding",
    //   "--enable-accelerated-mjpeg-decode",
    //   "--enable-accelerated-video-decode",
    //   "--enable-zero-copy",
    //   "--enable-oop-rasterization",
    //   "--enable-gpu-memory-buffer-video-frames",
    //   "--enable-features=VaapiVideoDecoder,RawDraw,CanvasOopRasterization,PlatformHEVCDecoderSupport"
    // ],
    // product: "firefox",
    args: [
      // `--proxy-server=${ips[0]}`
      "--proxy-server=212.112.120.252:45555"
    ],
    timeout: 9999999
  });
  const page = await browser.newPage();
  // const productPage = await browser.newPage();

  // ускоряет получение данных
  page.setJavaScriptEnabled(false);
  // productPage.setJavaScriptEnabled(false);
  // blockResourcesPlugin.blockedTypes.add('script');
  // blockResourcesPlugin.blockedTypes.add('image');
  // blockResourcesPlugin.blockedTypes.add('stylesheet');
  // blockResourcesPlugin.blockedTypes.add("other");

  await page.setRequestInterception(true);
  page.on('request', (request) =>
  {
    if (request.resourceType() === 'document')
    {
      request.continue();
    } else
    {
      request.abort();
    }
  });

  const timeout = async (time = 0) =>
  {
    const prm = new Promise((resolve, reject) => setTimeout(() => { resolve("123"); }, time));
    return await prm;
  };

  async function setProduct(productsList)
  {
    for (let index = 0; index < productsList.length; index++)
    {
      const product = productsList[index];

      console.log((index || 1) % 10 === 0, index, product.goods.webUrl);

      // await timeout((index || 1) % 10 === 0 ? 21000 : Math.random() * 100);

      await page.goto(`${product.goods.webUrl}`, { waitUntil: 'domcontentloaded' });

      const productScript = await page.waitForSelector("body > script:not([type],[src])");
      // console.log(index);
      const defaultJson = { offersData: {}, mainInfo: {}, breadcrumbs: [] };
      let productsJson = defaultJson;

      try
      {
        productsJson = await productScript.evaluate((productEl) =>
        {
          try
          {
            return JSON.parse(`{${(productEl.innerHTML || JSON.stringify(defaultJson))
              .replace(/(\n)|(undefined)/g, (val) => val === "\n" ? "" : "null")
              .match(/"offersData":.+,"breadcrumbs"/g)[0]}:[]}`);
          } catch (err)
          {
            return defaultJson;
          }
        });
      } catch (e)
      {
        console.log(e);
      }

      products.push(productsJson);
    }
  }

  for (let i = 0; i < 40; i++)
  {
    const fetchUrl = "https://avtoalfa.com/proizvoditeli/" || `${url.vCarts}/${i > 0 ? `page-${i + 1}/` : ""}`;
    await page.goto(fetchUrl, { waitUntil: 'domcontentloaded' });

    const bodyScript = await page.waitForSelector("body > script:not([type],[src])");

    const mainObj = await bodyScript.evaluate((el) =>
    {
      return el.innerHTML
        .replace(/(undefined)|(window.__APP__=)/g, (val) => val === "undefined" ? "null" : "")
        .replace(/,"experimentValue":[\W\w]+?}}/, "}");
    });

    await setProduct((mainObj ? JSON.parse(`[${mainObj}]`) : [])[0]?.hydratorState?.PlpStore?.listingData?.items || []);

    if (!(mainObj?.[0]?.hydratorState?.PlpStore?.listingData?.items?.length)) continue;
  }

  (await browser).close();
  // return products;

  const files = {
    txt: './test/test.txt',
    testJson: './test/data.json',
    pJson: '../public/data/products.json',
  };

  const obj = JSON.stringify(products);

  fs.writeFileSync(files.testJson, obj);
})();

