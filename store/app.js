import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      count: 0,
      isConnected: false,
      currentUser: {},
      currentCoverImage: "",
    };
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
    async setCoverImage(img) {
      this.currentCoverImage = img;
    },
  },
});
