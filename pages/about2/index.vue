<template>
  <div class="sidebar" @change="onChange">
    <label>
      <input type="checkbox" name="manuf" value="20" />
      <span>
        20 val
      </span>
    </label>
    <label>
      <input type="checkbox" name="manuf" value="15" />
      <span>
        15 val
      </span>
    </label>
    <label>
      <input type="checkbox" name="manuf" value="10" />
      <span>
        10 val
      </span>
    </label>
  </div>  
  <Pagination :propPageIndex="1" :propLastPage="lastPageRef" @pageChange="loger" @init="setPagination" />
  <p>
    {{ lastPageRef }}
  </p>
  <form @submit.prevent="setLastPage" >
    <input type="number" name="name" value="20" />
    <input type="submit" name="submit" />
  </form>
</template>

<script setup lang="ts">
let pagination: null | Function = null;
function loger(params: any): void {
  console.log(params);
}

function setPagination(event: CustomEvent) {
  console.log(event.el);
  pagination = event.pagination as const;
}

function onChange({target}) {
  const {value, name} = target;
  
}

let lastPageRef: number = 15;

function setLastPage<T extends HTMLElement>({target: T}): void {
  lastPageRef = +target.querySelector("input").value;
  pagination?.setLastPage(lastPageRef)
}

const a = {
  a: 1,
}

const b = a;
b.b= 1;
a.c = 1

console.log(a, b);
console.log(a === b);

// interface ComponentOptions {
//   mounted?(this: ComponentPublicInstance): void
// }
</script>

<style lang="scss">

.sidebar{
  margin: 0;
}

</style>