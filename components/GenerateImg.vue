<template>
  <div>
    <b-modal v-model="createImgModal" title="Generate a new Image">
      <form>
        <div class="img-div">
          <div class="img-place">
            <img :src="imageUrl" class="img-fluid generated-img" />
          </div>
          <div class="d-flex justify-content-center">
            <b-button class="pick-btn" type="button" :disabled="isLoading">
              pick
            </b-button>
          </div>

          <div class="d-flex my-3">
            <b-form-input
              v-model="prompt"
              :disabled="isLoading"
              placeholder="Describe Your Imae"
            ></b-form-input>

            <b-button
              type="button"
              :disabled="isLoading"
              @click="getImage"
              variant="success"
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
const prompt = ref("hello");
const isLoading = ref(false);
const isError = ref(false);

const getImage = async () => {
  isLoading.value = true;
  try {
    const res = await fetch(`/api/gen-img?prompt=${prompt.value}}`);
    const info = await res.json();
    console.log(info, "info");
    imageUrl.value = info.data;
  } catch (error) {
    isError.value = true;
  }
  isLoading.value = false;
};
const imageUrl = ref("https://via.placeholder.com/512");
useAsyncData("prompt", getImage, {
  immediate: true,
});
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
  background: transparent;
  transform: translate(-50%, -50%);
}


</style>
