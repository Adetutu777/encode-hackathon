<template>
  <div>
    <div class="d-flex py-3">
      <div class="container icon-input mb-3 d-flex">
        <NuxtLink to="/blogs">
          <img
            class="img-logos"
            src="@/images/chainWriteLogo.svg"
            alt="image"
          />
        </NuxtLink>

        <div class="search d-none d-sm-block">
          <span class="uil uil-search-alt"></span>
          <input placeholder="Search term" />
        </div>
      </div>

      <NuxtLink class="profile" :to="`/profile/${userAdd}`">
        <div class="d-flex align-items-center">
          <JazzIcon />

          <div class="handles">
            <h5 class="text-muted">
              {{ userAdd }}
            </h5>
            <h4>
              <!-- {{ user?.id }} -->
            </h4>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { userAddress } from "~/store";
import { useAppStore } from "~/store/app";
const store = useAppStore();
import { getUserProfile } from "~/services/connect";
const user = computed(() => store.currentUser);
const userAdd = ref("");

onMounted(async () => {
  const add = localStorage.getItem("currenUserName");
  userAdd.value = add;
});
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

.input-text {
  margin-left: 0.8rem;
}
.img-logos {
  width: 2.7vw;
}

.search {
  position: relative;
  color: #aaa;
  font-size: 16px;
  margin-left: 1rem;
  margin-top: 0.3rem;
}

.search {
  display: inline-block;
}

.search input {
  width: 250px;
  height: 32px;

  background: #fcfcfc;
  border: 1px solid #aaa;
  border-radius: 5px;
  box-shadow: 0 0 3px #ccc, 0 10px 15px #ebebeb inset;
}

.search input {
  text-indent: 32px;
}
.search .uil-search-alt {
  position: absolute;
  top: 5px;
  left: 10px;
}

.search .uil-search-alt {
  left: auto;
  right: 10px;
}
</style>
