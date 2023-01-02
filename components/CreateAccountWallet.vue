<template>
  <div class="">
    <div class="">
      <button @click="createAccount" :class="`  ${classes} aa`">
        Sign in / Sign Up
      </button>
      <b-modal
        v-model="modal.createModal"
        id="modal-2"
        title="Login or Signup to chainWrite"
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
import { userAddress } from "../store";
import { truncateEthAddress } from "../util";
import { login } from "../services/connect";
import { useModal } from "../store/modal";

const modal = useModal();

const props = defineProps({
  show: {
    default: false,
  },
  classes: {
    type: String,
    default: "btn-signup",
  },
});
const router = useRouter();
const createAccount = async () => {
  try {
    const { accessToken, user } = await login();
    // console.log("accessToken inner", accessToken, user);
    // await login();
    if (accessToken) {
      router.push("/blogs");
    }
  } catch (error) {
    console.log("error connections", error);
  }
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

.btn-signup {
  border: 1px solid #ffffff;
  background: transparent;
  color: #ffffff;
  padding: 0.5rem 2rem;
  border-radius: 13px;
  font-weight: bold;
}
aa {
  color: #ffffff;
}
</style>
