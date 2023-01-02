import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { deepCopy } from "~~/util";

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
      currentUserStatus: useStorage("currentUserStatus", false),
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
      const rawData = localStorage.getItem("profilePendingNew");
      const currentUsers = JSON.parse(rawData);
      const tobeAdded = {
        isPending: status?.isPending ?? status?.status,
        address: status.address,
      };

      const findIndex = currentUsers.find(
        (item) => item.address == status.address
      );

      if (!!!findIndex?.address) {
        const tempArr = currentUsers;
        tempArr.push({
          isPending: status?.status ?? true,
          address: status.address,
        });

        this.isPending = tempArr;
        localStorage.setItem("profilePendingNew", JSON.stringify(tempArr));
      } else {
        const mapped = currentUsers.map((i) => {
          const addition = i.address == tobeAdded.address ? tobeAdded : i;
          return {
            ...i,
            ...addition,
          };
        });
        localStorage.setItem("profilePendingNew", JSON.stringify(mapped));
        this.isPending = mapped;
      }
    },

    isPendingStatus() {
      const userAddress = this.userAddress;
      const rawData = localStorage.getItem("profilePendingNew");
      const isPending = JSON.parse(rawData);
      const currentUser = isPending.find((i) => i.address == userAddress);
      this.currentUserStatus = currentUser?.isPending ?? false;
      console.log(currentUser, "current suser");
      return currentUser?.isPending ?? false;
    },
  },
});
