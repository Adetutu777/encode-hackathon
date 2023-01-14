<template>
  <div class="jazzIcon" ref="jazzRef"></div>
</template>

<script setup>
import jazzicon from "@metamask/jazzicon";
const jazzRef = ref(null);

const props = defineProps({
  diameter: {
    default: 50,
  },
});

onMounted(() => {
  // const data = localStorage.storyDefaultProfile;
  // const defaultProfile = JSON.parse(data);

  const el = jazzicon(props.diameter, "0x000");
  el.address = "0x000";
  // el.style.display = "block";
  // el.diameter = 10;
  jazzRef.value.appendChild(el);
});
</script>
