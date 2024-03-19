<template>
  <header>
    <nav>
      <ul>
        <li>
          <NuxtLink to="/about2">
            about2
          </NuxtLink>
          <NuxtLink to="/aststest">
            tstest
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <form>
      <input type="search" name="search" class="search__inp" :value="searchVal">
    </form>
  </header>
  <h2>header</h2>
</template>

<script setup lang="ts">
import "./scss/AppHeader.scss";

let searchVal: Ref<string> = ref("");

if (process.client) {
  const { search } = location;
  searchVal.value = search
}

</script>