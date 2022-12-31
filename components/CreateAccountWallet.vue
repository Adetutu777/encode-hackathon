<template>
  <div class="">
    <div class="">
      <b-button @click="createAccount" :class="` border-0  ${classes}`">
        LogIn/SignUp
      </b-button>
      <b-modal
        v-model="modal.createModal"
        id="modal-2"
        title="Login or Signup to myStory"
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
    console.log("accessToken inner", accessToken, user);
    // await login();
    if (accessToken && user) {
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
  border: 1px solid #66fcf1;
  background: transparent;
  color: #66fcf1;
  padding: 0.5rem 2rem;
  border-radius: 1.5rem;
}
</style>
