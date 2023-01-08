<template>
  <div>
    <b-modal
      @close="closeModal"
      v-model="errorStatus"
      id="connectError"
      title="Error Connecting"
    >
      <div
        class="d-flex justify-content-center flex-column mx-auto text-center"
      >
        <div class="mb-2 text-capitalize h5">
          {{ appStore.connectError }}
        </div>

        <div>
          <b-button @click="login" class="mx-1 btn-try" variant="light">
            Try Again
          </b-button>
        </div>
      </div>
      <!-- <button @click="login">try again</button> -->
    </b-modal>

    <b-modal v-model="isConnected" id="isConnected" title="Signing" centered>
      <!-- <div>isSigning</div> -->
      <div class="loadingspinner mx-auto"></div>
    </b-modal>
  </div>
</template>

<script setup>
import { useAppStore } from "~/store/app";
import { login } from "~/services/connect";
const appStore = useAppStore();
const errorStatus = computed(() => {
  return !!appStore.connectError;
});

const isConnected = computed(() => {
  return !!appStore.isConnecting;
});

const closeModal = () => {
  appStore.connectError = null;
  appStore.isConnecting = null;
  appStore.isConnected = null;
};
</script>

<style scoped>
.loadingspinner {
  pointer-events: none;
  width: 5em;
  height: 5em;
  border: 0.2em solid transparent;
  border-color: #eee;
  border-top-color: #3e67ec;
  border-radius: 50%;
  animation: loadingspin 1s linear infinite;
}

@keyframes loadingspin {
  100% {
    transform: rotate(360deg);
  }
}

.btn-try {
  border: 1px solid #2c74b3;
}
</style>
