<template>
  <div>
    <profileId />

    <div class="container">
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-sm-8">
          <GenerateImg />
          <!-- <button class="btn-one mb-3">Generate Image</button> -->

          <div class="card pt-3">
            <div class="card-body">
              <upload @change="uploadImage" />
              <div class="add-title mt-4">
                <input
                  type="text"
                  placeholder="Add title"
                  class="w-100 border-0 text-title"
                />
                <div class="d-flex">
                  <div v-for="(tag, index) in tags" :key="index">
                    <button class="btn border rounded cancel-btn">
                      {{ tag.value }}
                      <span class="ml-2" @click="removeTag(tag.id)">x</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="add-tag mt-4 d-flex">
                <input
                  ref="tagInput"
                  type="text"
                  v-model="tag"
                  placeholder="Add tags max. of 3"
                  class="w-100 p-2"
                />
                <b-button @click="enterTag" squared variant="primary"
                  >Enter
                </b-button>
              </div>
              <!-- write post -->
              <div class="mt-2">
                <b-form-textarea
                  id="textarea"
                  v-model="text"
                  placeholder="Write your sweet post ..."
                  rows="6"
                  max-rows="10"
                ></b-form-textarea>
              </div>
            </div>
          </div>
          <div class="d-flex mt-3">
            <button class="btn-two">Publish</button>
            <button class="btn-one">Save to drafts</button>
          </div>
        </div>
        <div class="col-md-2"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "~/store/app";
import { convertBase64 } from "~/util";
const store = useAppStore();
const tags = ref([]);
const tag = ref("");
const currentId = ref(0);

const enterTag = () => {
  tag.value = tag.value.trim();
  if (tag.value.length > 0 && tags.value.length < 3) {
    currentId.value = currentId.value + 1;
    tags.value.push({ id: currentId.value, value: tag.value });
    tag.value = "";
  }
};

const removeTag = (id) => {
  tags.value = tags.value.filter((item) => item.id !== id);
};

const uploadImage = async (e) => {
  const file = e.target.files[0];
  const base64 = await convertBase64(file);
  store.setCoverImage(base64);
};
</script>

<style scoped>
.cancel-btn {
  margin-left: 0.5rem;
}
.text-title {
  font-size: 2.5rem;
  font-weight: 500;
  padding: 0.3rem;
}
.add-title {
  border: none;
}
.add-title input {
  border: none;
  padding: 1rem 0.5rem;
}
</style>
