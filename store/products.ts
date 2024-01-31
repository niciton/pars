import { defineStore } from 'pinia'
import { LaravelPaginator } from '../types';

export interface Product {
  id: string
  title: string
}

type RootState = {
  pages: {[key: number]: Product[]}
  last_page: number
};

export const useProductStore = defineStore('products', {
  state: () => ({
    pages: {} ,
    last_page: 0,
  } as RootState),

  getters: {
    page: (state) => {
      return (page = 0) => state.pages[page]
    },
  },

  actions: {
    async fetchPage(page = 0) {
      let url = 'https://dev.avtoalfa.com/api/v1/catalog/products'
      if (page) url += `?page=${page}`

      const { data } = await useFetch<LaravelPaginator<Product>>(url,
        // { key: `products-page-${page}`}
      )

      if (data) {
        this.pages[page] = data.value!.data
        this.last_page = data.value?.meta.last_page!
      }
    },
  },
})
