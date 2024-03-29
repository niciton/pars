
const puppeteer = require("puppeteer");
// const puppeteer = require("puppeteer-extra");
// const blockResourcesPlugin = require('puppeteer-extra-plugin-block-resources')();
// puppeteer.use(blockResourcesPlugin);

const fs = require("fs");

const url = {
  market: "https://megamarket.ru/catalog/videokarty/#?filters=%7B%2288C83F68482F447C9F4E401955196697%22%3A%7B%22min%22%3A32302%2C%22max%22%3A85000%7D%7D",
  vCarts: `https://megamarket.ru/catalog/videokarty`,
  kulery: "https://megamarket.ru/catalog/kulery-dlya-processora/",
  platy: "https://megamarket.ru/catalog/materinskie-platy"
};
var products = [];

const getMainObj = async () =>
{
  const browser = await puppeteer.launch({ headless: false, });
  const page = await browser.newPage();

  // ускоряет получение данных
  page.setJavaScriptEnabled(false);
  // blockResourcesPlugin.blockedTypes.add('image');
  // blockResourcesPlugin.blockedTypes.add('stylesheet');
  // blockResourcesPlugin.blockedTypes.add('script');
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

  for (let i = 0; i < 77; i++)
  {
    const fetchUrl = `${url.platy}/page-${i + 1}/`;
    await page.goto(fetchUrl, { waitUntil: 'domcontentloaded' });

    const bodyScript = await page.waitForSelector("body > script:not([type],[src])");

    const mainObj = await bodyScript.evaluate((el) =>
    {
      const appObj = el.innerHTML
        .replace(/(undefined)|(window.__APP__=)/g, (val) => val === "undefined" ? "null" : "")
        // .replace(/,"experimentValue":[\W\w]+?}}/, "}");
        .match(/"items".+"offset":/gm)[0];
      return appObj ? JSON.parse(`{${appObj}0}`) : {items: []};
    });
    console.log(products.length);
    if (mainObj?.items?.length) products.push(...(mainObj.items));
    else continue;
  }

  (await browser).close();
  return products;
};

(async () =>
{
  const files = {
    txt: './test.txt',
    pJson: '../public/data/products.json',
  };

  const obj = JSON.stringify(await getMainObj());
  // const obj = await getMainObj();

  fs.writeFileSync(files.pJson, obj);
})();