<template>
  <div>
    <b-modal v-model="createImgModal" title="Generate a new Image">
      <form @submit.prevent="getImage">
        <div class="img-div">
          <carousel
            @selectedItem="selectCurrentItem"
            @getCurrentItem="getCurrentItem"
            :items="imageUrl"
          />
          <div class="d-flex justify-content-center">
            <b-button
              @click="setImage"
              class="pick-btn"
              type="button"
              :disabled="isLoading"
            >
              pick
            </b-button>
          </div>

          <div class="d-flex my-3">
            <b-form-input
              class="cus-input"
              v-model="prompt"
              :disabled="isLoading"
              placeholder="Describe Your Imae"
            ></b-form-input>

            <b-button
              type="button"
              :disabled="isLoading"
              @click="getImage"
              variant="success"
              squared
            >
              {{ isLoading ? "" : "Generate" }}
              <b-spinner
                style="width: 1.5rem; height: 1.51rem"
                l
                v-if="isLoading"
                label="Loading..."
              ></b-spinner>
            </b-button>
          </div>
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
  "/pen-thoughts-1.jpeg",
  "/pen-thoughts-3.jpeg",
  "/pen-thoughts-4.jpeg",
  "/pen-thoughts-5.jpeg",
]);
const currentImgIndex = ref(0);

const store = useAppStore();
const setImage = () => {
  const item = imageUrl.value[currentImgIndex.value];
  store.setCoverImage(item);
  toggleCreateImgModal();
};

const getCurrentItem = (item) => {
  currentImgIndex.value = item;
};

const selectCurrentItem = (item) => {
  setImage();
};

const handlePrev = () => {
  if (currentImgIndex.value <= 0) return;
  currentImgIndex.value = currentImgIndex.value - 1;
};
const handleNext = () => {
  if (currentImgIndex.value + 1 >= imageUrl.value.length) return;
  currentImgIndex.value = currentImgIndex.value + 1;
};
const getImage = async () => {
  isLoading.value = true;
  try {
    const res = await fetch(`/api/gen-img?prompt=${prompt.value}`);
    const info = await res.json();
    console.log(info.data, "data>>>");
    imageUrl.value = info.data;
  } catch (error) {
    isError.value = true;
  }
  isLoading.value = false;
};
// const imageUrl = ref("/pen-thoughts.jpeg");
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
  background: green;
  opacity: 0.2;
}
.img-div {
  position: relative;
}

.pick-btn {
  position: absolute;
  border-top-left-radius: 5px;
  left: 50%;
  top: 50%;
  background: #333;
  z-index: 1;
  transform: translate(-50%, -50%);
}
</style>

style for darken background color when hover on image .img-place:hover::before {
position: absolute; content: ""; width: 100%; height: 100%; background: green;
opacity: 0.2; }
