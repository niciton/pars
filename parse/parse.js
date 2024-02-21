
// const puppeteer = require("puppeteer");
const puppeteer = require("puppeteer-extra");
const blockResourcesPlugin = require('puppeteer-extra-plugin-block-resources')();
puppeteer.use(blockResourcesPlugin);

const fs = require("fs");

const url = {
  market: "https://megamarket.ru/catalog/videokarty/#?filters=%7B%2288C83F68482F447C9F4E401955196697%22%3A%7B%22min%22%3A32302%2C%22max%22%3A85000%7D%7D",
  vCarts: `https://megamarket.ru/catalog/videokarty`,
};
var products = [];

(async () =>
{
  const browser = await puppeteer.launch({ 
    headless: false, 
    args: [
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-renderer-backgrounding",
    ],
  });
  const page = await browser.newPage();
  const productPage = await browser.newPage();

  // ускоряет получение данных
  page.setJavaScriptEnabled(false);
  productPage.setJavaScriptEnabled(false);
  blockResourcesPlugin.blockedTypes.add('image');
  blockResourcesPlugin.blockedTypes.add('stylesheet');
  blockResourcesPlugin.blockedTypes.add('script');
  blockResourcesPlugin.blockedTypes.add("other");

  async function setProduct(productsList) {
    console.log(productsList);
    for (let index = 0; index < productsList.length; index++)
    {
      const product = productsList[index];

      await productPage.goto(product, { waitUntil: 'domcontentloaded' });

      await productPage.waitForSelector("body > script:not([type],[src])");

      await productPage.evaluate((productEl) =>
      {
        products.push(JSON.parse(`{${productEl.innerHTML.replace(/(\n)|(undefined)/g, (val) => val === "\n" ? "" : "null").match(/"offersData":.+,"breadcrumbs"/gm)[0]}:[]}`));
      });

      // JSON.parse(`{${el.innerHTML.replace(/(\n)|(undefined)/g, (val) => val === "\n" ? "" : "null").match(/"offersData":.+,"breadcrumbs"/gm)[0]}:[]}`);
    }
  }

  for (let i = 0; i < 2; i++)
  {
    const fetchUrl = `${url.vCarts}/page-${i + 1}/`;
    await page.goto(fetchUrl, { waitUntil: 'domcontentloaded' });

    const bodyScript = await page.waitForSelector("body > script:not([type],[src])");
    console.log(setProduct);
    const mainObj = await bodyScript.evaluate(async function(el)
    {
      const appObj = el.innerHTML
        .replace(/(undefined)|(window.__APP__=)/g, (val) => val === "undefined" ? "null" : "")
        .replace(/,"experimentValue":[\W\w]+?}}/, "}");

      await setProduct((appObj ? JSON.parse(`[${appObj}]`) : [])[0]?.hydratorState?.PlpStore?.listingData?.items || []);
    });

    if (!(mainObj[0]?.hydratorState?.PlpStore?.listingData?.items?.length)) continue;
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

