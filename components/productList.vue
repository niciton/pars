<template>
  <div
    :class="['products', 'container', { 'product-load': isLoad }]"
    @click="listingProductClick"
  >
    <div v-if="isLoad" class="products">
      <template v-for="product in loadData" :key="product">
        <product :product="product" />
      </template>
    </div>
    <div v-else class="load-screen">load...</div>
  </div>
  <app-modal
    modalName="analogsModal"
    :isOpen="isOpenAnalogsModal"
    @toggleOpen="setIsOpenAnalogsModal"
  >
    <div :class="['analogs', { loaded: !analogsArr.length }]">
      <template v-if="analogsArr.length">
        <div class="analogs__head" v-if="mainAnalogInfo.mainImage">
          <div class="analogs__img">
            <img :src="mainAnalogInfo.mainImage" alt="" lang="lazy" />
          </div>
          <div class="analogs__title">
            {{ mainAnalogInfo.name }}
          </div>
        </div>
        <div class="analog__wrap">
          <div
            v-for="(analog, index) in analogsArr"
            :key="index"
            :class="['analog', { bAnalog: index === 0 }]"
          >
            <div class="analog__price-bonus">
              "выгода":
              {{
                analog.price - analog.bonusInfoGroups[0]?.totalAmount ||
                0 +
                  analog.bonusInfoGroups[analog.bonusInfoGroups.length - 1]
                    ?.totalAmount ||
                0
              }}
              ₽
            </div>
            <div class="analog__price">цена: {{ analog.price }} ₽</div>
            <div class="analog__bonus">
              бонусы:
              <div class="bonus">
                {{
                  formatPrice(
                    analog.bonusInfoGroups[0]?.totalAmount ||
                      0 +
                        analog.bonusInfoGroups[
                          analog.bonusInfoGroups.length - 1
                        ]?.totalAmount ||
                      0,
                    0
                  )
                }}
                <div class="spasibo"></div>
                <div class="percent">
                  {{
                    analog.bonusInfoGroups[0]?.percent ||
                    0 +
                      analog.bonusInfoGroups[analog.bonusInfoGroups.length - 1]
                        ?.percent ||
                    0
                  }}
                  %
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div>analogs load...</div>
      </template>
    </div>
  </app-modal>
</template>

<script setup lang="ts">
import axios from "axios";
import type { productT } from "@/types/product";
import { copyToClipboard, formatPrice } from "@/other/js/helper.js";

type filterProps = {
  filters: {
    searchVal?: Ref<string>;
    excludeVal?: Ref<string>;
    limit?: number;
    sortVal?: Ref<1 | 2 | 3 | 4 | 5>;
    delivery?: Ref<1 | 2 | 3>;

    price?: {
      max?: number;
      min?: number;
    };
  };
  productsListClass?: [];
  productClasses?: [];
};

type readonlyProductT = {
  readonly [Property in keyof productT]: productT[Property];
};

const appProps = defineProps<filterProps>();
let appFilter: filterProps["filters"] = appProps.filters;

watch(appProps, ({ filters }) => {
  Object.assign(appFilter, filters);
  console.log(appFilter.delivery?.value);
});

const appEmit = defineEmits(["lengthProducts"]);

let data: readonlyProductT[] = reactive([]);
let bProductArr: productT[] = [];
let bProduct: productT;
let isLoad: Ref = ref(false);

let isOpenAnalogsModal: Ref<boolean> = ref(false);
let mainAnalogInfo: any = reactive({});
let analogsArr: any[] = reactive([]);

// axios.post(
//   "https://megamarket.ru/api/mobile/v2/cartService/offer/add",
//   JSON.parse("{\"identification\":{\"id\":\"\"},\"offer\":{\"id\":null,\"merchantId\":17264},\"goods\":{\"goodsId\":\"100059878384\"},\"quantity\":1,\"cartType\":\"CART_TYPE_DEFAULT\",\"isBpg20\":false,\"additionalData\":\"{\\\"categories\\\":[],\\\"categoryName\\\":\\\"\\\",\\\"categoryIds\\\":[],\\\"isDayOffer\\\":false,\\\"oldPrice\\\":0,\\\"merchantOldPrice\\\":0,\\\"analytics\\\":{\\\"numberOfReviews\\\":6,\\\"isAddressConfirmed\\\":true,\\\"additionFrom\\\":\\\"block_sales\\\",\\\"additionHow\\\":\\\"default\\\"}}\",\"clientAddress\":null,\"locationId\":null,\"auth\":{\"locationId\":\"50\",\"appPlatform\":\"WEB\",\"appVersion\":1708577038,\"experiments\":{\"8\":\"1\",\"55\":\"2\",\"58\":\"2\",\"62\":\"1\",\"68\":\"1\",\"69\":\"2\",\"79\":\"3\",\"84\":\"2\",\"96\":\"2\",\"98\":\"1\",\"99\":\"1\",\"107\":\"2\",\"109\":\"2\",\"119\":\"2\",\"120\":\"2\",\"121\":\"2\",\"122\":\"2\",\"128\":\"1\",\"130\":\"1\",\"132\":\"2\",\"144\":\"3\",\"147\":\"3\",\"154\":\"2\",\"163\":\"2\",\"173\":\"1\",\"178\":\"1\",\"184\":\"3\",\"186\":\"1\",\"190\":\"2\",\"192\":\"2\",\"194\":\"3\",\"200\":\"2\",\"205\":\"2\",\"209\":\"1\",\"218\":\"1\",\"228\":\"2\",\"229\":\"2\",\"235\":\"2\",\"237\":\"2\",\"243\":\"1\",\"255\":\"1\",\"644\":\"1\",\"645\":\"4\",\"772\":\"2\",\"5779\":\"2\",\"20121\":\"1\",\"70070\":\"1\",\"85160\":\"2\",\"123999\":\"1\"},\"os\":\"UNKNOWN_OS\"}}"),
//   {
//   "headers": {
//     "accept": "application/json",
//     "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//     "cache-control": "no-cache",
//     "content-type": "application/json",
//     "pragma": "no-cache",
//     "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Linux\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest"
//   },
//   // "referrer": "https://megamarket.ru/catalog/details/videokarta-gigabyte-rtx4090-windforce-v2-24gb-100059878384_17264/",
//   // "referrerPolicy": "strict-origin-when-cross-origin",
//   // "mode": "cors",
//   // "credentials": "include"
// });

(async () => {
  const { data, pending, error, refresh } = await useFetch(
    "https://megamarket.ru/api/mobile/v2/cartService/offer/add",
    {
      method: "post",
      body: JSON.parse(
        '{"identification":{"id":""},"offer":{"id":null,"merchantId":17264},"goods":{"goodsId":"100059878384"},"quantity":1,"cartType":"CART_TYPE_DEFAULT","isBpg20":false,"additionalData":"{\\"categories\\":[],\\"categoryName\\":\\"\\",\\"categoryIds\\":[],\\"isDayOffer\\":false,\\"oldPrice\\":0,\\"merchantOldPrice\\":0,\\"analytics\\":{\\"numberOfReviews\\":6,\\"isAddressConfirmed\\":true,\\"additionFrom\\":\\"block_sales\\",\\"additionHow\\":\\"default\\"}}","clientAddress":null,"locationId":null,"auth":{"locationId":"50","appPlatform":"WEB","appVersion":1708577038,"experiments":{"8":"1","55":"2","58":"2","62":"1","68":"1","69":"2","79":"3","84":"2","96":"2","98":"1","99":"1","107":"2","109":"2","119":"2","120":"2","121":"2","122":"2","128":"1","130":"1","132":"2","144":"3","147":"3","154":"2","163":"2","173":"1","178":"1","184":"3","186":"1","190":"2","192":"2","194":"3","200":"2","205":"2","209":"1","218":"1","228":"2","229":"2","235":"2","237":"2","243":"1","255":"1","644":"1","645":"4","772":"2","5779":"2","20121":"1","70070":"1","85160":"2","123999":"1"},"os":"UNKNOWN_OS"}}'
      ),
      headers: {
        accept: "application/json",
        "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        "content-type": "application/json",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        // "x-requested-with": "XMLHttpRequest",
      },
      referrer:
        "https://megamarket.ru/catalog/details/videokarta-gigabyte-rtx4090-windforce-v2-24gb-100059878384_17264/",
      referrerPolicy: "strict-origin-when-cross-origin",
      mode: "cors",
      credentials: "include",
    }
  );
  console.log(data.value, data.value?.message);
})();

async function getProducts() {
  const jsonData: productT[] = (await axios.get("/data/products.json")).data;
  console.log(jsonData[0]);
  bProduct = jsonData[0];

  for (let i = 0; i < jsonData.length; i++) {
    const product = jsonData[i];
    if (product.bonusPercent > bProduct.bonusPercent) {
      bProductArr.push(product);
    }
  }

  isLoad.value = true;

  return {
    products: jsonData,
  };
}

function listingProductClick(e: Event) {
  const title = (e.target as HTMLElement).closest(".product__title[title]");
  const analogBtn = (e.target as HTMLElement).closest(
    ".val__analogs[data-link]"
  );

  if (title) {
    copyToClipboard(title.getAttribute("title")?.trim() || "");
    return;
  }

  if (analogBtn) {
    const url = analogBtn.getAttribute("data-link");
    isOpenAnalogsModal.value = true;

    // hydratorState.PrefetchStore.componentsInitialState['catalog.details'].offersData.offers
    axios.post("http://0.0.0.0:5757/", { url }).then(({ data }) => {
      const arr: any[] = data.offersData.offers;

      Object.assign(mainAnalogInfo, data.mainInfo);

      arr.sort((analog1, analog2) => {
        const primeBonus1 =
          analog1.bonusInfoGroups[analog1.bonusInfoGroups.length - 1]
            ?.totalAmount || 0;
        const primeBonus2 =
          analog2.bonusInfoGroups[analog2.bonusInfoGroups.length - 1]
            ?.totalAmount || 0;

        const bonus1 =
          analog1.bonusInfoGroups[0]?.totalAmount || 0 + primeBonus1;
        const bonus2 =
          analog2.bonusInfoGroups[0]?.totalAmount || 0 + primeBonus2;

        return analog1.price - bonus1 < analog2.price - bonus2 ? -1 : 1;
      });

      analogsArr.push(...arr);
    });
  }
}

function setIsOpenAnalogsModal(e: { isOpen: boolean }) {
  analogsArr.length = 0;
  isOpenAnalogsModal.value = e.isOpen;
}

getProducts().then(($data) => {
  data.push(...[...$data.products]);
});

const sortingValues = {
  sort: {
    // по умолчанию
    1: (product1: productT, product2: productT) => 1,

    // сначала дешевле
    2: (product1: productT, product2: productT) =>
      product1.price > product2.price ? 1 : -1,

    // сначала дороже
    3: (product1: productT, product2: productT) =>
      product1.price > product2.price ? -1 : 1,

    // сначала "выгодние"
    4: (product1: productT, product2: productT) =>
      product1.price - product1.bonusAmount >
      product2.price - product2.bonusAmount
        ? 1
        : -1,

    // сначала больше бонусов
    5: (product1: productT, product2: productT) =>
      product1.bonusPercent > product2.bonusPercent ? -1 : 1,
  },
  delivery: {
    // любая доставка
    1: (product: productT) => true,

    // доставка сегодня
    2: (product: productT) =>
      product.deliveryPossibilities[0].displayName ===
      "Самовывоз из магазина сегодня",

    // доставка завтра или позже
    3: (product: productT) =>
      product.deliveryPossibilities[0].displayName !==
      "Самовывоз из магазина сегодня",
  },
};

const loadData = computed(() => {
  if (!data.length) return [];

  const regSearch = RegExp(appFilter?.searchVal?.value || "", "i");
  const regExclude = RegExp(appFilter?.excludeVal?.value || "", "i");
  const getDelivery = sortingValues.delivery[appFilter.delivery?.value || 1];

  let products = data.filter((product: productT) => {
    const isExclude = !(
      appFilter.excludeVal?.value && regExclude.test(product.goods.title)
    );

    const isSearch = regSearch.test(product.goods.title);

    const isDelivery = getDelivery(product);

    return isSearch && isExclude && isDelivery;
  });

  console.log(appFilter?.delivery?.value);

  if (appFilter?.sortVal?.value !== 1) {
    products = products.sort(
      sortingValues.sort[appFilter?.sortVal?.value || 1]
    );
  }

  appEmit("lengthProducts", products.length);

  return products;
});
</script>

<style lang="scss">
.analogs {
  background: #ffffff;
  color: #2c2c2c;
  padding: 40px 15px;
  max-height: 85vh;
  overflow: hidden;

  &.loaded {
    font-size: 40px;
  }

  &__head {
    display: flex;
    gap: 25px;
    align-items: center;
  }

  &__img {
    width: 100px;
    height: 100px;
    display: flex;

    img {
      max-width: 100%;
      min-height: 100%;
      object-fit: cover;
    }
  }

  &__title {
    font-size: 30px;
  }

  .analog {
    padding: 20px 10px;
    margin-top: 20px;
    border-radius: 9px;
    background: #f2f2f2;
    // box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.2);

    &.bAnalog {
      margin-top: 0;
      box-shadow: inset 0px 0px 20px #0ed40e50;
      // background: rgb(223,178,23);
      // background: linear-gradient(30deg, rgba(223,178,23,1) 0%, rgba(143,227,38,1) 48%, rgba(18,119,22,1) 100%);
    }

    &__wrap {
      overflow-y: auto;
      overflow-x: hidden;
      max-height: 550px;
      margin-top: 20px;
      // padding: 20px;
      // padding-right: 35px;
    }

    &__price-bonus {
    }

    &__price {
    }

    &__bonus {
      display: flex;
      gap: 3px;
    }
  }
}
</style>