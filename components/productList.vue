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
    sortVal?: Ref<1 | 2 | 3>;
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

const appEmit = defineEmits([""]);

let data: readonlyProductT[] = reactive([]);
let bProductArr: productT[] = [];
let bProduct: productT;
let isLoad: Ref = ref(false);

let isOpenAnalogsModal: Ref = ref(false);
let mainAnalogInfo: any = reactive({});
let analogsArr: any[] = reactive([]);

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
    e.preventDefault();
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
    1: (product1: productT, product2: productT) => 1,

    2: (product1: productT, product2: productT) =>
      product1.price > product2.price ? 1 : -1,

    3: (product1: productT, product2: productT) =>
      product1.price > product2.price ? -1 : 1,
  },
  delivery: {
    // любая доставка
    1: (product: productT) => true,

    // доставка сегодня
    2: (product: productT) =>
      product.deliveryPossibilities[0].displayName ===
      "Самовывоз из магазина сегодня",

    // доставка завтра или позже
    3: (product: productT) => product.deliveryPossibilities[0].displayName !==
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

  if (appFilter?.sortVal?.value !== 1)
    products = products.sort(
      sortingValues.sort[appFilter?.sortVal?.value || 1]
    );

  return products.map((product) => product);
});
</script>