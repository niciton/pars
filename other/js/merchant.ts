import type { Instance } from 'tippy.js';
import type { TMerchant } from '@/types/request/merchant';
import { delegate } from "@/other/libs/tippy";

import "@/other/style/components/merchant.scss"

let merchantIds: { [k: string]: TMerchant } = {};

delegate("body", {
  theme: "app_default",
  trigger: "click",
  target: ".product__merchant[data-merchant-id]",
  content: `<img width="50" height="50" src="/img/gear.svg" alt />`,
  interactiveBorder: 20,
  zIndex: 40,
  maxWidth: 420,
  allowHTML: true,
  interactive: true,
  delay: [0, 0],

  onShow(instance) {
    setMerchant(instance);
  },
});

function getFullDate({ dateActivation }: TMerchant ) {
  const startYear = new Date(dateActivation).getFullYear();
  const startMonth = new Date(dateActivation).getMonth();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const yearNumber = currentYear - startYear;
  const monthNumber = Math.max(currentMonth, startMonth) - Math.min(currentMonth, startMonth);

  const yearText = `${yearNumber} ${getDateText(yearNumber, ["год", "года", "лет"])}`
  const monthText = `${monthNumber} ${getDateText(yearNumber, ["месяц", "месяца", "месяцев"]) }`

  return `${yearNumber ? `${yearText} ` : ""}${monthNumber ? monthText : ""}`;
}

function getDateText(dateNumber: number, names: string[]) {
  if (dateNumber > 4) return names[2]
  else if (dateNumber > 1) return names[1]
  return names[0]
}

async function setMerchant(instance: Instance) {
  const merchantId: string =
    instance.reference.getAttribute("data-merchant-id") || "";
  console.log(merchantId);

  if (!merchantIds[merchantId]) {
    const fetchOption = {
      url: "https://megamarket.ru/api/mobile/v1/partnerService/merchant/legalInfo/get",

      option: {
        body: JSON.stringify({ merchantId: merchantId }),
        method: "POST",

        headers: {
          "content-type": "application/json",
        },
      },
    };
    const res = await fetch(fetchOption.url, fetchOption.option);
    const info = await res.json();
    merchantIds[merchantId] = info;
  }

  const merchantInfo = merchantIds[merchantId];
  console.log(merchantInfo);
  instance.setContent(`
    <div class="merchant__wrap">
      <div class="merchant">
        <div class="merchant__main-info">
          <div class="merchant__logo" style="width: 48px; height: 48px;">
            <a href="https://megamarket.ru/${merchantInfo.merchant.url}" class="merchant__link" target="_blank">
              <img src="${merchantInfo.merchant.design.logoUrl}" alt="Логотип ${merchantInfo.merchant.name}" draggable="false" loading="lazy" class="merchant__img">
            </a>
          </div> 
          <div class="merchant__rating_wrapper">
            <div class="merchant__rating_name">${merchantInfo.merchant.name}</div> 
            <div class="merchant__rating_rating">
              <div>
                Рейтинг
              </div> 
              <div class="merchant__rating_number">${merchantInfo.summaryRating}</div> 
              <span class="merchant__rating_svg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path fill="#8654cc" d="M10.793 2.7c.53-.933 1.884-.933 2.414 0l2.252 3.962c.198.348.538.593.933.672l4.495.9c1.058.211 1.477 1.489.746 2.277L18.53 13.86a1.368 1.368 0 0 0-.357 1.088l.527 4.518c.124 1.064-.972 1.854-1.954 1.408l-4.17-1.893a1.396 1.396 0 0 0-1.153 0l-4.17 1.893c-.981.446-2.077-.344-1.953-1.408l.527-4.518a1.368 1.368 0 0 0-.357-1.088l-3.103-3.348c-.73-.788-.312-2.066.746-2.277l4.495-.9c.395-.079.735-.324.933-.672L10.793 2.7Z"></path>
                </svg>
              </span>
            </div>
          </div>
        </div> 
        <div class="merchant__table">
          <div class="merchant__table_inner">
            <div class="merchant__table_row">
              <div class="merchant__table_row-label">
                Оценка товаров по отзывам
              </div> 
              <div class="merchant__table_row-divider"></div> 
              <div class="merchant__table_row-value">${merchantInfo.feedbackRate}</div>
            </div>
            <div class="merchant__table_row">
              <div class="merchant__table_row-label">
                Заказы без отмен
              </div> 
              <div class="merchant__table_row-divider"></div> 
              <div class="merchant__table_row-value">
                ${merchantInfo.idealOrderRate}%
              </div>
            </div>
            <div class="merchant__table_row">
              <div class="merchant__table_row-label">
                На маркетплейсе
              </div> 
              <div class="merchant__table_row-divider"></div> 
              <div class="merchant__table_row-value">
                ${getFullDate(merchantInfo)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`);
}