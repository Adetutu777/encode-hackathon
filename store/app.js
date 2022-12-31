import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      count: useStorage("countStore", 0),
      isConnected: false,
      currentUser: useStorage("currentUser", {}),
      currentCoverImage: "",
      userAddress: useStorage("userAddress", ""),
      isPending: useStorage("profilePendingNew", []),
      drafts: useStorage("draftPosts", []),
      currentDraftId: useStorage("currentDraftId", 0),
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

    async setPending(isPending) {
      this.isPending = isPending;
    },
    async setCurrentDraftId(id) {
      this.currentDraftId = id;
    },
    async saveDraft(draft) {
      const currentDrafts = [...JSON.parse(JSON.stringify(this.drafts))];
      const findIndex = currentDrafts.findIndex((drf) => drf.id === draft.id);
      if (findIndex === -1) {
        this.drafts = [...currentDrafts, draft];
      } else {
        currentDrafts[findIndex] = draft;
        this.drafts = currentDrafts;
      }
    },
    async deleteDraft(id) {
      const currentDrafts = this.drafts;
      const filtered = currentDrafts.filter((drf) => drf.id !== id);
      this.drafts = filtered;
    },
    async setAccountStatus(
      status = {
        address: "0x1",
        isPending: false,
      }
    ) {
      const currentUsers = [...JSON.parse(JSON.stringify(this.isPending))];
      const findIndex = currentUsers.findIndex(
        (item) => (item.address = status.address)
      );
      if (findIndex === -1) {
        this.isPending = [...currentUsers, status];
      } else {
        currentUsers[findIndex] = status;
        this.isPending = currentUsers;
      }
    },
  },
});
