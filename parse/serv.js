const http = require("http");
const puppeteer = require("puppeteer");

let browser, page;

(async () =>
{
  browser = await puppeteer.launch({
    headless: false,

    args: [
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-renderer-backgrounding",
    ],
  });
  page = await browser.newPage();

  const getMainObj = async (url) =>
  {
    // const browser = await puppeteer.launch({ headless: false, timeout: 0, });
    // const page = await browser.newPage();

    // ускоряет получение данных
    page?.setJavaScriptEnabled(false);
    page?.setRequestInterception(true);
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

    const fetchUrl = `${url}`;
    await page.goto(fetchUrl, { waitUntil: 'domcontentloaded' });

    const bodyScript = await page.waitForSelector("body > script:not([type],[src])");

    return await bodyScript.evaluate((el) =>
    {
      return JSON.parse(`{${el.innerHTML.replace(/(\n)|(undefined)/g, (val) => val === "\n" ? "" : "null").match(/"offersData":.+,"breadcrumbs"/gm)[0]}:[]}`);
    });
  };

  const PORT = 5757;

  http.createServer(async (req, res) =>
  {
    console.log("server request");

    res.setHeader("Content-Type", "application/json");

    if (req.method !== "POST") return res.end(JSON.stringify([{}]));

    let obj = JSON.stringify([{}]);

    req.on("data", async (chunk) =>
    {
      const { url } = JSON.parse(String(chunk));
      obj = JSON.stringify(await getMainObj(url));

      res.end(obj);
    });

  }).listen(PORT);
})();
