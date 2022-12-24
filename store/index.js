import { ref, reactive } from "vue";

export const userAddress = ref("");
export const isConnected = ref("");
export const ethereumObj = ref("");
export const userAccessToken = ref("");
export const isConnecting = ref(false);
export const profileId = ref("");
export const defaultProfile = reactive({
  data: {},
});

export const showRegModal = ref(false);

export const toggleRegModal = () => {
  showRegModal.value = !showRegModal.value;
  return !showRegModal.value;
};
