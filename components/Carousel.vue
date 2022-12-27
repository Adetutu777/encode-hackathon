<template>
  <div>
    <b-carousel
      id="carousel-1"
      :interval="6000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333"
      class="carousel-dark carousel-fade"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide active :img-src="items[0]" @click="currentSlide" />
      <b-carousel-slide :img-src="items[1]" @click="currentSlide" />
      <b-carousel-slide :img-src="items[2]" @click="currentSlide" />
      <b-carousel-slide :img-src="items[3]" @click="currentSlide" />
      <b-carousel-slide :img-src="items[4]" @click="currentSlide" />
    </b-carousel>
  </div>
</template>

<script setup>
defineComponent({
  name: "carousel",
});

const emits = defineEmits(["getCurrentItem", "selectedItem"]);

const currentSlide = () => {
  emits("selectedItem");
};

// const slide = ref(0);
const sliding = ref(false);
const onSlideStart = ({ to }) => {
  sliding.value = true; // prevent click event
  emits("getCurrentItem", to);
};
const onSlideEnd = () => {
  sliding.value = false;
};

const props = defineProps({
  items: {
    default: [],
  },
});
</script>

<style></style>
