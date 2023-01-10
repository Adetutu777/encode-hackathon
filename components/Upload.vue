<template>
  <div>
    <div class="d-flex align-items-center mr-4">
      <div class="my-0 custom-input" v-show="!!!file">
        <input @change="handleChange" type="file" id="coverImage" />
        <label
          for="coverImage"
          ref="coverImageLabel"
          class="d-flex justify-content-center align-items-center custom-label absolute"
          >Add Cover
          <svg
            class="ml-2"
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M864 260H728l-32.4-90.8a32.07 32.07 0 0 0-30.2-21.2H358.6c-13.5 0-25.6 8.5-30.1 21.2L296 260H160c-44.2 0-80 35.8-80 80v456c0 44.2 35.8 80 80 80h704c44.2 0 80-35.8 80-80V340c0-44.2-35.8-80-80-80zM512 716c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160zm-96-160a96 96 0 1 0 192 0 96 96 0 1 0-192 0z"
            ></path>
          </svg>
        </label>
      </div>
    </div>
    <div class="row align-items-center" v-show="!!file">
      <div class="col-md-5">
        <img ref="preview" class="img-fluid" />
      </div>
      <div class="col-md-7">
        <label for="coverImage" class="border p-2 rounded"> Change </label>
        <button type="button" class="btn" @click="handleCancel">X</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "../store/app";
import { convertBase64 } from "~/util";
const store = useAppStore();
const coverImageLabel = ref("");
const preview = ref("");

const file = computed(() => {
  if (store.currentCoverImage && typeof preview.value == "object") {
    preview.value.src = URL.createObjectURL(store?.currentCoverImage);
  }
  return store?.currentCoverImage;
});

const emits = defineEmits(["change", "cancel"]);

const handleChange = async (e) => {
  const fileRef = e.target.files[0];
  if (!fileRef) return;
  try {
    emits("change", e);
  } catch (e) {
    console.log("errpr", e);
  }
};

const handleCancel = () => {
  store.setCoverImage(null);
  coverImageLabel.value.value = "";
};
</script>

<style>
.cancel-btn {
  margin-left: 0.5rem;
}

.custom-input {
  display: block;
  overflow: hidden;
  position: relative;
  max-width: 10rem;
  padding: 0.3rem 1rem;
}

.custom-input input {
  opacity: 0;
  cursor: pointer;
  height: 100%;
  width: 100%;
}

.custom-label {
  left: 0;
  font-weight: 500;
  cursor: pointer;
  top: 0;
  background-color: #fff;
  min-width: 8rem;
  border-radius: 10px;
  height: 100%;
  border: 1px solid;
  display: inline-flex;
  padding: 0.5rem;
  align-items: center;
  max-width: 8rem;
  text-align: center;
}

.custom-label svg {
  margin-left: 0.5rem;
  transform: scale(1.5);
}
</style>
