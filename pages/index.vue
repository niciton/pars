<template>
  <div :class="['container']">
    <form @submit.prevent class="search">
      <div class="search__inp_wrap">
        <input
          @input="setSearch"
          type="text"
          name="search"
          class="search__inp"
          placeholder="поиск"
        />
        <div class="search__find-count">
          {{ lengthProducts }}
        </div>
      </div>
      <input
        @input="setSearch"
        type="text"
        name="exclude"
        class="search__inp-exclude"
        placeholder="исключить из поиск"
      />

      <select class="search__search" @change="setSort" name="sort">
        <option disabled selected value="1">сортировка по умолчанию</option>
        <option value="2">сначала дешевле</option>
        <option value="3">сначала дороже</option>
        <option value="4">сначала "выгоднее"</option>
        <option value="5">сначала больше бонусов</option>
      </select>

      <select class="search__search" @change="setDelivery" name="delivery">
        <option selected value="1">любая доставка</option>
        <option value="2">доставка сегодня</option>
        <option value="3">доставка завтра или позже</option>
      </select>
    </form>

    <product-list @lengthProducts="setLengthProduct" :filters="searchInfo" />
  </div>
</template>

<script setup lang="ts">
type searchInfoT = {
  searchVal: Ref;
  excludeVal: Ref;
  sortVal: Ref<1 | 2 | 3 | 4 | 5>;
  delivery: Ref<1 | 2 | 3>;
  delay: number;
  timer: ReturnType<typeof setTimeout> | undefined;
};

let searchInfo: searchInfoT = {
  searchVal: ref(""),
  excludeVal: ref(""),
  sortVal: ref(1),
  delivery: ref(1),
  delay: 450,
  timer: undefined,
};

let lengthProducts: Ref<number> = ref(0);

function setLengthProduct(e: number) {
  lengthProducts.value = e;
}

function setSort({ target }: Event) {
  searchInfo.sortVal.value = +(target as HTMLSelectElement).value as 1 | 2 | 3;
}

function setDelivery({ target }: Event) {
  searchInfo.delivery.value = +(target as HTMLSelectElement).value as 1 | 2 | 3;
}

function setSearch({ target }: Event) {
  const { value, name } = target as HTMLInputElement;

  clearTimeout(searchInfo.timer);
  searchInfo.timer = setTimeout(() => {
    searchInfo[name === "search" ? "searchVal" : "excludeVal"].value = value;
  }, searchInfo.delay);
}
</script>

<style lang="scss">
.load-screen {
  font-size: 38px;
  text-align: center;
  width: 100%;
}

.search {
  display: flex;
  gap: 30px;
  margin-bottom: 50px;

  input,
  select {
    outline: none;
    display: flex;
    padding: 8px 12px;
    height: 100%;
    border-radius: 5px;
    border: 0px solid #000;
  }

  &__inp {
    &_wrap {
      display: flex;
      border-radius: 5px;
      background: #fff;
      position: relative;
    }
    &-exclude {
    }
  }

  &__find-count {
    // position: absolute;
    right: 0;
    top: 0%;
    height: 100%;
    padding: 0 3px;
    display: flex;
    align-items: center;
  }
}
</style>