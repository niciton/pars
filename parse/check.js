const puppeteer = require("puppeteer");
const fs = require("fs");

const cookie = `ssaid=95197250-9b17-11ee-9722-49c42276b5b7; 
tmr_lvid=ea79b5fd772e69432e7304af2daf9cac; 
tmr_lvidTS=1702623610800; 
top100_id=t1.6795753.132782646.1702623611445; 
_gpVisits={"isFirstVisitDomain":true,"idContainer":"10002472"}; 
rrpvid=718399250989722; 
flocktory-uuid=65fd1b68-a212-4fe2-ad4c-cf72c6672a6e-2; 
rcuid=63d11d737d34d6ccdd964c8c; 
adid=170262361456485; 
uxs_uid=996d6320-9b17-11ee-99e0-77ea55138dc8; 
adrcid=AplsQ6F-gsyxFKf-vaI940Q; 
isOldUser=true; 
adspire_uid=AS.194190720.1704797393; 
device_id=daa637d7-aedc-11ee-8af1-fa163e5517ba; 
adtech_uid=603f18bf-e35b-473f-b140-34e330ff8176%3Amegamarket.ru; 
_sa=SA1.2b94acbf-630d-46eb-8f16-212d1e1dbd6e.1704797414; 
_ym_d=1704797392; 
_ym_uid=1704797392399956358; 
ecom_token=b47c2a02-f099-404f-8cd5-8ed58eb5fe18; 
sbermegamarket_token=b47c2a02-f099-404f-8cd5-8ed58eb5fe18; 
spid=1704797386300_43abdead1a73be15c0ee31ba49fd9023_en72grd4hok1fddi; 
last_visit=1705548401151%3A%3A1705559201151; 
t3_sid_6795753=s1.1077718393.1705559201139.1705559391247.124.20; 
spsn=1708602070590_7b2276657273696f6e223a22332e342e32222c227369676e223a226337616662396531626536363436356531663832303663333833353863633432222c22706c6174666f726d223a224c696e7578207838365f3634222c2262726f7773657273223a5b226368726f6d65225d2c2273636f7265223a302e377d; 
spcaphp=dehic4feu9152q5l6fo6q376q3; 
_gcl_au=1.1.41082018.1710408528; 
sbermegamarket_token=b47c2a02-f099-404f-8cd5-8ed58eb5fe18; 
ecom_token=b47c2a02-f099-404f-8cd5-8ed58eb5fe18; 
viewType=grid; 
rrlevt=1711718273314; 
_ym_isad=2; 
_gid=GA1.2.613869444.1712897380; 
adrcid=AplsQ6F-gsyxFKf-vaI940Q; 
adrdel=1; 
analytic_id=1712897391751979; 
tmr_detect=0%7C1712900976696; 
_ga_VD1LWDPWYX=GS1.2.1712903181.91.0.1712903200.0.0.0; 
spsc=1712903683454_1ba84281e1e267c91f2b05220762add6_2dc4c47e5beb4aae25be080fa9d16c8093e7e989cef732b63b8bada59af3d7da; 
_ym_visorc=b; 
__tld__=null; 
_ga=GA1.1.1425897989.1702623610; 
cfidsw-smm=TTHAm2KUQHTP3E36/GpuuRgAmQCqPrrxLIJf/tT0Wk4LvYK3VTFVm9MqVyC8vRT2Z2uXHcKTkmz0AQXMIFOxB5ZtV6h82wsN3SQ7vW/CIZ9ndPYwIw5hmsmT8EIpo/WbDeVWTmW4bBdpw/8K2gVQUSQTfRT+M8bvjuj3x+Pv; 
cfidsw-smm=TTHAm2KUQHTP3E36/GpuuRgAmQCqPrrxLIJf/tT0Wk4LvYK3VTFVm9MqVyC8vRT2Z2uXHcKTkmz0AQXMIFOxB5ZtV6h82wsN3SQ7vW/CIZ9ndPYwIw5hmsmT8EIpo/WbDeVWTmW4bBdpw/8K2gVQUSQTfRT+M8bvjuj3x+Pv; 
__zzatw-smm=MDA0dC0cTHtmcDhhDHEWTT17CT4VHThHKHIzd2UbN1ddHBEkWA4hPwsXXFU+NVQOPHVXLw0uOF4tbx5mSFsoQ1hTCS0fFHlnFRtQSxgvS18+bX0yUCs5Lmw=VLmHHg==; 
region_info=%7B%22displayName%22%3A%22%D0%9C%D0%BE%D1%81%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C%22%2C%22kladrId%22%3A%225000000000000%22%2C%22isDeliveryEnabled%22%3Atrue%2C%22geo%22%3A%7B%22lat%22%3A55.755814%2C%22lon%22%3A37.617635%7D%2C%22id%22%3A%2250%22%7D; 
_ga_W49D2LL5S1=deleted`;

const cookieArr = cookie.replace(/(\n)|( )/g,).split(";").map((item) =>
{
  const [name, value] = item.split("=");

  return { name, value };
});

console.log(cookieArr);

const getMainObj = async () =>
{
  const browser = await puppeteer.launch({ headless: false, });
  const page = await browser.newPage();


  // ускоряет получение данных
  page.setJavaScriptEnabled(false);

  // await page.setRequestInterception(true);
  // page.on('request', (request) =>
  // {
  //   if (request.resourceType() === 'document')
  //   {
  //     request.continue();
  //   } else
  //   {
  //     request.abort();
  //   }
  // });

  {
    const fetchUrl = `https://megamarket.ru/`;
    // const fetchUrl = 'https://avtoalfa.com/cart/';
    await page.goto(fetchUrl, { waitUntil: 'domcontentloaded' });
    // await page.setCookie(...cookieArr);

    // const bodyScript = await page.waitForSelector("body > script:not([type],[src])");
    const bodyScript = await page.waitForSelector("body");

    // const mainObj = await bodyScript.evaluate((el) =>
    // {

    // });
    const body = await bodyScript.evaluate((el) => {
      document.cookie = cookie.replace(/\n/g, "");
      
    });

    await page.goto('https://megamarket.ru/catalog/details/gril-union-source-ugolnyy-44-sm-100065766747/', { waitUntil: 'domcontentloaded' });
  }
};

(async () =>
{
  getMainObj();
})();