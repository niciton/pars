<template>
  <app-modal
    modalName="analogsModal"
    :isOpen="isOpenAnalogsModal"
    @toggleOpen="setIsOpenAnalogsModal"
  >
    <div :class="['analogs', { loaded: !analogsArr.length }]">
      <template v-if="analogsArr.length && mainAnalogInfo">
        <div class="analogs__head" v-if="mainAnalogInfo?.goods?.titleImage">
          <div class="analogs__img">
            <img :src="mainAnalogInfo.goods.titleImage" alt="" lang="lazy" />
          </div>
          <div class="analogs__title">
            {{ mainAnalogInfo.goods.title }}
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
              {{ formatPrice(analog.finalPrice - (analog.bonusAmount || analog.finalPrice * 0.01)) }} ₽
            </div>
            <div class="analog__price">цена: {{ analog.finalPrice }} ₽</div>
            <div class="analog__bonus">
              бонусы:
              <div class="bonus">
                {{ formatNumber(analog.bonusAmount || analog.finalPrice * 0.01) }}
                <div class="spasibo"></div>
                <div class="percent">
                  {{ analog.bonusPercent || 1 }} %
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
import type { TProduct } from "~/types/base/product";
import { formatNumber, formatPrice } from '@/other/js/helper';
import type { TModalEmitEvent } from './appModal.vue';
import type { TRequestProductGet } from '@/types/api/product';

const appProps = defineProps<{
  link: string,
}>();

watch(appProps, async ({link}) => {
  if (!link) return;

  isOpenAnalogsModal.value = true;

  const fetchOption: TRequestProductGet = {
    method: "post",
    body: {
      getAct: "analog",
      url: link,
    },
  };
  // const arr: TProduct[] = useFetch("/api/products/get", fetchOption)?.data?.value || [];
  const { data: arr }: { data: Ref<TProduct[]> } = await useFetch("/api/products/get", fetchOption) || [];

  arr.value.sort((analog1, analog2) => {
    const price1 = analog1.finalPrice - analog1.bonusAmount;
    const price2 = analog2.finalPrice - analog2.bonusAmount;

    return price1 < price2 ? -1 : 1;
  });

  Object.assign(mainAnalogInfo, arr.value[0]);
  analogsArr.push(...arr.value);
})

let isOpenAnalogsModal: Ref<boolean> = ref(false);
let mainAnalogInfo = reactive(<TProduct>{});
let analogsArr: TProduct[] = reactive([]);


function setIsOpenAnalogsModal(e: TModalEmitEvent) {
  analogsArr.length = 0;
  isOpenAnalogsModal.value = e.isOpen;
}
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

    &.bAnalog {
      margin-top: 0;
      box-shadow: inset 0px 0px 20px #0ed40e50;
    }

    &__wrap {
      overflow-y: auto;
      overflow-x: hidden;
      max-height: 550px;
      margin-top: 20px;
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