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