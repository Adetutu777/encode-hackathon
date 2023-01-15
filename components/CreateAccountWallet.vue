<template>
  <div class="">
    <div class="">
      <button @click="createAccount" :class="` aa ${classes}`">
        {{ actionText }}
      </button>
      <b-modal
        v-model="modal.createModal"
        id="modal-2"
        title="Signup to chainWrite"
      >
        <div class="">
          <div class="">
            <div class="text-center">
              <h5>Hello 👋 {{ truncateEthAddress(userAddress) }}</h5>
              <h5>Complete your Registration</h5>
            </div>
            <CreateForm :isLoading="isLoading" @submit="submitData" />
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script setup>
import { userAddress } from "../store";
import { useAppStore } from "~/store/app";
import { truncateEthAddress } from "../util";
import { login, createUser } from "../services/connect";
import { optinForNot } from "~/services/api";
import { useModal } from "../store/modal";
import { useOnboard } from "@web3-onboard/vue";

import { deepCopy } from "~~/util";

const modal = useModal();

const props = defineProps({
  show: {
    default: false,
  },
  classes: {
    type: String,
    default: "btn-signup",
  },
  actionText: {
    type: String,
    default: "Sign in / Sign Up",
  },
});

const router = useRouter();
const appStore = useAppStore();
const currentUserAdd = appStore.userAddress;
const accessTokenRef = ref("");
const isLoading = ref(false);

const { wallets} = useOnboard();

const address = wallets.value?.[0]?.accounts[0]?.address;


const submitData = async (data) => {
  isLoading.value = true;
  const token = localStorage.getItem("myStoryRefreshToken");
  const { user = {} } = await createUser(null, data, token);
  localStorage.setItem("currenUserName", data);
  await appStore.setCurrentUser(user);
  await optinForNot(userAddress.value);
  isLoading.value = false;
  router.push("/blogs");
};

const createAccount = async () => {
  try {
    const { accessToken, user } = await login();
    accessTokenRef.value = accessToken;
    if (accessToken && user) {
      await appStore.setCurrentUser(user);
      // await optinForNot(userAddress);
      router.push("/blogs");
      return;
    }
    modal.toggleCreateModal();
  } catch (error) {
    throw error;
  }

  
};
</script>

<style>
.btn-signup {
  border: 1px solid #ffffff;
  background: transparent;
  color: #ffffff;
  padding: 0.5rem 2rem;
  border-radius: 13px;
  font-weight: bold;
}
.aa:hover {
  background: #2c74b3;
  color: #ffffff;
}
</style>
