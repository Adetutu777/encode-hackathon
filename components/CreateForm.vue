<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="">
        <div class="input-group mt-4">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">@</span>
          </div>
          <input
            v-model="getDetails.data.handleName"
            type="text"
            class="form-control"
            placeholder="e.g john246"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <br />
      </div>

      <div class="">
        <input
          type="file"
          @change="handleChange"
          class="form-control"
          id="customFile"
        />
        <span v-if="!imgValid && uploaded"> Invalid image type </span>
      </div>

      <div class="d-flex justify-content-center">
        <b-button
          class="py-2 mt-4 submit-btn"
          :disabled="!!!getDetails.data.handleName || isLoading"
          type="submit"
        >
          {{ !!isLoading ? "sending....." : "Submit" }}
        </b-button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { createProfileAddress } from "../config/constant";
import profileAbi from "../config/createProfileAbi.json";
import { storeNFT } from "../upload.js";
import { wait } from "../helpers";
import { useAppStore } from "../store/app";
import { userApi } from "~/services/api";
import { clientId, createProfile } from "~/api";
import { getUserProfile } from "~/services/connect";
const signer = ref("");
const router = useRouter();
const appStore = useAppStore();
const userAddress = computed(() => appStore.userAddress);
const getDetails = reactive({
  data: {
    handleName: "",
    imageUrl: "",
  },
});

const imageRef = ref("");
const isFormValid = () => {
  const isValid = imageRef.value.includes("png");
};
const imgValid = ref(false);
const uploaded = ref(false);

const handleChange = async (values, validate) => {
  imageRef.value = values.target.files?.[0];
  const isValid = values.target.files?.[0]?.type.includes("png");
  imgValid.value = isValid;
  uploaded.value = true;
};

const emits = defineEmits(["submit"]);
const props = defineProps({
  isLoading: {
    default: false,
    type: Boolean,
  },
});
const onSubmit = async () => {
  emits("submit", getDetails.data.handleName);
};
</script>

<style>
.submit-btn {
  background: #2c74b3;
}
</style>
