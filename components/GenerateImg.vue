<template>
  <div class="">
    <div class="my-4">
      <button type="button" @click="toggleCreateImgModal" class="btn-general">
        Generate Image
      </button>
    </div>
    <b-modal v-model="createImgModal" title="Generate a new Image">
      <form @submit.prevent="getImage">
        <div class="img-div">
          <carousel
            @selectedItem="selectCurrentItem"
            @getCurrentItem="getCurrentItem"
            :items="imageUrl"
          />
          <div class="d-flex justify-content-center">
            <button
              @click="setImage"
              class="pick-btn"
              type="button"
              :disabled="isLoading"
            >
              pick
            </button>
          </div>

          <div class="d-flex my-3">
            <b-form-input
              class="cus-input"
              v-model="prompt"
              :disabled="isLoading"
              placeholder="Describe Your Image"
            ></b-form-input>

            <button
              type="button"
              :disabled="isLoading"
              @click="getImage"
              class="btn-generate"
              squared
            >
              {{ isLoading ? "" : "Generate" }}
              <b-spinner
                style="width: 1.5rem; height: 1.51rem"
                l
                v-if="isLoading"
                label="Loading..."
              ></b-spinner>
            </button>
          </div>
          <small v-if="isLoading" class="text-center mx-auto">
            You can close this modal and come back to it later
          </small>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script setup>
import { toggleCreateImgModal, createImgModal } from "../store/modalRef";
import { useAppStore } from "../store/app";
const prompt = ref("pen my thoughts down");
const isLoading = ref(false);
const isError = ref(false);
const imageUrl = ref([
  "/pen-thoughts-1.jpeg",
  "/pen-thoughts-2.jpeg",
  "/pen-thoughts-3.jpeg",
  "/pen-thoughts-4.jpeg",
  "/pen-thoughts-5.jpeg",
]);
const currentImgIndex = ref(0);

const store = useAppStore();
const setImage = async () => {
  const item = imageUrl.value[currentImgIndex.value];
  const response = await fetch(item);
  const blob = await response.blob();
  const file = new File([blob], "file.png", { type: "image/png" });
  store.setCoverImage(file);
  toggleCreateImgModal();
};

const getCurrentItem = (item) => {
  currentImgIndex.value = item;
};

const selectCurrentItem = () => {
  setImage();
};

const getImage = async () => {
  isLoading.value = true;
  try {
    const res = await fetch(`/api/gen-img?prompt=${prompt.value}`);
    const info = await res.json();

    imageUrl.value = info.data;
  } catch (error) {
    isError.value = true;
    return error;
  }
  isLoading.value = false;
};
</script>

<style scoped>
.img-place {
  cursor: pointer;
  position: relative;
}

.img-place:hover::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background: red;
  opacity: 0.2;
}
.img-div {
  position: relative;
}

.pick-btn {
  position: absolute;
  border-top-left-radius: 5px;
  left: 50%;
  top: 40%;
  z-index: 1;
  background: #2c74b3;
  color: #ffffff;
  border: 1px solid #2c74b3;
  padding: 0.3rem 1.3rem;
  transform: translate(-50%, -50%);
}

.btn-generate {
  background: #2c74b3;
  color: #ffffff;
  border: 1px solid #2c74b3;
  padding: 0.5rem 1.5rem;
}
</style>
