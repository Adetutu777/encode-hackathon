import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      count: useStorage("countStore", 0),
      isConnected: false,
      isConnecting: false,
      connectError: false,
      currentUser: useStorage("currentUser", {}),
      currentCoverImage: "",
      userAddress: useStorage("userAddress", ""),
      isPending: useStorage("profilePending0.1", []),
      drafts: useStorage("draftPosts", []),
      currentDraftId: useStorage("currentDraftId", 0),
      currentUserStatus: useStorage("currentUserStatus", 0),
      isOptedIn: false,
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

      if (!!findIndex?.address) {
        const mapped = currentUsers.map((i) => {
          const addition = i.address == tobeAdded.address ? tobeAdded : i;
          return {
            ...i,
            ...addition,
          };
        });
        localStorage.setItem("profilePendingNew", JSON.stringify(mapped));
        this.isPending = mapped;
      } else {
        const tempArr = currentUsers;
        tempArr.push({
          isPending: status?.status ?? true,
          address: status.address,
        });

        this.isPending = tempArr;
        localStorage.setItem("profilePendingNew", JSON.stringify(tempArr));
      }
    },

    isPendingStatus() {
      const userAddress = this.userAddress;
      const rawData = localStorage.getItem("profilePendingNew");
      const isPending = JSON.parse(rawData);
      const currentUser = isPending.find((i) => i.address == userAddress);
      console.log(currentUser, "user current!!!");
      this.currentUserStatus = currentUser?.isPending ?? false;
      return currentUser?.isPending ?? false;
    },

    async setStatus(currentState) {
      this.currentUserStatus = currentState;
    },
  },
});
