<template>
  <div class="d-flex align-items-center mr-4">
    <div class="my-0 custom-input">
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
    <div class="cancel-btn">X</div>
  </div>
</template>

<script setup>
const coverImageLabel = ref("");
const emits = defineEmits(["change", "cancel"]);
const file = ref("file");

const handleChange = (e) => {
  emits("change", e);
  file.value = e.target.files;

  coverImageLabel.value.innerHTML = `Change <svg
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
              </svg>`;
};

const handleCancel = () => {};
</script>

<style>
.cancel-btn {
  margin-left: 0.5rem;
}
</style>
