<template>
  <div>
    <NuxtLink class="profile" :to="`/profile/${defaultProfile?.ownedBy}`">
      <div class="d-flex align-items-center">
        <JazzIcon />
        <!-- <div class="profile-photo">
          <img
            class=""
            src="https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png"
            alt="pix 1"
            srcset=""
          />
        </div> -->
        <div class="handle">
          <h4>
            {{ defaultProfile?.id }}
          </h4>
          <h5 class="text-muted">
            {{ defaultProfile?.handle }}
          </h5>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const data = localStorage.storyDefaultProfile;
const defaultProfile = JSON.parse(data);
</script>

<style>
.profile {
  text-decoration: none;
}
.handle h4 {
  font-size: 1rem;
  color: #292d32;
  outline: none;
}
.handle h5 {
  font-size: 0.8rem;
  color: #6c6e70;
}
</style>
