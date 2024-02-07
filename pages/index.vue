<template>
  
  <div :class="['products', 'container', {'product-load': isLoad}]" @click="listingProductClick">
    <form @submit.prevent class="search">
      <input @input="setSearch" type="text" name="search" class="search__inp" placeholder="поиск">
    </form>
    
    <div v-if="isLoad" class="products">
      <template v-for="(product, i) in loadData" :key="i">
        <product :product="product" />
      </template>
    </div>
    <div v-else class="load-screen">load...</div>
  </div>
  <app-modal modalName="analogsModal" :isOpen="isOpenAnalogsModal" @toggleOpen="setIsOpenAnalogsModal">
    <div :class="['analogs', {'loaded': !analogsArr.length}]">
      <template v-if="analogsArr.length">
        <div class="analogs__head" v-if="mainAnalogInfo.mainImage">
          <div class="analogs__img">
            <img :src="mainAnalogInfo.mainImage" alt="" lang="lazy">
          </div>
          <div class="analogs__title">
            {{ mainAnalogInfo.name }}
          </div>
        </div>
        <div class="analog__wrap">
          <div v-for="(analog, index) in analogsArr" :key="index" :class="['analog', {'bAnalog': index === 0}]">
            <div class="analog__price-bonus">
              "выгода": {{ analog.price - analog.bonusInfoGroups[0]?.totalAmount || 0 + analog.bonusInfoGroups[analog.bonusInfoGroups.length - 1]?.totalAmount || 0 }} ₽
            </div>
            <div class="analog__price">
              цена: {{ analog.price }} ₽
            </div>
            <div class="analog__bonus">
              бонусы: <div class="bonus">
                {{ formatPrice(analog.bonusInfoGroups[0]?.totalAmount || 0 + analog.bonusInfoGroups[analog.bonusInfoGroups.length - 1]?.totalAmount || 0, 0) }} 
                <div class="spasibo"></div>
                <div class="percent">
                  {{ analog.bonusInfoGroups[0]?.percent || 0 + analog.bonusInfoGroups[analog.bonusInfoGroups.length - 1]?.percent || 0 }} %
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div>
          analogs load...
        </div>
      </template>
    </div>
  </app-modal>
</template>

<script setup lang="ts">
import axios from "axios";
import type { productT } from "@/types/product";
import { copyToClipboard, formatPrice } from "@/other/js/helper.js";

type searchInfoT = {
  searchVal: Ref,
  delay: number,
  // timer: NodeJS.Timeout | number | undefined,
  timer: ReturnType<typeof setTimeout> | undefined,
}

let data: productT[] = reactive([]);
let bProductArr: productT[] = [];
let bProduct: productT;
let isLoad: Ref = ref(false);

let isOpenAnalogsModal: Ref = ref(false);
let mainAnalogInfo: any = reactive({});
let analogsArr: any[] = reactive([]);

let searchInfo: searchInfoT = {
  searchVal: ref(""),
  delay: 450,
  timer: undefined,
} 

onMounted(() => {
  // console.log(searchForm.value);
});

// const copyInp = document.getElementById("copy-inp");

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

function setSearch(e: Event) {
  const val = (e.target as HTMLInputElement).value;

  clearTimeout(searchInfo.timer);
  searchInfo.timer = undefined;

  // console.log(val);
  searchInfo.timer = setTimeout(() => {
    searchInfo.searchVal.value = val;
    searchInfo.timer = undefined;
  }, searchInfo.delay)

}

function setIsOpenAnalogsModal(e: {isOpen: boolean}) {
  analogsArr.length = 0;
  isOpenAnalogsModal.value = e.isOpen;
}

function listingProductClick(e: Event) {
  const title = (e.target as HTMLElement).closest(".product__title[title]");
  const analogBtn = ((e.target as HTMLElement).closest(".val__analogs[data-link]"))

  if (title) {
    copyToClipboard(title.getAttribute("title")?.trim() || "")
    e.preventDefault();
    return;
  }

  if (analogBtn) {
    const url = analogBtn.getAttribute("data-link");
    isOpenAnalogsModal.value = true;

    // hydratorState.PrefetchStore.componentsInitialState['catalog.details'].offersData.offers
    axios.post("http://0.0.0.0:5757/", {url})
    .then(({ data }) => {
      const arr: any[] = data.offersData.offers;

      Object.assign(mainAnalogInfo, data.mainInfo);

      arr.sort((analog1, analog2) => {
        const primeBonus1 = analog1.bonusInfoGroups[analog1.bonusInfoGroups.length - 1]?.totalAmount || 0;
        const primeBonus2 = analog2.bonusInfoGroups[analog2.bonusInfoGroups.length - 1]?.totalAmount || 0;

        const bonus1 = analog1.bonusInfoGroups[0]?.totalAmount || 0 + primeBonus1;
        const bonus2 = analog2.bonusInfoGroups[0]?.totalAmount || 0 + primeBonus2;

        return analog1.price - bonus1 < analog2.price - bonus2 ? -1 : 1;
      })
     
      analogsArr.push(...arr);
    })
  }
}

//  console.log((async () => { return (await getProducts()).products})());
// const smallData = (async () => reactive([...(await getProducts()).products.splice(0, 21)]))();

getProducts().then(($data) => {
  data.length = 0;
  data.push(...[ ...$data.products]);
});

const loadData = computed(() => {
  const reg = RegExp(searchInfo.searchVal.value, "gi");
  const products = data.filter((product: productT) => {
    return reg.test(product.goods.title);
  });
  return products.slice(0, 12);
});
</script>

<style lang="scss">
.load-screen {
  font-size: 38px;
  text-align: center;
  width: 100%;
}

.search {
  &__inp {
    outline: none;
  }
}

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

    &__price-bonus {}

    &__price {}

    &__bonus {
      display: flex;
      gap: 3px;
    }
  }
}
</style>