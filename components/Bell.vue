<template>
<div class="">
  <button class="bell-div border-0" @click="showTab">
    <div class="number d-flex justify-content-center align-items-center">
      {{ data.length > 3 ? "3+" : data.length }}
    </div>
    <svg
      stroke="#66a7df"
      fill="#66a7df"
      stroke-width="0"
      viewBox="0 0 16 16"
      height="1.8em"
      width="1.8em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"
      ></path>
    </svg>
    <div
      v-if="tabIsShown && data.length > 1"
      class="data-dia"
      tabindex="1"
      @blur="handleBlur"
    >
      <div
        v-for="(note, index) in shortenPost(data)"
        :key="index"
        class="notify"
      >
        <NuxtLink to="/notifications" class="text-decoration-none text-white">
          <div>
            {{ note?.notification?.title }}
          </div>
        </NuxtLink>
      </div>
    </div>
  </button>
  </div>
</template>

<script setup>
const tabIsShown = ref(false);
const showTab = () => {
  tabIsShown.value = !tabIsShown.value;
};
const closeTab = () => {
  tabIsShown.value = false;
};

const handleBlur = ({ currentTarget, relatedTarget }) => {
  if (currentTarget.contains(relatedTarget)) return;
  closeTab();
};

const shortenPost = (array) => {
  if (!array.length) return [];
  return array.slice(0, 3);
};

const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
});
</script>

<style scoped>
.bell-div {
  position: relative;
  margin-right: 1rem;
  cursor: pointer;
  background: transparent;
}
.number {
  top: -0.5rem;
  right: -0.3rem;
  position: absolute;
  border-radius: 100px;
  width: 1.2rem;
  height: 1.2rem;
  font-size: 0.6rem;
  color: white;
  padding: 0.7rem;
  background: #333;
}

.data-dia {
  border-radius: 3px;
  top: 2.2rem;
  width: 12rem;
  height: auto;
  left: -4rem;
  font-size: 0.9rem;
  position: absolute;
  background: #66a7df;
  color: white;
  text-transform: capitalize;
}

.notify {
  padding: 0.3rem;
  width: 100%;
}

.notify:hover {
  opacity: 0.8;
}
</style>
