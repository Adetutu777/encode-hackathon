import { ref } from "vue";

export const createImgModal = ref(false);

export const toggleCreateImgModal = () => {
  createImgModal.value = !createImgModal.value;
  return !createImgModal.value;
};
