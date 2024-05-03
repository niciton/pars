<template>
  <div
    :class="['products', 'container', { 'product-load': isLoad }]"
    @click="listingProductClick"
  >
    <div v-if="isLoad" class="products">
      <template v-for="(product) in loadData" :key="product.goods.webUrl">
        <product :product="product" />
      </template>
    </div>
    <div v-else class="load-screen">load...</div>
  </div>
  <analogs-modal :link="productLink" />
</template>

<script setup lang="ts">
import { copyToClipboard } from "@/other/js/helper.js";
import type { TProduct } from "@/types/base/product";
import type { TRequestProductGet } from "@/types/api/product";

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

type readonlyTProduct = {
  readonly [Property in keyof TProduct]: TProduct[Property];
};

const appProps = defineProps<filterProps>();
let appFilter: filterProps["filters"] = appProps.filters;

const appEmit = defineEmits(["lengthProducts"]);

let data: readonlyTProduct[] = reactive([]);
let isLoad: Ref = ref(false);

let productLink: Ref<string> = ref("");

function getProducts() {
  const fetchOption: TRequestProductGet = {
    method: "post",
    body: {
      getAct: "all",
    },
  };

  const { data }: { data: Ref<TProduct[]> } = useFetch(
    "/api/products/get",
    fetchOption
  );
  const jsonData = data.value || [];

  console.log(jsonData[0]);

  isLoad.value = true;

  return jsonData;
}

async function listingProductClick(e: Event) {
  const copyTitle = (e.target as HTMLElement).closest(".product .product__title_copy");
  const analogBtn = (e.target as HTMLElement).closest(
    ".product__analogs[data-link]"
  );
  const titleImg = (e.target as HTMLElement).closest(
    ".product__img[data-id]"
  );

  if (copyTitle) {
    copyToClipboard(copyTitle.getAttribute("data-title")?.trim() || "");
    return;
  }

  if (analogBtn) {
    productLink.value = analogBtn.getAttribute("data-link") || "";
    return;
  }

  if (titleImg) {
    const fetchOption: TRequestProductGet = {
      method: "post",
      body: {
        getAct: "all",
      },
    };
    
    const {data}: { data: Ref<TProduct[]> } = await useFetch("/api/products/get", fetchOption);
    console.log(data);
    import(/* webpackChunkName: "fancybox" */ "@/other/libs/fancybox.js").then(({ Fancybox, fancyOptions }) => {
      Fancybox.show(data.value[0].goods.images, fancyOptions);
    });
    return;
  }
}

try {
  data.push(...getProducts());
} catch (err) {
  console.log(`oh no, my request collection`);
}

watch(appProps, ({ filters }) => {
  Object.assign(appFilter, filters);
  console.log(appFilter.searchVal?.value);
});

if (process.client) {
  import("@/other/js/merchant");
}

const sortingValues = {
  sort: {
    // по умолчанию
    1: (product1: TProduct, product2: TProduct) => 1,

    // сначала дешевле
    2: (product1: TProduct, product2: TProduct) =>
      product1.price > product2.price ? 1 : -1,

    // сначала дороже
    3: (product1: TProduct, product2: TProduct) =>
      product1.price > product2.price ? -1 : 1,

    // сначала "выгодние"
    4: (product1: TProduct, product2: TProduct) =>
      product1.price - product1.bonusAmount >
      product2.price - product2.bonusAmount
        ? 1
        : -1,

    // сначала больше бонусов
    5: (product1: TProduct, product2: TProduct) =>
      product1.bonusPercent > product2.bonusPercent ? -1 : 1,
  },
  delivery: {
    // любая доставка
    1: (product: TProduct) => true,

    // доставка сегодня
    2: (product: TProduct) =>
      product.deliveryPossibilities[0].displayName ===
      "Самовывоз из магазина сегодня",

    // доставка завтра или позже
    3: (product: TProduct) =>
      product.deliveryPossibilities[0].displayName !==
      "Самовывоз из магазина сегодня",
  },
};

const loadData = computed(() => {
  if (!data.length) return [];

  const regStringSearch = `(?=.*${appFilter?.searchVal?.value
    ?.trim()
    ?.split(" ")
    .join(")(?=.*")})`;
  const regStringExclude = `(?=.*${appFilter?.excludeVal?.value
    ?.trim()
    ?.split(" ")
    .join(")(?=.*")})`;

  const regSearch = RegExp(regStringSearch || "", "i");
  const regExclude = RegExp(regStringExclude || "", "i");
  const getDelivery = sortingValues.delivery[appFilter.delivery?.value || 1];

  let products = data.filter((product: TProduct) => {
    const title = `${product.goods.title} ${product.goods.attributes
      .map((item) => `${item.title} ${item.value}`)
      .join(" ")}`;
    const isExclude = !(appFilter.excludeVal?.value && regExclude.test(title));

    const isSearch = regSearch.test(title);

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

<style lang="scss"></style>