import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => {
    return { count: 0, isConnected: false, currentUser: {} };
  },

  actions: {
    increment() {
      this.count++;
    },
    connectWallet() {
      this.isConnected = true;
    },
    async setUser(user) {
      this.currentUser = user;
    },
  },
});
