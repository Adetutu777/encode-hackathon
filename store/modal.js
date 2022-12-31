import { defineStore } from "pinia";

export const useModal = defineStore("modal", {
  state: () => {
    return {
      count: 0,
      createModal: false,
      createImgModal: false,
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
    async toggleCreateModal() {
      this.createModal = !this.createModal;
    },
    async toggleCreateImgModal() {
      this.createImgModal = !this.createImgModal;
    },
  },
});
