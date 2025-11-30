import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => ({
  state: () => ({
    count: 0,
  }),

  actions: {
    increment() {
      this.count++
    },
    doubleCount() {
      this.count * 2
    },
  },

  getters: {
    getCount: (state) => state.count.length,
  },
}))
