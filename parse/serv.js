const http = require("http");


// const puppeteer = require("puppeteer");
const puppeteer = require("puppeteer-extra");
const blockResourcesPlugin = require('puppeteer-extra-plugin-block-resources')();
puppeteer.use(blockResourcesPlugin);

let browser, page;

(async () => {
  // browser = await puppeteer.launch({ headless: false, timeout: 0, });
  // const page = await browser.newPage();

  browser = await puppeteer.launch({ headless: false, timeout: 0, });
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
      const infoArr = el.innerHTML.match(/[\w\W.+]{0,200}/gi);
      return JSON.parse(`{${el.innerHTML.replace(/(\n)|(undefined)/g, (val) => val === "\n" ? "" : "null" ).match(/"offersData":.+,"breadcrumbs"/gm)[0]}:[]}`)
      let isWriteInfo = false;
      let result = "";

      for (let i = 0; i < infoArr.length; i++) {
        const info = infoArr[i].replace(/\n/g, "");
        const infoFind = `${info + (i === 0 ? "" : infoArr[i- 1])}`.replace(/\n/g, "");

        if (!isWriteInfo) isWriteInfo = /"offersData":/.test(infoFind);

        // if (/\n/.test(info)) console.log(info); 

        if (isWriteInfo) {
          if (!result) {
            result += info.match(/"offersData":.+/ig)?.[0] || "";
            if (!result) result += infoFind.match(/"offersData":.+/ig)?.[0] || "";
          } else {

            const infoNextFind = `${info + infoArr[i + 1]}`.replace(/\n/g, "");
            isWriteInfo = !/"breadcrumbs":/.test(infoNextFind);

            if (!isWriteInfo && result) {
              result += infoNextFind.split(/,"breadcrumbs"/)?.[0] || "";
              continue;
            } else {
              result += info.split(/,"breadcrumbs"/)?.[0] || "";
            }
          }

          // if (/"breadcrumbs":/.test(infoFind)) continue;
        } 
      }

      // undefined нет в JSON формате
      result = result.replace(/undefined/g, "null");
      // console.log(`${result}`);
      return JSON.parse(`{${result}}`);
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
