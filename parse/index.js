const puppeteer = require("puppeteer");

const fs = require("fs");

const GlobalPath = "test";

const getFilePath = (fileName = GlobalPath) => `../public/data/${fileName}.json`;

const defaultPath = getFilePath(GlobalPath);

const url = {
  vCarts: `https://megamarket.ru/catalog/videokarty`,
  kulery: "https://megamarket.ru/catalog/kulery-dlya-processora/",
  platy: "https://megamarket.ru/catalog/materinskie-platy",
  monitory: "https://megamarket.ru/catalog/monitory/",
  test: "https://megamarket.ru/catalog/monitory/",
};

const files = {
  txt: './test.txt',
  pJson: getFilePath("products"),
  monitory: getFilePath("monitory"),
  test: getFilePath("test"),
};

fs.writeFileSync(defaultPath, "[]")

function addToFile(products)
{
  const fileData = JSON.parse(fs.readFileSync(defaultPath));
  fileData.push(...products);
  fs.writeFileSync(defaultPath, JSON.stringify(fileData));
}

const getMainObj = async () =>
{
  const browser = await puppeteer.launch({ headless: false, });
  const page = await browser.newPage();

  // ускоряет получение данных
  page.setJavaScriptEnabled(false);

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

  for (let i = 0; i < 400; i++)
  {
    const fetchUrl = `${url[GlobalPath]}/page-${i + 1}/`;
    await page.goto(fetchUrl, { waitUntil: 'domcontentloaded' });

    const bodyScript = await page.waitForSelector("body > script:not([type],[src])");

    // evaluate====
    const mainObj = await bodyScript.evaluate((el) =>
    {
      const appObj = el.innerHTML
        .replace(/(undefined)|(window.__APP__=)/g, (val) => val === "undefined" ? "null" : "")
        .match(/"items".+"offset":/gm)[0];
      return appObj ? JSON.parse(`{${appObj}0}`) : { items: [] };
    });
    // ./evaluate====
    
    if (mainObj?.items?.length) addToFile(mainObj.items)
    else continue;
  }

  (await browser).close();
  return products;
};

(async () =>
{
  // const obj = JSON.stringify(await getMainObj());
  await getMainObj();

  // fs.writeFileSync(files.monitory, obj);
})();