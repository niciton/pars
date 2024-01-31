<template>
  <div class="product" :data-name="app.getTitle()">
    <div class="product__img">
      <img :src="app.petImg()" :alt="app.getTitle()" loading="lazy" />
    </div>
    <div class="product__body">
      <div class="product__title" :title="app.getTitle()">
        {{ app.getTitle() }}
      </div>
      <div class="product__price">
        <div class="val__rub" v-html="app.getPrice()"></div>
        <div class="val__bonus bonus" :style="`--bonus-percent: ${app.getBonus().percent}%`" v-html="app.getBonus().priceFormat"></div>
        <button class="val__analogs" :data-link="app.getLink()">
          аналоги
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, watch } from "vue"

import type { productT } from '@/types/product';
import { formatPrice } from "@/other/js/helper.js"

type PropsType = {
  product: productT,
}

const { product } = defineProps<PropsType>();
// []hydratorState.PrefetchStore.componentsInitialState['catalog.details'].offersData.offers
class ProductApp {
  constructor() {
    
  }

  petImg(){
    return product?.goods?.titleImage ? product.goods.titleImage : '';
  }

  getTitle() {
    return product?.goods?.title ? product.goods.title : ''
  }

  getPrice() {
    const { price } = product;

    if (!price) return `цена не найдена`;
    
    return `<div class="val">
      ${formatPrice(price)}
    </div>
    <div class="rub">
      ₽
    </div>`;
  }

  getBonus() {
    return {
      percent: product?.bonusPercent || 0,
      price: product?.bonusAmount || 0,
      priceFormat: `<div class="val">
        ${formatPrice(product?.bonusAmount || 0, 0)}
      </div>
      <div class="rub spasibo">
        
      </div>
      <div class="percent">
        ${product?.bonusPercent || 0} %
      </div>`,
    }
  }

  getLink() {
    return product?.goods?.webUrl ? `${product.goods.webUrl}#?details_block=prices` : ""
  }

  getVariant() {
    const url = product?.goods?.webUrl ? `${product.goods.webUrl}#?details_block=prices` : "";
    if (!url) return;
    // axios.post("http://0.0.0.0:5757/", {url})
    // .then((res) => {
    //   // console.log(res);
    // })
    // product?.goods?.webUrl
  }
}

const app = new ProductApp();
watch(() => product, (e) => {
})
</script>

<style lang="scss">
  $productWidth: 340px;

  .products{
    display: flex;
    flex-wrap: wrap;
    gap: 45px;
  }

  .product {
    width: $productWidth;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0px 0px 25px rgba(255, 255, 255, 0.5);
    border-radius: 8px;

    &__img {
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 100%;
      height: $productWidth;
      background: #fff;

      img {
        max-width: 100%;
        max-height: 100%;
        display: flex;
        object-fit: cover;
      }
    }

    &__body {
      padding: 10px;
      gap: 20px;
      display: flex;
      flex-direction: column;
    }

    &__title {
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      display: -webkit-box;
      overflow: hidden;
    }

    &__price {
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;

      .val {
        &__rub,
        &__bonus {
          display: flex;
          gap: 4px;
          line-height: 14px;
        }

        &__bonus {
          margin-left: 5px;
          
          &::after,
          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
          }

          &::before {
            background: var(--green);
            width: 100%;
            z-index: -2;
          }

          &::after {
            background: #38c415;
            width: var(--bonus-percent);
            border-radius: 30px;
            z-index: -2;
          }
        }
      }
    }
  }
</style>