<template>
  <div class="">
    <div class="">
    <!-- <span>hello</span>
    <span>hello</span>
    <span>hello</span>
    <span>hello</span> -->
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
import { checkUseStatus } from "~/util";
import { useAppStore } from "~/store/app";
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
const appStore = useAppStore();
const currentUserAdd = appStore.userAddress;

const createAccount = async () => {
  try {
    const { accessToken, user } = await login();
    // console.log("accessToken inner", accessToken, user);
    // await login();
    const isPending = checkUseStatus(currentUserAdd);

    if (accessToken && user) {
      router.push("/blogs");
    }

    if (isPending && currentUserAdd) {
      router.push("/blogs");
    }
  } catch (error) {
    console.log("error connections", error);
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
  background: #2C74B3 ;
  color: #ffffff;
}
</style>
