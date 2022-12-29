<template>
  <ClientOnly>
    <!-- top banner -->

    <NuxtPage />
  </ClientOnly>
</template>

<script setup>
const isPending = computed(() =>
  localStorage.getItem("profilePending" ?? false)
);
</script>

<style lang="scss">
.top-banner {
  // linear gradient background color with blue to pink
  font-weight: 700;
  background: #d2122e;
  color: #fff;
}
.glass {
  margin-right: 0.8rem;
}
.profile2 {
  background: 1px solid red;
}
.post-blog {
  margin-top: 5.2rem !important;
}

.write-btn {
  background: #0c2acb;
  padding: 0.5rem;
  border-radius: 15px;
}
</style>
