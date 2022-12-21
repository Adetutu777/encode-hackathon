import { defineStore } from "pinia";

export const useModal = defineStore("modal", {
  state: () => {
    return {
      count: 0,
      createModal: false,
    };
  },

  getters: {
    getCount(state) {
      // autocompletion! ✨
      return state.count;
    },
  },

  actions: {
    increment() {
      this.count++;
    },
    toggleCreateModal() {
      this.createModal = !this.createModal;
    },
  },
});
