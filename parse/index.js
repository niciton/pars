// import puppeteer, { Page, PageEmittedEvents } from "puppeteer";
// const axios = require("axios");
// const cheerio = require("cheerio");

const puppeteer = require("puppeteer-extra");
// const puppeteer = require("puppeteer");
const blockResourcesPlugin = require('puppeteer-extra-plugin-block-resources')();
puppeteer.use(blockResourcesPlugin);

const fs = require("fs");

const url = {
  // 'https://megamarket.ru/catalog/videokarty/#?filters={"88C83F68482F447C9F4E401955196697":{"min":32302,"max":85000}}'
  market: "https://megamarket.ru/catalog/videokarty/#?filters=%7B%2288C83F68482F447C9F4E401955196697%22%3A%7B%22min%22%3A32302%2C%22max%22%3A85000%7D%7D",
  vCarts: `https://megamarket.ru/catalog/videokarty`,
  avito: "https://avito.ru",
  alfa: "https://avtoalfa.com",
};
var products = [];

// setInterval(() => alert("Are you gay?"), 1000);

// fetch("https://megamarket.ru/api/mobile/v1/catalogService/catalog/search", {
//   headers: {
//     accept: "application/json",
//     "accept-language": "ru-RU,ru;q=0.9",
//     "cache-control": "no-cache",
//     "content-type": "application/json",
//     pragma: "no-cache",
//     "sec-ch-ua":
//       '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": '"Linux"',
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest",
//   },
//   referrer:
//     "https://megamarket.ru/catalog/videokarty/page-2/?filters=%7B%2288C83F68482F447C9F4E401955196697%22%3A%7B%22min%22%3A32302,%22max%22%3A85000%7D%7D",
//   referrerPolicy: "strict-origin-when-cross-origin",
//   // body: '{"requestVersion":10,"limit":44,"offset":44,"collectionId":"12101","selectedAssumedCollectionId":"12101","isMultiCategorySearch":false,"searchByOriginalQuery":false,"selectedSuggestParams":[],"sorting":0,"ageMore18":2,"showNotAvailable":true,"auth":{"locationId":"50","appPlatform":"WEB","appVersion":1700222862,"experiments":{"1":"2","8":"2","46":"2","55":"2","58":"2","68":"2","69":"1","79":"3","98":"1","99":"1","107":"2","109":"2","119":"1","120":"1","121":"2","122":"1","128":"1","132":"2","144":"3","148":"3","154":"1","155":"1","184":"3","186":"2","190":"1","192":"2","194":"3","200":"3","205":"2","209":"1","218":"1","235":"2","237":"2","253":"2","257":"1","772":"1","5779":"2","20121":"1","67972":"2","69032":"3","70070":"1","72674":"3","80283":"1","81724":"2","85160":"2","86296":"2","86356":"2","90172":"3"},"os":"UNKNOWN_OS"}}',
//   method: "POST",
//   mode: "cors",
//   credentials: "include",
// })
//   .then((res) => {
//     return res;
//   }).then(res => {
//     fs.writeFileSync("./test.txt", JSON.stringify(res));
//   });

// fetch("https://megamarket.ru/api/mobile/v1/catalogService/catalog/search", {
//   headers: {
//     accept: "application/json",
//     "accept-language": "ru-RU,ru;q=0.9",
//     "cache-control": "no-cache",
//     "content-type": "application/json",
//     pragma: "no-cache",
//     "sec-ch-ua":
//       '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": '"Linux"',
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest",
//   },
//   referrer:
//     "https://megamarket.ru/catalog/videokarty/page-2/?filters=%7B%2288C83F68482F447C9F4E401955196697%22%3A%7B%22min%22%3A32302,%22max%22%3A85000%7D%7D",
//   referrerPolicy: "strict-origin-when-cross-origin",
//   // body: '{"requestVersion":10,"limit":44,"offset":44,"collectionId":"12101","selectedAssumedCollectionId":"12101","isMultiCategorySearch":false,"searchByOriginalQuery":false,"selectedSuggestParams":[],"sorting":0,"ageMore18":2,"showNotAvailable":true,"auth":{"locationId":"50","appPlatform":"WEB","appVersion":1700222862,"experiments":{"1":"2","8":"2","46":"2","55":"2","58":"2","68":"2","69":"1","79":"3","98":"1","99":"1","107":"2","109":"2","119":"1","120":"1","121":"2","122":"1","128":"1","132":"2","144":"3","148":"3","154":"1","155":"1","184":"3","186":"2","190":"1","192":"2","194":"3","200":"3","205":"2","209":"1","218":"1","235":"2","237":"2","253":"2","257":"1","772":"1","5779":"2","20121":"1","67972":"2","69032":"3","70070":"1","72674":"3","80283":"1","81724":"2","85160":"2","86296":"2","86356":"2","90172":"3"},"os":"UNKNOWN_OS"}}',
//   method: "POST",
//   mode: "cors",
//   credentials: "include",
//   }).then((res) => {
//     return res;
//   }).then(res => {
//     // fs.writeFileSync("./test.txt", JSON.stringify(res));
//   });

// const htmlOnly = async (page) => {
//   await page.setRequestInterception(true); // enable request interception

//   page.on(PageEmittedEvents.Request, (req) => {
//     if (!["document", "xhr", "fetch", "script"].includes(req.resourceType())) {
//       return req.abort();
//     }
//     req.continue();
//   });
// };

const getMainObj = async () => {
  const browser = await puppeteer.launch({ headless: false, timeout: 0, });
  const page = await browser.newPage();
  
  // ускоряет получение данных
  page.setJavaScriptEnabled(false);
  blockResourcesPlugin.blockedTypes.add('image');
  blockResourcesPlugin.blockedTypes.add('stylesheet');
  blockResourcesPlugin.blockedTypes.add('script');
  blockResourcesPlugin.blockedTypes.add("other");
  
  for (let i = 0; i < 40; i++) {
    // const mainObj = JSON.parse((await getMainObj(`${url.vCarts}/page-${i + 1}/`)))[0];
    const fetchUrl = `${url.vCarts}/page-${i + 1}/`
    await page.goto(fetchUrl, { waitUntil: 'domcontentloaded' });

    const bodyScript = await page.waitForSelector("body > script:not([type],[src])");
    
    const mainObj = await bodyScript.evaluate((el) => {
      const appObj = el.innerHTML
        .replace(/(undefined)|(window.__APP__=)/g, (val) => val === "undefined" ? "null" : "")
        .replace(/,"experimentValue":[\W\w]+?}}/, "}");
      return appObj ? JSON.parse(`[${appObj}]`) : [];
    });

    if (mainObj[0]?.hydratorState?.PlpStore?.listingData?.items?.length) products.push(...(mainObj[0].hydratorState.PlpStore.listingData.items));
    else continue;
  }

  (await browser).close();
  return products; 
};

(async () => {
  const files = {
    txt: './test.txt',
    pJson: '../public/data/products.json',
  };

  const obj = JSON.stringify(await getMainObj());

  fs.writeFileSync(files.pJson, obj);
})();