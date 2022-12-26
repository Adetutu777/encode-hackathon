<template>
  <div>
    <b-modal v-model="createImgModal" title="Generate a new Image">
      <form @submit.prevent="getImage">
        <div class="img-div">
          <div class="img-place">
            <img :src="imageUrl" class="img-fluid generated-img" />
          </div>
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

const store = useAppStore();
const setImage = () => {
  store.setCoverImage(imageUrl.value);
  toggleCreateImgModal();
};
const getImage = async () => {
  isLoading.value = true;
  try {
    const res = await fetch(`/api/gen-img?prompt=${prompt.value}}`);
    const info = await res.json();
    imageUrl.value = info.data;
  } catch (error) {
    isError.value = true;
  }
  isLoading.value = false;
};
const imageUrl = ref("/pen-thoughts.jpeg");
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
  transform: translate(-50%, -50%);
}
</style>

style for darken background color when hover on image .img-place:hover::before {
position: absolute; content: ""; width: 100%; height: 100%; background: green;
opacity: 0.2; }
