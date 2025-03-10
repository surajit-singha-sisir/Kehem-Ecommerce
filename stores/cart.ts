import { defineStore } from 'pinia'

export const useMainStore = defineStore('cart', {
  state: () => ({
    counter: 0,
  }),
  actions: {
    increment() {
      this.counter++
    },
  },
  persist: true,
})