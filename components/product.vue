<template>
  <div v-if="product" class="product" :data-name="app.getTitle()">
    <div class="product__img">
      <img :src="app.petImg()" :alt="app.getTitle()" loading="lazy" />
    </div>
    <div class="product__body">
      <a :href="app.getWebUrl()" class="product__title" :title="app.getTitle()">
        {{ app.getTitle() }}
      </a>
      <div class="product__price">
        <div class="val__rub" v-html="app.getPrice()"></div>
        <div
          class="val__bonus bonus"
          :style="`--bonus-percent: ${app.getBonus().percent}%`"
          v-html="app.getBonus().priceFormat"
        ></div>
        <div class="val__price-bonus" v-html="app.getBonus().priceBonus"></div>
      </div>

      <div class="product__footer">
        <div class="product__merchant" :data-merchant-id="product.favoriteOffer.merchant.id">
          <div v-if="app.getMerchant().img" class="merchant__img">
            <img :src="app.getMerchant().img" alt="" />
          </div>
          <div class="merchant__name">
            {{ app.getMerchant().name }}
          </div>
        </div>
        <button class="product__analogs" :data-link="app.getLink()">
          аналоги
        </button>
      </div>
    </div>
    <div class="product__sub-info_wrap">
      <div class="product__sub-info">
        <div
          class="info__item"
          v-for="{ title, value } in product.goods.attributes"
          :key="value"
        >
          <span>{{ title }}: </span>
          <span>{{ value }};</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TProduct } from "~/types/base/product";
import { formatPrice } from "@/other/js/helper.js";

type PropsType = {
  product: TProduct;
  defaultInfo?: {
    bonusPercent?: number;
  };
};

const { product, defaultInfo } = defineProps<PropsType>();
// []hydratorState.PrefetchStore.componentsInitialState['catalog.details'].offersData.offers
class ProductApp {
  constructor() {}

  petImg() {
    return product?.goods?.titleImage ? product.goods.titleImage : "";
  }

  getTitle() {
    return product?.goods?.title ? product.goods.title : "";
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
    const bonusAmount =
      product?.bonusAmount ||
      product?.price * ((defaultInfo?.bonusPercent || 1) / 100);
    const bonusPercent = product.bonusPercent || defaultInfo?.bonusPercent || 1;

    return {
      percent: bonusPercent,
      price: product.price,
      priceFormat: `<div class="val">
        ${formatPrice(bonusAmount, 0)}
      </div>
      <div class="rub spasibo"></div>
      <div class="percent">
        ${bonusPercent} %
      </div>`,
      priceBonus: `<span class="text">
        "выгода":
      </span>
      <span class="val">
        ${formatPrice(product.price - bonusAmount, 0)} ₽
      </span>`,
    };
  }

  getLink() {
    return product?.goods?.webUrl
      ? `${product.goods.webUrl}`
      : "";
  }

  getMerchant() {
    const { merchant } = product.favoriteOffer;
    return {
      img: merchant.merchantLogoUrl,
      url: merchant.merchantUrl,
      name: merchant.name,
    };
  }

  getWebUrl() {
    return `product/${product.goods.goodsId}${
      product.goods.webUrl.split("details")[1]
    }`;
  }

  getVariant() {
    const url = product?.goods?.webUrl
      ? `${product.goods.webUrl}#?details_block=prices`
      : "";
    if (!url) return;
    // axios.post("http://0.0.0.0:5757/", {url})
    // .then((res) => {
    //   // console.log(res);
    // })
    // product?.goods?.webUrl
  }

  async getTooltipContent() {
    fetch("https://megamarket.ru/api/mobile/v1/partnerService/merchant/legalInfo/get", {
      "headers": {
        "content-type": "application/json",
      },
      "body": `{"merchantId": ${product.favoriteOffer.merchant.id}}`,
      "method": "POST",
    }).then(async (res) => {
      const content = await res.json();
    })
  }
}

const app = new ProductApp();
watch(
  () => product,
  () => {}
);
</script>

<style lang="scss">
$productWidth: 340px;

.products {
  display: flex;
  flex-wrap: wrap;
  gap: 45px;
}

.product {
  position: relative;
  width: $productWidth;
  display: flex;
  flex-direction: column;
  box-shadow: var(--global-shadow);
  border-radius: 8px;

  &:hover {
    z-index: 5;

    .product__sub-info_wrap {
      z-index: 5;
      opacity: 1;
      pointer-events: all;
    }
  }

  &__img {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
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

  // body
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
    height: 36px;
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

      &__price-bonus {
        margin-left: auto;
      }
    }
  }

  &__footer {
    display: flex;
  }

  &__analogs {
    margin-left: auto;
  }

  &__merchant {
    display: flex;
    align-items: center;
    height: 28px;
    gap: 5px;
    cursor: pointer;

    .merchant {
      &__img {
        width: 28px;
        height: 100%;
        border-radius: 50%;
        display: flex;
        flex-shrink: 0;
        overflow: hidden;
        background: #fff;

        img {
          object-fit: contain;
          width: 100%;
          height: 100%;
        }
      }

      &__name {
        font-size: 14px;
      }
    }
  }
  // ./body

  &__sub-info {
    display: flex;
    flex-wrap: wrap;
    width: $productWidth;
    padding: 10px;
    background: var(--global-bg);
    box-shadow: var(--global-shadow);
    border-radius: 0 0 8px 8px;

    &_wrap {
      pointer-events: none;
      opacity: 0;

      transition: 0.3s;
      padding-bottom: 25px;
      width: calc(100% + 50px);
      position: absolute;
      left: -25px;
      top: calc(100% - 10px);
      overflow: hidden;
      display: flex;
      justify-content: center;
    }

    .info__item {
      margin-right: 10px;
    }
  }
}
</style>