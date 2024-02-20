<template>
  <div :class="['container']">
    <form @submit.prevent class="search">
      <input
        @input="setSearch"
        type="text"
        name="search"
        class="search__inp"
        placeholder="поиск"
      />
      <input
        @input="setSearch"
        type="text"
        name="exclude"
        class="search__inp-exclude"
        placeholder="исключить из поиск"
      />

      <select class="search__search" @change="setSort" name="sort">
        <option disabled selected value="1">по Умолчанию</option>
        <option value="2">сначала дешевле</option>
        <option value="3">сначала дороже</option>
      </select>

      <select class="search__search" @change="setDelivery" name="delivery">
        <option selected value="1">любая доставка</option>
        <option value="2">доставка сегодня</option>
        <option value="3">доставка завтра или позже</option>
      </select>
    </form>

    <product-list :filters="searchInfo" />
  </div>
</template>

<script setup lang="ts">
type searchInfoT = {
  searchVal: Ref;
  excludeVal: Ref;
  sortVal: Ref<1 | 2 | 3>;
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

function setSort({ target }: Event) {
  searchInfo.sortVal.value = +(target as HTMLSelectElement).value as 1 | 2 | 3;
}

function setDelivery({ target }: Event) {
  searchInfo.delivery.value = +(target as HTMLSelectElement).value as 1 | 2 | 3;
}

function setSearch({ target }: Event) {
  const { value, name } = (target as HTMLInputElement);

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
    padding: 8px 12px;
    border-radius: 5px;
    border: 0px solid #000;
  }

  &__inp {
    &-exclude {
    }
  }
}

</style>