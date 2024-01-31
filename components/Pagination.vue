<template>
  <h2 :class="{'active-page': pagination.isActivePage(1)}">{{pagination.isActivePage(1)}}</h2>
    <div class="pagination-page">
      pagination page: {{ pagination.getPageIndex() }}
      propLastPage: {{ propLastPage }}
    </div>
  <div class="pagination" v-if="pagination.isShow('main')">
    
    <ul @click.prevent="pagination.onClick">
      <li :class="pagination.getClass('prev')" v-if="pagination.isShow('prev')">
        <a :href="'?page=' + (pagination.getPageIndex()-1)" :data-page="(pagination.getPageIndex()-1)" v-html="pagination.getHTML('prev')"></a>
      </li>
      
      <li :class="[{'active-page': pagination.isActivePage(1)}, pagination.getClass()]" >
        <a href="?page=1" data-page="1">1</a>
      </li>

      <li :class="pagination.getClass('dotted')" v-if="pagination.isShow('dotted1')">
        <span>{{ pagination.getHTML('dotted') }}</span>
      </li>

      <li v-for="(page, i) in pagination.getRange()" :kay="i" :class="[{'active-page': pagination.isActivePage(pagination.getHTML(page))}, pagination.getClass()]">
        <a :href="'?page=' + (pagination.getHTML(page))" :data-page="(pagination.getHTML(page))">{{ pagination.getHTML(page) }}</a>
      </li>

      <li :class="pagination.getClass('dotted')" v-if="pagination.isShow('dotted2')">
        <span>{{ pagination.getHTML('dotted') }}</span>
      </li>

      <li :class="[{'active-page': pagination.isActivePage(pagination.getLastPage())}, pagination.getClass()]">
        <a :href="'?page=' + (pagination.getLastPage())" :data-page="(pagination.getLastPage())">{{ pagination.getLastPage() }}</a>
      </li>

      <li :class="pagination.getClass('next')" v-if="pagination.isShow('next')">
        <a :href="'?page=' + (pagination.getPageIndex()+1)" :data-page="(pagination.getPageIndex()+1)" v-html="pagination.getHTML('next')"></a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

type PropsType = {
  propPageIndex: {
    type: number,
    default: 1,
  },
  propLastPage: {
    type: number,
    default: 15,
  },
}

const paginationProps = defineProps({
  propPageIndex: {
    type: Number,
    default: 1,
  },
  propLastPage: {
    type: Number,
    default: 15,
  },
})

const emit = defineEmits(['pageChange', 'init']);

class Pagination {
  private pageIndex: Ref = ref(1);
  private lastPage: Ref = ref(12);
  private range: number = 5;
  private isInit: boolean = true;
  /**
   * @params pageIndex
   * @params lastPage
   */
  constructor(pageIndex: number, lastPage: number) {
    this.setPageIndex(pageIndex);
    this.setLastPage(lastPage);
    this.isInit = false;
  }

  isActivePage(index: number): boolean {
    return unref(this.pageIndex) === index;
  }

  getPageIndex(): number {
    return unref(this.pageIndex);
  }
  
  setPageIndex(newPageIndex: number, isEmit: boolean = true): void {
    if (!newPageIndex) return console.log(`setPageIndex: ${newPageIndex} не число`);

    this.pageIndex.value = newPageIndex;

    this.createEmit();
  }

  getLastPage(): number {
    return this.lastPage.value;
  }

  setLastPage(newLastPage: number): void {
    if (!newLastPage) return console.log(`setLastPage: ${newLastPage} не число`);
    
    this.lastPage.value = newLastPage;

    this.setRange(newLastPage);
    this.setPageIndex(1);
  }

  getRange(): number {
    return this.range;
  }

  setRange(lastPage: number): void {
    lastPage = lastPage || this.lastPage.value;
    if (this.range >= lastPage - 1) {
      // 2 потому что 1-я - это 1-я страница, 2-я - это последняя
      this.range = lastPage - 2;
    }
  }

  getClass(name: string = "default"): string {
    // console.log("getClass");
    const defaultClass = "pagination__item";
    const classes: {[key: string]: string} = {
      prev: ` pagination__prev`,
      dotted: ` pagination__dotted`,
      next: ` pagination__next`,
    };
    return `${defaultClass}${classes[name] ?? ""}`;
  }

  getHTML(name: string | number): string | number {
    // console.log(name);
    const html: {[key: string]: string} = {
      prev: `<`,
      dotted: `...`,
      next: `>`,
    };
    if (name in html) { 
      return html[name]
    } else if (Number.isNaN(+name)) {
      return "";
    }

    const pageIndex = unref(this.pageIndex),
      lastPage = unref(this.lastPage),
      rangeCenter = Math.ceil(this.range / 2);

    let num: number = 1;

    if (pageIndex > rangeCenter) {
      num = pageIndex - rangeCenter;
    }

    if (pageIndex + rangeCenter + 1 > lastPage) {
      num = -(lastPage - pageIndex);
    }
    
    if (pageIndex > lastPage - rangeCenter - 1) {
      num = lastPage - this.range - 1;
    }
    return Number(name) + num;
  }

  onClick(event: Event) {
    const link: HTMLElement | null = (event.target as HTMLElement)?.closest("[data-page]");
    if (!link) return;
    const { page } = link.dataset;
    !Number.isNaN(+page) && this.setPageIndex(+page);
  }

  createEmit(): void{
    if (this.isInit) return;
    emit("pageChange", {
      page: this.pageIndex.value,
      lastPage: this.lastPage.value,
      range: this.range,
    })
  }

  isShow(name: string): boolean {
    const pageIndex: number = unref(this.pageIndex),
      lastPage: number = unref(this.lastPage),
      rangeCenter = Math.ceil(this.range / 2) + 1;

    const values: {[key: string]: Function} = {
      main: () => lastPage > 1,
      prev: () => pageIndex > 1,
      dotted1: () => pageIndex > rangeCenter,
      dotted2: () => (pageIndex <= lastPage - rangeCenter) && (this.range < lastPage - 2),
      next: () => lastPage > pageIndex,
    };
    if (name in values) return values[name]();
    return true;
  }
}

const pagination = new Pagination(paginationProps.propPageIndex, paginationProps.propLastPage);

emit("init", { 
  pagination,
})

// console.log($mount);
// mounted(){
//   console.log("dgfiusdfhfiuh");
// }
// console.log(mounted);
// export pagination;
</script>

<style lang="scss">
.pagination{
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;

  &-page {
    font-size: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__item{
    width: 30px;
    height: 30px;

    &.active-page{
      background: rgb(221, 221, 221);
      color: #000;
    }

    &:not(:last-child){
      border-right: 1px solid rgb(221, 221, 221);
    }
    a,
    span{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  ul {
    display: flex;
    border: 1px solid rgb(221, 221, 221);
  }
}
</style>