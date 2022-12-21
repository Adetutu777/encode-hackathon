<template>
  <div class="">
    <div class="">
      <b-button @click="createAccount" class="create-btn">
        Create account</b-button
      >
      <b-modal
        v-model="modal.createModal"
        id="modal-2"
        title="Login or Signup to storytribe"
      >
        <div class="">
          <div class="">
            <div class="text-center">
              <h5>Hello 👋 {{ truncateEthAddress(userAddress) }}</h5>
              <h5>Complete your Registration</h5>
            </div>
            <CreateForm />
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script setup>
import { userAddress, isConnected, userAccessToken } from "../store";
import { truncateEthAddress } from "../util";
import { toggleRegModal } from "../store";
import { login } from "../services/connect";
import { useModal } from "../store/modal";

const showModal = ref(false);
const modal = useModal();
const toggleModal = () => {
  showModal.value = !showModal.value;
};

const props = defineProps({
  show: {
    default: false,
  },
});

const createAccount = () => {
  login?.();
};
</script>

<style>
.create-btn {
  border-radius: 20px;
  color: white;
  background: #0c2acb;
  margin-left: 1rem;
}

.network {
  color: #0c2acb;
}
</style>
