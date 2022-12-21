import { defineStore } from "pinia";

export const useUser = defineStore("user", {
  state: () => {
    return { count: 0, currentUser: {} };
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

    async setUser(user) {
      this.currentUser = user;
    },
  },
});
