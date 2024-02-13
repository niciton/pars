const http = require("http");


// const puppeteer = require("puppeteer");
const puppeteer = require("puppeteer-extra");
const blockResourcesPlugin = require('puppeteer-extra-plugin-block-resources')();
puppeteer.use(blockResourcesPlugin);

let browser, page;

(async () => {
  // browser = await puppeteer.launch({ headless: false, timeout: 0, });
  // const page = await browser.newPage();

  browser = await puppeteer.launch({ 
    headless: false, 

    args: [
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-renderer-backgrounding",
    ],
  });
  page = await browser.newPage();

  const getMainObj = async (url) => {
    // const browser = await puppeteer.launch({ headless: false, timeout: 0, });
    // const page = await browser.newPage();

    // ускоряет получение данных
    page?.setJavaScriptEnabled(false);
    blockResourcesPlugin.blockedTypes.add('image');
    blockResourcesPlugin.blockedTypes.add('stylesheet');
    blockResourcesPlugin.blockedTypes.add('script');
    blockResourcesPlugin.blockedTypes.add("other");

    const fetchUrl = `${url}`;
    await page.goto(fetchUrl, { waitUntil: 'domcontentloaded' });

    const bodyScript = await page.waitForSelector("body > script:not([type],[src])");

    return await bodyScript.evaluate((el) => {
      return JSON.parse(`{${el.innerHTML.replace(/(\n)|(undefined)/g, (val) => val === "\n" ? "" : "null" ).match(/"offersData":.+,"breadcrumbs"/gm)[0]}:[]}`)
    });
  };

  const PORT = 5757;

  http.createServer(async (req, res) => {
    console.log("hi serv");

    // const url = `https://megamarket.ru/catalog/details/videokarta-palit-nvidia-ne64060019p1-1070d-ne64060019p1-1070d-600012755607_54448/#?details_block=prices`;

    res.setHeader("Content-Type", "application/json");

    if (req.method !== "POST") return res.end(JSON.stringify([{}]));
    console.log("aaaaa");

    let obj = JSON.stringify([{}]);

    req.on("data", async (chunk) => {
      console.log("obj_1", obj);
      const { url } = JSON.parse(String(chunk));
      obj = JSON.stringify(await getMainObj(url));
      // console.log("obj", obj);

      res.end(obj);
    });

    // req.on("end", () => {
    //   res.end(obj);
    // })

    // res.write(JSON.stringify(obj))

    // 
  }).listen(PORT);
})();

//   console.log(A.page);


// server.listen(PORT, "0.0.0.0", (err) => {
//   if (err) console.log(err);
//   else console.log(`aaaaaaaa listing ${PORT}`);
// });

// server


// axios.get(`https://megamarket.ru/catalog/details/videokarta-palit-nvidia-ne64060019p1-1070d-ne64060019p1-1070d-600012755607_54448/#?details_block=prices`).then(({ data }) => {
//   const html = cheerio.load(data);
//   const script = html("html").prop("outerHTML");
//   // console.log(script);
//   fs.writeFileSync("./html.html", script)
// });
