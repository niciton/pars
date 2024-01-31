const http = require("http");

// const axios = require("axios");
// const fs = require("fs")

const puppeteer = require("puppeteer-extra");
// const puppeteer = require("puppeteer");
const blockResourcesPlugin = require('puppeteer-extra-plugin-block-resources')();
puppeteer.use(blockResourcesPlugin);

let browser, page;

(async () => {
  // browser = await puppeteer.launch({ headless: false, timeout: 0, });
  // const page = await browser.newPage();

  browser = await puppeteer.launch({ headless: false, timeout: 0, });

  // const getPage = async () => {
  //   if (page) page = await browser.newPage();
  //   return page;
  // }

  page = await browser.newPage();

  const getMainObj = async (url) => {
    // const browser = await puppeteer.launch({ headless: false, timeout: 0, });
    // page = await browser.newPage();
    
    // if (!browser) browser = await puppeteer.launch({ headless: false, timeout: 0, });
    // if (!page) page = await browser.newPage();

    // ускоряет получение данных
    page?.setJavaScriptEnabled(false);
    blockResourcesPlugin.blockedTypes.add('image');
    blockResourcesPlugin.blockedTypes.add('stylesheet');
    blockResourcesPlugin.blockedTypes.add('script');
    blockResourcesPlugin.blockedTypes.add("other");

    const fetchUrl = `${url}`;

    (await page).goto(fetchUrl, { waitUntil: 'domcontentloaded' });

    const bodyScript = await page.waitForSelector("body > script");

    const mainObj = await bodyScript.evaluate((el) => {
      const appObj = el.innerHTML
        // undefined нет в JSON формате
        .replace(/(undefined)|(window.__APP__=)/g, (val) => val === "undefined" ? "null" : "")
        .replace(/,"experimentValue":[\W\w]+?}}/, "}");
      return appObj ? JSON.parse(`[${appObj}]`) : [];
    });

    // browser.close();

    return mainObj;
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
      const { url } = JSON.parse(String(chunk));
      obj = JSON.stringify(await getMainObj(url));

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
