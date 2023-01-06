<template>
  <div>
    <div class="d-flex py-3">
      <div class="container icon-input mb-3 d-flex">
        <NuxtLink to="/blogs">
          <img class="img-logos" src="@/images/chainWriteLogo.svg" alt="image" />
        </NuxtLink>
        <div class="inp-div aa">
          <input
            class="icon-input__text-field px-5 py-1 input-text"
            type="text"
          />
        </div>
        <i class="uil uil-search-alt search-icon mt-1"></i>
      </div>

      <NuxtLink class="profile" :to="`/profile/${defaultProfile?.ownedBy}`">
        <div class="d-flex align-items-center">
          <JazzIcon />

          <div class="handles">
            <h5 class="text-muted">
              {{ defaultProfile?.handle }}
            </h5>
            <h4>
              {{ defaultProfile?.id }}
            </h4>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const data = localStorage.storyDefaultProfile;
const defaultProfile = JSON.parse(data);
</script>

<style>
.profile {
  text-decoration: none;
  margin-right: 1.8rem; 
 
}
.handles h4 {
  font-size: 0.9rem;
  color: #292d32;
  outline: none;
   margin-left: 0.3rem;
}
.handles h5 {
  font-size: 0.8rem;
  color: #6c6e70;
  margin-left: 0.3rem;
}

.icon-input {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 18rem;
}

.input-text {
  margin-left: 0.8rem;
}
.img-logos {
  width: 2.7vw;
}
</style>
