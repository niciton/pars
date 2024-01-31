const fs = require("fs");
const axios = require("axios");
const limit = 44;

const auth = {
  locationId: "50",
  appPlatform: "WEB",
  appVersion: 1700222862,
  experiments: {
    "1": "2",
    "8": "2",
    "46": "2",
    "55": "2",
    "58": "2",
    "68": "2",
    "69": "1",
    "79": "3",
    "98": "1",
    "99": "1",
    "107": "2",
    "109": "2",
    "119": "1",
    "120": "1",
    "121": "2",
    "122": "1",
    "128": "1",
    "132": "2",
    "144": "3",
    "148": "3",
    "154": "1",
    "155": "1",
    "184": "3",
    "186": "2",
    "190": "1",
    "192": "2",
    "194": "3",
    "200": "3",
    "205": "2",
    "209": "1",
    "218": "1",
    "235": "2",
    "237": "2",
    "253": "2",
    "257": "1",
    "772": "1",
    "5779": "2",
    "20121": "1",
    "67972": "2",
    "69032": "3",
    "70070": "1",
    "72674": "3",
    "80283": "1",
    "81724": "2",
    "85160": "2",
    "86296": "2",
    "86356": "2",
    "90172": "3",
  },
  os: "UNKNOWN_OS",
};
const bodyRequest = {
  requestVersion: 10,
  limit,
  offset: 0,
  collectionId: "12101",
  selectedAssumedCollectionId: "12101",
  isMultiCategorySearch: false,
  searchByOriginalQuery: false,
  selectedSuggestParams: [],
  sorting: 0,
  ageMore18: 2,
  showNotAvailable: true,
  auth
};
const headersRequest = {
  accept: "application/json",
  pragma: "no-cache",
  "accept-language": "ru-RU,ru;q=0.9",
  "cache-control": "no-cache",
  "content-type": "application/json",
  "sec-ch-ua":
    '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Linux"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  "x-requested-with": "XMLHttpRequest",
};

axios.post(
  `https://megamarket.ru/api/mobile/v1/catalogService/catalog/search`,
  JSON.stringify(bodyRequest),
  {
    referrer: `https://megamarket.ru/catalog/videokarty/page-1/`,
    referrerPolicy: "strict-origin-when-cross-origin",
    origin: 'http://0.0.0.0:3000',
    accept: '*/*',
    headers: headersRequest,
  }).then((res) => {
    console.log(res.data);
    return res;
  })
  .then((res) => {
    // fs.writeFileSync("./test.txt", JSON.stringify(res))
    // console.log(res);
  });



// fetch("https://megamarket.ru/api/mobile/v1/catalogService/catalog/search", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//     "cache-control": "no-cache",
//     "content-type": "application/x-www-form-urlencoded",
//     "pragma": "no-cache",
//     "sec-ch-ua": "\"Google Chrome\";v=\"111\", \"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"111\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Linux\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "cross-site",
//     "Referer": "http://0.0.0.0:3000/",
//     "Referrer-Policy": "strict-origin-when-cross-origin"
//   },
//   "body": "{\"requestVersion\":10,\"limit\":44,\"offset\":0,\"collectionId\":\"12101\",\"selectedAssumedCollectionId\":\"12101\",\"isMultiCategorySearch\":false,\"searchByOriginalQuery\":false,\"selectedSuggestParams\":[],\"sorting\":0,\"ageMore18\":2,\"showNotAvailable\":true,\"auth\":{\"locationId\":\"50\",\"appPlatform\":\"WEB\",\"appVersion\":1700222862,\"experiments\":{\"1\":\"2\",\"8\":\"2\",\"46\":\"2\",\"55\":\"2\",\"58\":\"2\",\"68\":\"2\",\"69\":\"1\",\"79\":\"3\",\"98\":\"1\",\"99\":\"1\",\"107\":\"2\",\"109\":\"2\",\"119\":\"1\",\"120\":\"1\",\"121\":\"2\",\"122\":\"1\",\"128\":\"1\",\"132\":\"2\",\"144\":\"3\",\"148\":\"3\",\"154\":\"1\",\"155\":\"1\",\"184\":\"3\",\"186\":\"2\",\"190\":\"1\",\"192\":\"2\",\"194\":\"3\",\"200\":\"3\",\"205\":\"2\",\"209\":\"1\",\"218\":\"1\",\"235\":\"2\",\"237\":\"2\",\"253\":\"2\",\"257\":\"1\",\"772\":\"1\",\"5779\":\"2\",\"20121\":\"1\",\"67972\":\"2\",\"69032\":\"3\",\"70070\":\"1\",\"72674\":\"3\",\"80283\":\"1\",\"81724\":\"2\",\"85160\":\"2\",\"86296\":\"2\",\"86356\":\"2\",\"90172\":\"3\"},\"os\":\"UNKNOWN_OS\"}}",
//   "method": "POST"
// });
